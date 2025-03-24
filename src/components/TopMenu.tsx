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
        <TopMenuItem title="Sign-Out of Me" pageRef="/api/auth/signout" />
      ) : (
        <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
      )}

      {/* The rest of the menu items positioned to the right */}
      <div className="ml-auto flex items-center space-x-4">
        <TopMenuItem title="My Booking" pageRef="/mybooking" />
        <TopMenuItem title="Booking" pageRef="/booking" />
      </div>

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
