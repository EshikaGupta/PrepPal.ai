"use client"
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { CourseCountContext } from '@/app/_context/CourseCountContext';
import { useRouter } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function Upgrade() {
    const [selectedOption,setSelectedOption]=useState([]);
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    const {totalCredits,setTotalCredits}=useContext(CourseCountContext);
    const {user}=useUser();
    const router=useRouter();
    const Options=[
        {
            credits:5,
            price:0.99
        },
        {
            credits:10,
            price:1.99
        },
        {
            credits:25,
            price:3.99
        },
        {
            credits:50,
            price:6.99
        },
        {
            credits:100,
            price:10.99
        }
    ]

    const onPaymentSuccess=async()=>{
        try {
        console.log("Payment Successful")
        let credits=Number(selectedOption?.credits);
        const result=await axios.post('/api/update-credits',
                {user:user,action:1,creditsToAdd:credits})
        
        if(result){
            console.log('upgrade',result.data);    
            router.push('/dashboard');
        }}
        catch(e){
            console.error("Axios error:", e.response?.data || e.message);
        }
    }

  return (
        <div>
            <h2 className='text-center font-bold mt-4 mb-1 text-3xl'>Buy More Credits</h2>
            <p className='text-center font-medium mb-6 text-lg'>Keep learning with more credits!</p>
        
            <div className='grid grid-cols-2 mt-12 mx-6 md:grid-cols-3 lg:grid-cols-5 gap-7'>
                {Options.map((option,index)=>(
                    <div key={index} className={`p-5 shadow-lg hover:border-blue-800 border rounded-xl items-center flex flex-col justify-center 
                        ${selectedOption?.credits==option.credits&&'border-blue-800'}`}>
                        <h2 className='font-bold text-3xl mb-1'>{option.credits}</h2>
                        <h2 className='font-bold text-lg mb-2'>Credits</h2>
                        <Button onClick={()=>setSelectedOption(option)} className='bg-blue-800 hover:bg-blue-900 shadow-lg w-full cursor-pointer'>Select</Button>
                        <h2 className='text-blue-800 font-semibold mt-2 text-md'>${option.price}</h2>
                    </div>
                ))}
            </div>
            <div className='mt-14 mx-5 flex justify-center items-center'>
                {selectedOption?.price&&
                <PayPalButtons key={selectedOption.price} className='mx-32 w-8/12' 
                onApprove={()=>onPaymentSuccess()}
                onCancel={()=>console.log('Payment Cancelled')}
                createOrder={(data,actions)=>{
                    return actions?.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:selectedOption?.price.toFixed(2),
                                    currency_code:'USD'
                                }
                            }
                        ]
                    })
                }}/>}
            </div>
        </div>
    )
}

export default Upgrade

