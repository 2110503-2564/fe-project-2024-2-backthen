import Image from 'next/image'
import getCampground from '@/libs/getCampground'

export default async function CampgroundDetailPage({params}:{params:{vid: string}}){

    const campgroundDetail = await getCampground(params.vid)

    //mock data
    // const mockCampgroundRepo = new Map()
    // mockCampgroundRepo.set("001", {name:"The Bloom Pavilion", imgSrc:"/img/bloom.jpg" })
    // mockCampgroundRepo.set("002", {name:"Spark Space", imgSrc:"/img/sparkspace.jpg"})
    // mockCampgroundRepo.set("003", {name:"The Grand Table", imgSrc:"/img/grandtable.jpg"})


    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-meduim">{campgroundDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={campgroundDetail.data.picture}
                alt='Product Picture'
                width={0} height={0} sizes="100vw"
                className='rounded-lg w-[30%] bg-black'/>
            <div className='text-md mx-5 text-left'>Name: {campgroundDetail.data.name}
            <div>Address: {campgroundDetail.data.address}</div>
            <div>District: {campgroundDetail.data.district}</div>
            <div>Postal Code: {campgroundDetail.data.postalcode}</div>
            <div>Tel: {campgroundDetail.data.tel}</div>
            <div>Daily Rate: {campgroundDetail.data.dailyrate}</div></div>
            </div>
        </main>
    )
}

// export async function generateStaticParams(){
//     return[{vid:"001"},{vid:"002"},{vid:"003"}]
// }
