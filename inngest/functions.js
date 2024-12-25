import { inngest } from "./client";
import { db } from '@/configs/db';
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs'
import { generateNotesAIModel, generateQuizAIModel, generateStudyTypeContentAIModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser=inngest.createFunction(
  {id:'create-user'},
  {event:'user.create'},
  async({event,step})=>{
    const {user}=event.data;
    const result=await step.run('Check User and create new if not in DB',async()=>{
      const result1=await db.select()
      .from(USER_TABLE).where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
      
      if(result1?.length==0)
      {
          const userResp= await db.insert(USER_TABLE).values({
              userName:user?.fullName,
              email:user?.primaryEmailAddress?.emailAddress
          }).returning({id:USER_TABLE.id})
          console.log('1',userResp[0])
          return userResp[0];
      }
      console.log('2',result1[0]);
      return result1[0];
    })
    console.log('3',result);
    return result;
  }
)


export const GenerateNotes=inngest.createFunction(
  {id:'generate-notes'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;
    const notesResult=await step.run('Generate Chapter Notes',async()=>{
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter) => {
        //for (const chapter of Chapters){
        const PROMPT='Generate detailed ' +course?.courseType+'material with '+course?.difficultyLevel+'level of difficulty for each chapter. Make sure to include all topics in the content in detail. Make sure to give content in HTML format (do not add HTML, body, head, title tags) and no extra content should be added. The chapter with title, summary and topics is: '+JSON.stringify(chapter);
        const result=await generateNotesAIModel.sendMessage(PROMPT);
        const aiResp=result.response.text();
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp
        })
        index=index+1;
        
    })
      return 'Completed'
    })
  
    const updateCourseStatus=await step.run('Update Course Status to Ready',async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE)
      .set({status:'Ready'})
      .where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      
      return 'Success';
    });
  })


export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'generate-study-content'},
  {event:'studyType.content'},
  
  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data;
    
    const AIResult=await step.run('Generate Flashcard',async()=>{
      const result=
      studyType=='Flashcard'?
      await generateStudyTypeContentAIModel.sendMessage(prompt):
      await generateQuizAIModel.sendMessage(prompt);
      return JSON.parse(result.response.text());
    })
    
    const DbResult=await step.run('Save result to DB',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content:AIResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
           
      return 'Inserted';
    })
  }
)

