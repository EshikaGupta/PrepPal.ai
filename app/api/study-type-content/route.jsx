import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){
    const {courseId,type,chapters}=await req.json();
    const PROMPT=
    type=='Flashcard'?
    'Generate maximum 15 flashcards on topics :'+chapters+' in JSON format with content on front and back of cards':
    'Generate a quiz on topics :'+chapters+ 'with max 10 questions with 4 options each and the correct option in json format'
    
    const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_TYPE_CONTENT_TABLE.id});

    const result_= await inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    })
    return NextResponse.json(result[0].id)

}