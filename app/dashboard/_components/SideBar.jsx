"use client"
import { CourseCountContext } from '@/app/_context/CourseCountContext'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

function SideBar() {
    const MenuList=[
        {
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'dashboard'
        },
        {
            name:'Upgrade',
            icon:Shield,
            path:'dashboard/upgrade'
        },
        {
            name:'Profile',
            icon:UserCircle,
            path:'dashboard/profile'
        }
    ]
    const {totalCourse,setTotalCourse}=useContext(CourseCountContext);
    const {totalCredits,setTotalCredits}=useContext(CourseCountContext);
    //setTotalCredits((prev)=>prev-totalCourse);
    const path=usePathname().slice(1);
    
  return (
    <div className='h-screen shadow-md p-3 pl-3'>
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt='logo' height={31} width={31}/>
            <h2 className='font-bold text-xl'>PrepPal.ai</h2>
        </div>
        <div className='mt-6'>
            <Link href={"/create"}>
                <Button className="w-full bg-blue-800">+ Create New</Button>
            </Link>

            <div className='mt-5'> 
                {MenuList.map((menu,index)=>(
                    <div key={index} className={`flex gap-2 items-center p-2 my-2 hover:bg-slate-200 rounded-lg cursor-pointer 
                    ${path==menu.path&&'bg-slate-300'}`}>
                        <menu.icon/>
                        <Link href={`/${menu.path}`}>
                            {menu.name}
                        </Link>
                    </div>
                    
                ))}
            </div>
        </div>
        <div className='border p-3 bg-blue-100 rounded-lg absolute bottom-8 w-[90%]'>
            <h2 className='text-lg'>Available Credits: {totalCredits}</h2>
            <h2 className='text-md'>Courses generated: {totalCourse}</h2>
            <Link href={'/dashboard/upgrade'} className='text-sky-700 text-sm'>Upgrade for more credits</Link>
        
        </div>
    </div>
  )
}

export default SideBar