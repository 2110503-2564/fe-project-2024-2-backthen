'use client'

import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { UserItem } from "../../interface";
import Link from "next/link";

export default function AdminBtn() {
    const { data: session, status } = useSession(); // ✅ Correctly destructure status
    const [userData, setUserData] = useState<UserItem | null>(null); // ✅ Initialize with null

    useEffect(() => {
        async function fetchUserProfile() {
            if (status !== "authenticated" || !session?.user?.token) return;

            try {
                const data = await getUserProfile(session.user.token);
                console.log("Fetched User Profile:", data);
                if (data) setUserData(data.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

        fetchUserProfile();
    }, [session, status]);  

    console.log("Data Here",userData);

    if (userData?.role !== "admin") return null;

    return <Link href='/campground/create'>
        <button>Add new CampGround</button>
    </Link>;
}
