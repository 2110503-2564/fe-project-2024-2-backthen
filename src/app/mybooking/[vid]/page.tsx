"use client";
import { useEffect, useState } from "react";
import getBooking from "@/libs/getBooking";
import { useSession } from "next-auth/react";
import { CircularProgress, TextField, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import updateBooking from "@/libs/updateBooking";
import { BookingItem } from "../../../../interface";

export default function BookingDetailsPage({ params }: { params: { vid: string } }) {
    const { data: session, status } = useSession();
    const [details, setDetails] = useState<BookingItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooking() {
            if (status !== "authenticated" || !session?.user?.token) return;

            try {
                const data = await getBooking(params.vid, session.user.token);
                console.log("Fetched Booking Details:", data);
                if (data) setDetails(data.data); // Ensure we're setting the correct structure
            } catch (error) {
                console.error("Error fetching booking:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooking();
    }, [params.vid, session, status]);

    async function handleUpdate() {
        if (!details || !session?.user?.token) return;

        const updatedBooking: BookingItem = {
            ...details, // Spread the existing details
            bookDate: details.bookDate ? dayjs(details.bookDate).toISOString() : null, // Ensure correct format
        };

        try {
            await updateBooking(params.vid, updatedBooking, session.user.token);
            console.log("Booking updated successfully!");
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    }

    if (loading) return <div className="text-center text-xl">Loading.   ..</div>;
    if (!details) return <div className="text-center text-xl">No booking details found.</div>;

    return (
        <main className="p-5">
            <h1 className="text-xl font-medium mb-4">
                Edit {details.campground?.Name || "Booking"}
            </h1>

            <TextField
                variant="standard"
                label="Name-Lastname"
                value={details.nameLastname || ""}
                onChange={(e) => setDetails((prev) => prev ? { ...prev, nameLastname: e.target.value } : prev)}
                fullWidth
            />
            <br />

            <TextField
                variant="standard"
                label="Contact Number"
                value={details.tel || ""}
                onChange={(e) => setDetails((prev) => prev ? { ...prev, tel: e.target.value } : prev)}
                fullWidth
            />
            <br />

            {/* Date Picker */}
            <DateReserve
                onDateChange={(value) =>
                    setDetails((prev) =>
                        prev ? { ...prev, bookDate: value ? value.toISOString() : null } : prev
                    )
                }
                selectedDate={details.bookDate ? dayjs(details.bookDate) : null}
            />
            <br />

            <Button
                variant="contained"
                color="primary"
                disabled={loading || !details.nameLastname || !details.tel || !details.bookDate}
                onClick={handleUpdate}
            >
                Update Booking
            </Button>
        </main>
    );
}
