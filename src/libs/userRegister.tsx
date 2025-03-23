export default async function userRegister(userName:string, userEmail: string, userTel: string, userPassword: string) {
    console.log("now use userRegister api and ans is:")
    const response = await fetch("https://campground-backend-cyan.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            telephone: userTel,
            password: userPassword,
            role: "user"
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to Register")
    }
    return await response.json()
}
