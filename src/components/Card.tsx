import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material'
import Link from 'next/link';
import * as React from 'react';

export default function Card({ venueName, imgSrc, onCompare}:{ venueName:string, imgSrc:string , onCompare?:Function}){
    const venueNameRating = venueName + " Rating";
    
    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };
    return(
        <InteractiveCard contentName={venueName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div>{venueName}</div>
            {
                onCompare? <Rating className='h-[30%] p-[10px]' id={venueNameRating} name={venueNameRating} data-testid={venueNameRating}
                defaultValue={0}
                onClick={handleClick}
                onChange={(e,newRating)=>{ onCompare(venueName , newRating );}}/>:''
            }
        </InteractiveCard>
    );
}