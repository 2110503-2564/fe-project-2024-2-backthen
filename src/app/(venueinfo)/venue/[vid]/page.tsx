import Image from 'next/image'
import getVenue from '@/libs/getVenue'

export default async function VenueDetailPage({params}:{params:{vid: string}}){

    const venueDetail = await getVenue(params.vid)

    //mock data
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001", {name:"The Bloom Pavilion", imgSrc:"/img/bloom.jpg" })
    // mockVenueRepo.set("002", {name:"Spark Space", imgSrc:"/img/sparkspace.jpg"})
    // mockVenueRepo.set("003", {name:"The Grand Table", imgSrc:"/img/grandtable.jpg"})


    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-meduim">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={venueDetail.data.picture}
                alt='Product Picture'
                width={0} height={0} sizes="100vw"
                className='rounded-lg w-[30%] bg-black'/>
            <div className='text-md mx-5 text-left'>Name: {venueDetail.data.name}
            <div>Address: {venueDetail.data.address}</div>
            <div>District: {venueDetail.data.district}</div>
            <div>Postal Code: {venueDetail.data.postalcode}</div>
            <div>Tel: {venueDetail.data.tel}</div>
            <div>Daily Rate: {venueDetail.data.dailyrate}</div></div>
            </div>
        </main>
    )
}

// export async function generateStaticParams(){
//     return[{vid:"001"},{vid:"002"},{vid:"003"}]
// }