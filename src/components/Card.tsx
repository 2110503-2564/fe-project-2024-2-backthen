import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material'
import Link from 'next/link';
import * as React from 'react';

export default function Card({ campgroundName, imgSrc, onCompare}:{ campgroundName:string, imgSrc:string , onCompare?:Function}){
    const campgroundNameRating = campgroundName + " Rating";
    
    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };
    return(
        <InteractiveCard contentName={campgroundName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div>{campgroundName}</div>
            {
                onCompare? <Rating className='h-[30%] p-[10px]' id={campgroundNameRating} name={campgroundNameRating} data-testid={campgroundNameRating}
                defaultValue={0}
                onClick={handleClick}
                onChange={(e,newRating)=>{ onCompare(campgroundName , newRating );}}/>:''
            }
        </InteractiveCard>
    );
}
