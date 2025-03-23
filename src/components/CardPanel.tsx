'use client'
import { useReducer } from "react";
import Card from "@/components/Card";
import { Rating } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function CardPanel() {

    const cardReducer = (campgroundList:Map<string, number >, action:{type:string, campgroundName:string, rating?: number})=>{
        switch(action.type){
            case 'add':{
                const newCampgroundList = new Map(campgroundList);
                newCampgroundList.set(action.campgroundName, action.rating??0);
                return newCampgroundList;
            }
            case 'remove':{
                const newCampgroundList = new Map(campgroundList);
                newCampgroundList.delete(action.campgroundName);
                return newCampgroundList;
            }
            default: return campgroundList
        }
    }

    let defaultCampground = new Map<string, number>([
        ["The Bloom Pavilion", 0 ],
        ["Spark Space", 0 ],
        ["The Grand Table", 0 ],
    ]);

    const [campgroundList, dispatchCompare] = useReducer(cardReducer, defaultCampground)

    //Mock data campground

    const mockCampgroundRepo = [{vid:"001", name:"The Bloom Pavilion", imgSrc:"/img/bloom.jpg" },
        {vid:"002", name:"Spark Space", imgSrc:"/img/sparkspace.jpg"},
        {vid:"003", name:"The Grand Table", imgSrc:"/img/grandtable.jpg"}]

    return(
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around",justifyContent:"space-around",flexWrap:"wrap"}}>
                
                {
                    mockCampgroundRepo.map((campgroundCardItem)=>( 
                        <Link href={`campground/${campgroundCardItem.vid}`} className="w-1/5" passHref>
                            <Card campgroundName={campgroundCardItem.name} imgSrc={campgroundCardItem.imgSrc}
                            onCompare={(campground:string, newRating:number)=>dispatchCompare({type:'add', campgroundName:campground, rating:newRating })}
                            />
                        </Link>
                    ))
                }

            </div>
            <div className="w-full text-xl font-medium">
                Campground List with Ratings :{campgroundList.size}
            </div>
            <div>
                {Array.from(campgroundList).map(([campgroundName, rating]) => (
                    <div data-testid={campgroundName} key={campgroundName} 
                    onClick={()=>dispatchCompare({type:'remove', campgroundName:campgroundName})}>
                    {campgroundName}: {rating}
                    </div>
                ))}
            </div>
        </div>
    )
}
