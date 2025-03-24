import { BookingItem } from "../../interface";

export default async function removeBooking(booking_Id: string, token: string) {
  const response = await fetch(`https://campground-backend-cyan.vercel.app/api/v1/appointments/${booking_Id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Failed to Remove Booking: ${errorDetails}`);
  }

  return await response.json();
}