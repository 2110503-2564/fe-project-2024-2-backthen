import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

    return(
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row items-center flex justify-end">
            {
                session?<Link href='/api/auth/signout'><div className="flex items-center absolute left-0 h-[12.5%] text-cyan-600 text-sm ml-auto px-2">
                Sign-Out of Me</div></Link>
                :<Link href='/api/auth/signin'><div className="flex items-center absolute left-0 h-[12.5%] text-cyan-600 text-sm ml-auto px-2">
                Sign-In</div></Link>
            }
            <div className="flex items-center absolute left-20 h-full text-cyan-600 text-sm ml-auto px-2"><TopMenuItem title='My Booking' pageRef="/mybooking" /></div>
            <TopMenuItem title='Booking' pageRef="/booking"/>
            <Image src={'/img/logo.png'} className="h-[100%] w-auto"
            alt='logo' width={0} height={0} sizes="100vh"/>
        </div>
    )
}