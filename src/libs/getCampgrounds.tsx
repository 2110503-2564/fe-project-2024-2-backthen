export default async function getCampgrounds() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch("https://campground-backend-cyan.vercel.app/api/v1/campgrounds")
    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds")
    }
    return await response.json()
}
