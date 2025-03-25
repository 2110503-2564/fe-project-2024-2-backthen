import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex items-center px-4">
      {/* Sign-In/Sign-Out as TopMenuItem, positioned on the far left */}
      {session ? (
        <div>
            <TopMenuItem title="Sign-Out" pageRef="/api/auth/signout" />
        </div>
      ) : (
        <div className="space-x-10">
            <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
            <TopMenuItem title="Register" pageRef="/register" />
        </div>
      )}

      {/* The rest of the menu items positioned to the right */}
      {session ? (
        <div className="ml-auto flex items-center space-x-2">
          <TopMenuItem title="All Booking" pageRef="/mybooking" />
          <TopMenuItem title="Booking" pageRef="/booking" />
        </div>
      ) : (
        <div className="ml-auto flex items-center space-x-2">
        </div>
      )}

      {/* Logo */}
      <Image
        src={"/img/logo.png"}
        className="h-[100%] w-auto"
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
    </div>
  );
}
