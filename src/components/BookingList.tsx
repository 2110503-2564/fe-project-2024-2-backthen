"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { setBookings , removeBooking } from "@/redux/features/bookSlice"
import getAllBooking from "@/libs/getAllBooking"
import Link from "next/link"

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>()
    const bookingItems = useAppSelector((state) => state.bookSlice.bookItems) // Get bookings from Redux

    useEffect(() => {
        async function fetchBookings() {
            try {
                const bookings = await getAllBooking()
                dispatch(setBookings(bookings)) // Store fetched bookings in Redux
            } catch (error) {
                console.error("Error fetching bookings:", error)
            }
        }
        fetchBookings()
    }, [dispatch]) // Runs once when component mounts

    return (
        <>
            {bookingItems.length === 0 ? (
                <div className="text-center text-xl">No Campground Booking</div>
            ) : (
                bookingItems.map((booking) => (
                    <div key={booking.bookDate + booking.nameLastname} className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                        <div className="text-xl">Name-Lastname: {booking.nameLastname}</div>
                        <div className="text-xl">Tel: {booking.tel}</div>
                        <div className="text-xl">Campground: {booking.campground}</div>
                        <div className="text-xl">Date: {booking.bookDate}</div>
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
                            onClick={() => dispatch(removeBooking(booking))}
                        >
                            Remove from My Booking
                        </button>
                        <Link href={`/edit-booking/${booking.nameLastname}`}>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">
                                Edit
                            </button>
                        </Link>
                    </div>
                ))
            )}
        </>
    )
}
