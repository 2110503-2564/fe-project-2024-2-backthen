import getCampgrounds from "@/libs/getCampgrounds"
import CampgroundCatalog from "@/components/CampgroundCatalog"
import { LinearProgress } from "@mui/material"
import { Suspense } from "react"

export default async function Card(){
    const campgrounds = await getCampgrounds()
    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Campground</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <CampgroundCatalog campgroundsJson={campgrounds}/>
            </Suspense>
        </main>
    )
}