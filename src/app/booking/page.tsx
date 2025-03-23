"use client"
import { TextField, Select, MenuItem } from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"
import createBooking from "@/libs/createBooking"

export default function Form() {
    const [bookDate, setBookDate] = useState<Dayjs | null>(null)
    const [nameLastname, setNameLastname] = useState("")
    const [campground, setCampground] = useState("")
    const [tel, setTel] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = async () => {
        if (!bookDate) {
            console.error("Please select a valid date")
            return
        }

        const item: BookingItem = {
            nameLastname,
            tel,
            campground,
            bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
        }

        try {
            const response = await createBooking(item) // Wait for API response
            dispatch(addBooking(response)) // Only update Redux if API is successful
            console.log("Booking successful:", response)
        } catch (error) {
            console.error("Error creating booking:", error)
        }
    }

    return (
        <main>
            <TextField
                variant="standard"
                name="Name-Lastname"
                label="Name-Lastname"
                value={nameLastname}
                onChange={(e) => setNameLastname(e.target.value)}
            />
            <TextField
                variant="standard"
                name="Contact-Number"
                label="Contact-Number"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
            />
            <Select
                variant="standard"
                id="campground"
                value={campground}
                onChange={(e) => setCampground(e.target.value)}
            >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>
            <br />
            <DateReserve onDateChange={(value) => setBookDate(value)} />
            <br />
            <button name="Book Campground" onClick={makeBooking}>
                Book Campground
            </button>
        </main>
    )
}
