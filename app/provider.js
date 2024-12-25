"use client"
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { CourseCountContext } from './_context/CourseCountContext';

function Provider({children}) {
    const {user}=useUser();
    const [totalCourse,setTotalCourse]=useState(0);
    const [totalCredits,setTotalCredits]=useState(0);
    useEffect(()=>{
        user&&CheckIsNewUser();
    },[user])

            
    const CheckIsNewUser=async()=>{
        const resp=await axios.post('/api/create-user',{user:user});
        const credits = resp.data.result?.credits;
        if (credits !== undefined) {
            setTotalCredits(credits); // Update state
            console.log('New/Existing user credits:', credits);
        } else {
            console.warn('Credits not found in API response');
        }
        
    }
    useEffect(() => {
        console.log('Updated totalCredits:', totalCredits); // Logs after the state has been updated
    }, [totalCredits]);
    
  return (
    <CourseCountContext.Provider value={{totalCourse,setTotalCourse,totalCredits,setTotalCredits}}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>    
            <div>
                {children}
            </div>
        </PayPalScriptProvider>
    </CourseCountContext.Provider>
  )
}

export default Provider