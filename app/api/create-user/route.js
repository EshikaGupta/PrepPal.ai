import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user}=await req.json();
    const result=await inngest.send({
        name:'user.create',
        data:{
            user:user
        }})

        // Wait briefly to allow the Inngest worker to process (optional, depends on execution timing)
        await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay as needed

        // Query the database for the user
        const dbResult = await db.select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        // Return the user record or an appropriate message
        if (dbResult.length > 0) {
        return NextResponse.json({ result: dbResult[0] });
        } else {
        return NextResponse.json({ result: null, message: 'User creation may still be in progress.' });
        }
    //try{
        //const result1=await db.select().from(USER_TABLE)
        //.where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
        
        //if(result1?.length==0)
        //{
            //const userResp= await db.insert(USER_TABLE).values({
                //userName:user?.fullName,
                //email:user?.primaryEmailAddress?.emailAddress
            //}).returning({USER_TABLE});
            //console.log('new',userResp[0]);
            //return NextResponse.json({'result':userResp[0]});
        //}
        //console.log('old',result1[0]);
        //return NextResponse.json({'result':result1[0]});
    //}
    //catch(e){
        //return NextResponse.json({error:e});
    //}
}
