"use client";
import { useEffect, useState } from "react";
import getBooking from "@/libs/getBooking";
import { useSession } from "next-auth/react";
import { CircularProgress, MenuItem, Select, TextField, Button } from "@mui/material";
import { CampgroundItem } from "../../../../interface";
import { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve"; // Assuming this is your date picker component

export default function BookingDetailsPage({ params }: { params: { vid: string } }) {
    const { data: session, status } = useSession();
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [loading, setLoading] = useState(true);
    const [details,setDetails] = useState(Object);
    useEffect(() => {
        async function fetchBooking() {
            if (status !== "authenticated" || !session?.user?.token) return;

            try {
                const data = await getBooking(params.vid, session.user.token);
                console.log("Fetched Booking Details:", data);

                if (data) {
                    setNameLastname(data.nameLastname);
                    setTel(data.tel);
                    setBookDate(data.bookDate);
                    setDetails(data);
                }
            } catch (error) {
                console.error("Error fetching booking:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooking();
    }, [params.vid, session, status]);

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    console.log("Details Available" , details)
    return (
        <main className="p-5">
            <h1 className="text-xl font-medium mb-4">Edit {details.data.campground.name} Booking</h1>

            {/* Name and Lastname input */}
            <TextField
                variant="standard"
                label="Name-Lastname"
                value={nameLastname}
                onChange={(e) => setNameLastname(e.target.value)}
                fullWidth
            />
            <br />

            {/* Contact Number input */}
            <TextField
                variant="standard"
                label="Contact Number"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                fullWidth
            />
            <br />

            {/* Campground selection */}
            {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
            <br />

            {/* Date Picker */}
            <DateReserve onDateChange={(value) => setBookDate(value)} selectedDate={bookDate} />
            <br />

            {/* Save button */}
            <Button
                variant="contained"
                color="primary"
                disabled={loading || !nameLastname || !tel || !bookDate}
                onClick={() => console.log("Booking updated!")}
            >
                Update Booking
            </Button>
        </main>
    );
}
