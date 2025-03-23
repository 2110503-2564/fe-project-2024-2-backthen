'use client'
import { useActionState, useState } from 'react'
import Styles from './banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Banner () {
    const covers =['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const {data:session}= useSession()

    return(
        <div className={Styles.banner} onClick={()=>setIndex(index+1)}>
            <Image src={covers[index%4]}
            alt='cover'
            fill={true}
            objectFit='cover'/>
            <div className={Styles.bannerText}>
                <h1 className='text-4xl font-sans text-sky-100'>Let nature be your companion on this getaway</h1>
                <h3 className='text-xl font-serif text-sky-100'>Find your CampGround with us</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
                Welcome {session.user?.name}</div>:null
            }
            <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent'
            onClick={(e)=>{e.stopPropagation(); router.push('/venue')}}>
                Select Camp
            </button>
        </div>
    )
}