export default async function getAllBooking() {
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments/`)
    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds")
    }
    return await response.json()
}