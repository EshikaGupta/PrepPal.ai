import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-1 shadow-md">
        <div className="flex items-center space-x-2">
          <Image src={"/logo.svg"} alt="Logo" width={36} height={36}/>
          <h1 className="text-xl font-bold">PrepPal.ai</h1>
        </div>
        <Link href={"/dashboard"}>
          <button className="px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-black">
            Sign In
          </button>
            </Link>
           
      </div>

      <div className="flex flex-col items-center text-center py-16 px-4">
        
        <h1 className="text-5xl font-extrabold mt-2">
          Start Your <br/>AI-Powered Preparation With  <br/><span className="text-blue-800">PrepPal.ai</span> 
        </h1>
        <p className="text-xl text-gray-700 mt-7">
          Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
        </p>
        <div className="flex space-x-4 mt-6">
        <Link href={"/dashboard"}>
          <button className="px-6 py-3 bg-blue-800 text-white rounded-lg font-medium hover:bg-black">
          Get Started
          </button>
            </Link>
          
        </div>
      </div>
    </div>
  );
}
