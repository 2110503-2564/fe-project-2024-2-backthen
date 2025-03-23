import Card from "@/components/Card";
import Link from "next/link";
import { VenueItem,VenueJson } from "../../interface";

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}){
    const venuesJsonReady = await venuesJson
    return(
        <>
        Explore {venuesJsonReady.count} fabulous venues in our venue catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around", justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
            {
                venuesJsonReady.data.map((venueItem:VenueItem)=>(
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                    </Link>
                ))
            }
        </div>
        </>
    )
}