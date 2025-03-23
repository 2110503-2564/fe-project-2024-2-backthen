import { BookingItem } from "../../interface";

export default async function createBooking(item:BookingItem){
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    })

    if (!response.ok) {
        throw new Error("Failed to Create")
    }
    return await response.json()
}