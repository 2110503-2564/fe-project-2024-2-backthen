import dayjs from "dayjs"
import { BookingItem } from "../../interface"

export default async function updateBooking(id:string,item:BookingItem,token:string) {
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },  
        body: JSON.stringify({
            apptDate: item.bookDate,
            nameLastname: item.nameLastname,        
            tel: item.tel,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to Update")
    }
    return await response.json()
}
