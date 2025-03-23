export default async function getCampground(id: string) {
    const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/campgrounds/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds")
    }
    return await response.json()
}
