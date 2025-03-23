import dayjs from "dayjs"
import { BookingItem } from "../../interface"

export default async function updateBooking(id:string,item:BookingItem) {
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nameLastname: item.nameLastname,
            tel: item.tel,
            campground: item.campground,
            bookDate: item.bookDate
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to Update")
    }
    return await response.json()
}
