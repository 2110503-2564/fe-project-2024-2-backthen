export default async function getCampground(id: string) {
    const response = await fetch(`https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds")
    }
    return await response.json()
}
