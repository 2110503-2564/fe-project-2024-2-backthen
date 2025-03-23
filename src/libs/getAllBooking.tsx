export default async function getAllBooking(token:string) {
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments`,{
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds")
    }
    return await response.json()
}