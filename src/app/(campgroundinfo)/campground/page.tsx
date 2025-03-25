'use client'

import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import AdminBtn from "@/components/linkToCreate";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { UserItem } from "../../../../interface";
import { CampgroundItem } from "../../../../interface";

export default function Card() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<UserItem>({
        user_id: '',
        name: '',
        email: '',
        tel: '',
        role: '',
    });
    const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]); // Store campgrounds data
    const [loading, setLoading] = useState<boolean>(true);
    const [userLoading, setUserLoading] = useState<boolean>(false); // Loading state for user data
    
    // Load campground data immediately
    const campgroundsPromise = getCampgrounds(); // This is a Promise<CampgroundJson>

    useEffect(() => {
        // Fetch campground data immediately
        const fetchCampgrounds = async () => {
            try {
                const fetchedCampgrounds = await campgroundsPromise;
                setCampgrounds(fetchedCampgrounds.data); // Assuming data is an array of campgrounds
            } catch (error) {
                console.error("Error fetching campgrounds:", error);
            }
        };

        // Load user data only if there is a session
        const fetchUserData = async () => {
            if (session?.user?.token) {
                setUserLoading(true); // Set loading state for user data
                try {
                    const fetchedUserData = await getUserProfile(session.user.token);
                    setUserData(fetchedUserData.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setUserLoading(false); // Stop user loading once data is fetched
                }
            }
        };

        fetchCampgrounds(); // Fetch campgrounds immediately
        if (session?.user?.token) {
            fetchUserData(); // Fetch user data if session is available
        } else {
            setLoading(false); // If no session, stop loading for campground data
        }
    }, [session]);

    // Show a loading indicator while the campground data is being fetched
    if (loading || userLoading) {
        return <div className="text-center p-5"><LinearProgress /></div>;
    }

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Campground</h1>
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <CampgroundCatalog campgroundsJson={campgroundsPromise} />
                {session?.user?.token && <AdminBtn role={userData.role} />}
            </Suspense>
        </main>
    );
}