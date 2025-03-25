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
    const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]); // Store multiple campgrounds
    const [userData, setUserData] = useState<UserItem>({
        user_id: '',
        name: '',
        email: '',
        tel: '',
        role: '',
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetching data only on the first mount
        const fetchData = async () => {
            if (status === "authenticated" && session?.user?.token) {
                try {
                    // Fetching campgrounds and user profile
                    const fetchedCampgrounds = await getCampgrounds();
                    setCampgrounds(fetchedCampgrounds);

                    const fetchedUserData = await getUserProfile(session.user.token);
                    setUserData(fetchedUserData.data);
                } catch (error) {
                    console.error("Error fetching data", error);
                } finally {
                    setLoading(false); // Set loading to false after data fetching is complete
                }
            }
        };

        // Fetch data on first render only
        fetchData();
    }, []); // Empty dependency array ensures this effect only runs once when the component mounts

    // Show a loading indicator while the data is being fetched
    if (loading) {
        return <div className="text-center p-5"><LinearProgress /></div>;
    }

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Campground</h1>
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <CampgroundCatalog campgroundsJson={campgrounds} />
                <AdminBtn role={userData.role} /> {/* Passing the role to AdminBtn */}
            </Suspense>
        </main>
    );
}
