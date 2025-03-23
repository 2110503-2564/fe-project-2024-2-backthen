import Card from "@/components/Card";
import Link from "next/link";
import { CampgroundItem, CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({campgroundsJson}:{campgroundsJson:Promise<CampgroundJson>}) {
    const campgroundsJsonReady = await campgroundsJson
    return(
        <>
        Explore {campgroundsJsonReady.count} fabulous campgrounds in our campground catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
            {
                campgroundsJsonReady.data.map((campgroundItem:CampgroundItem)=>( 
                    <Link href={`/campground/${campgroundItem.id}`} className="w-1/5">
                        <Card campgroundName={campgroundItem.name} imgSrc={campgroundItem.picture}/>
                    </Link>
                ))
            }
        </div>
        </>
    )
}
