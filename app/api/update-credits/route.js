import { db } from "@/configs/db";
import { USER_TABLE} from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
   
        const {user, action, creditsToAdd} = await req.json();
        
        try {
            
        if (!user || !action) {
            return NextResponse.json({ error: "Email and action are required" }, { status: 400 });
        }
        
        const User = await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress));
       
        if (!User) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        let updatedCredits=0;
        
        if (action===2) {
            
            if (User[0].credits < 1) {
                return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
            }
            updatedCredits = Number(User[0].credits) - 1;
            
        } else if (action === 1) {
            
            if (!creditsToAdd || creditsToAdd <= 0) {
                return NextResponse.json({ error: "Invalid credits to add" }, { status: 400 });
            }
            updatedCredits = Number(User[0].credits) + Number(creditsToAdd);
           
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        // Update user's credits in the database
        const result = await db.update(USER_TABLE).set({ credits: updatedCredits })
            .where(eq(USER_TABLE?.email,user?.primaryEmailAddress?.emailAddress));

        // Return success response
        return NextResponse.json({
            message: "Credits updated successfully",
            updatedCredits,
        });
    } catch (error) {
        console.error("Error updating credits:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
