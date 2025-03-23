'use client'
import { useReducer } from "react";
import Card from "@/components/Card";
import { Rating } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function CardPanel() {

    const cardReducer = (venueList:Map<string, number >, action:{type:string, venueName:string, rating?: number})=>{
        switch(action.type){
            case 'add':{
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName, action.rating??0);
                return newVenueList;
            }
            case 'remove':{
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default: return venueList
        }
    }

    let defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0 ],
        ["Spark Space", 0 ],
        ["The Grand Table", 0 ],
    ]);

    const [venueList, dispatchCompare] = useReducer(cardReducer, defaultVenue)

    //Mock data venue

    const mockVenueRepo = [{vid:"001", name:"The Bloom Pavilion", imgSrc:"/img/bloom.jpg" },
        {vid:"002", name:"Spark Space", imgSrc:"/img/sparkspace.jpg"},
        {vid:"003", name:"The Grand Table", imgSrc:"/img/grandtable.jpg"}]

    return(
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
                
                {
                    mockVenueRepo.map((venueCardItem)=>(
                        <Link href={`venue/${venueCardItem.vid}`} className="w-1/5" passHref>
                        <Card venueName={venueCardItem.name} imgSrc={venueCardItem.imgSrc}
                        onCompare={(venue:string, newRating:number)=>dispatchCompare({type:'add',venueName:venue, rating:newRating })}
                        />
                        </Link>
                    ))
                }

            </div>
            <div className="w-full text-xl font-medium">
                Venue List with Ratings :{venueList.size}
            </div>
            <div>
                {Array.from(venueList).map(([venueName, rating]) => (
                    <div data-testid={venueName} key={venueName} 
                    onClick={()=>dispatchCompare({type:'remove', venueName:venueName})}>
                    {venueName}: {rating}
                    </div>
                ))}
            </div>
        </div>
    )
}