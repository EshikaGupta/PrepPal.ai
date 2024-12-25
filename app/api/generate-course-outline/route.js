import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { sql } from "drizzle-orm";
import { date } from "drizzle-orm/pg-core";
import { NextResponse } from "next/server";
import { format } from 'date-fns';


export async function POST(req){
    const {courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();
    
    const PROMPT='Generate a detailed study material for '+topic+' for '+courseType+' and level of difficulty should be '+difficultyLevel+', with summary of course, list of chapters with summary of each chapter, topic list in each chapter. All results should be in JSON format.'
    const aiResp=await courseOutlineAIModel.sendMessage(PROMPT)
    //console.log(aiResp.response.text());
    const aiResult=JSON.parse(aiResp.response.text());
    const now = format(new Date(), 'dd MMMM yyyy');
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        topic:topic,
        courseType:courseType,
        difficultyLevel:difficultyLevel,
        createdBy:createdBy,
        courseLayout:aiResult,
        date:now
        //date:sql`TO_CHAR(NOW(), 'DD Month YY')`
    }).returning({resp:STUDY_MATERIAL_TABLE})
    
    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    })
    //console.log(result)
    return NextResponse.json({result:dbResult[0]})
}