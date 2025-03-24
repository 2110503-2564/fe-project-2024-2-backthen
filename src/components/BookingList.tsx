"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeBookingPage, setBookings } from "@/redux/features/bookSlice";
import { useSession } from "next-auth/react"; // Import useSession for client-side session
import getAllBooking from "@/libs/getAllBooking";
import removeBooking from "@/libs/removeBooking"; // Import removeBooking function
import Link from "next/link";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const bookingItems = useAppSelector((state) => state.bookSlice.bookItems); // Get bookings from Redux
    const { data: session, status } = useSession(); // useSession hook to get session data

    useEffect(() => {
        async function fetchBookings() {
            if (status === "authenticated" && session?.user?.token) {
                try {
                    console.log(session.user.token);
                    const bookings = await getAllBooking(session.user.token);
                    if (bookings) {
                        dispatch(setBookings(bookings)); // Store bookings in Redux
                    } else {
                        console.log("Bookings data is undefined or null");
                    }
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            } else {
                console.error("No token found or session not authenticated");
            }
        }

        if (status === "authenticated") {
            fetchBookings();
        }
    }, [dispatch, session, status]); // Dependency on session and status

    // Function to remove a booking
    const handleRemoveBooking = async (bookingId: string) => {
        if (!session?.user?.token) {
            console.error("No token found or session not authenticated");
            alert("No valid session found. Please log in.");
            return;
        }

        try {
            await removeBooking(bookingId, session.user.token);
            alert("Booking removed successfully!");

            // Update Redux store after deletion
            const updatedBookings = bookingItems.filter((booking) => booking.booking_id !== bookingId);
            // dispatch(setBookings(updatedBookings)); // Update Redux state
        } catch (error) {
            console.error("Error removing booking:", error);
            alert("Failed to remove booking.");
        }
    };

    return (
        <>
            {bookingItems && Array.isArray(bookingItems) ? (
                bookingItems.length === 0 ? (
                    <div className="text-center text-xl">No Campground Booking</div>
                ) : (
                    bookingItems.map((booking) => (
                        <div key={booking.bookDate + booking.nameLastname} className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                            <div className="text-xl">Name-Lastname: {booking.nameLastname}</div>
                            <div className="text-xl">Tel: {booking.tel}</div>
                            <div className="text-xl">Campground: {booking.campground}</div>
                            <div className="text-xl">Date: {booking.bookDate}</div>
                            <button
                                className="block rounded-md bg-red-600 hover:bg-red-700 px-3 py-1 text-white shadow-sm"
                                onClick={() => {
                                    handleRemoveBooking(booking.booking_id);
                                    dispatch(removeBookingPage(booking)); 
                                }}
                            >
                                Remove from My Booking
                            </button>
                            <Link href={`/mybooking/${booking.booking_id}`}>
                                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">
                                    Edit
                                </button>
                            </Link>
                        </div>
                    ))
                )
            ) : (
                <div className="text-center text-xl">Loading...</div>
            )}
        </>
    );
}
