import { BookingItem } from "../../interface"; 

export default async function createBooking(item: BookingItem, token: string) {
  const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/campgrounds/${item.campground}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Adding Bearer token to Authorization header
    },
    // body: JSON.stringify(item),
    body: JSON.stringify({
        "apptDate": `${item.bookDate}`
    })
  });

  if (!response.ok) {
    const errorDetails = await response.text();  // Capture response text for error details
    throw new Error(`Failed to Create: ${errorDetails}`);
  }

  return await response.json();
}
