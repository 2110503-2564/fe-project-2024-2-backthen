"use client"
import { useState, useEffect } from "react"
import { TextField, Select, MenuItem } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { editBooking } from "@/redux/features/bookSlice"
import { BookingItem } from "../../../../interface"
import getBooking from "@/libs/getBooking"
import updateBooking from "@/libs/updateBooking"
import DateReserve from "@/components/DateReserve"

export default function ManageBooking({ params }: { params: { cid: string } }) {
    const dispatch = useDispatch<AppDispatch>()
    
    // States for form fields
    const [bookDate, setBookDate] = useState<Dayjs | null>(null)
    const [nameLastname, setNameLastname] = useState("")
    const [campground, setCampground] = useState("")
    const [tel, setTel] = useState("")

    // Load existing booking details
    useEffect(() => {
        async function fetchBooking() {
            const bookingDetail = await getBooking(params.cid)
            if (bookingDetail) {
                setNameLastname(bookingDetail.nameLastname)
                setTel(bookingDetail.tel)
                setCampground(bookingDetail.campground)
                setBookDate(dayjs(bookingDetail.bookDate)) // Convert date to Dayjs
            }
        }
        fetchBooking()
    }, [params.cid]) // Runs when `params.cid` changes

    const editsBooking = () => {
        if (bookDate) {
            const item: BookingItem = {
                nameLastname,
                tel,
                campground,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
            }
            dispatch(editBooking(item))
            updateBooking(params.cid, item)
        } else {
            console.error("Please select a valid date")
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
            <DateReserve onDateChange={(value: Dayjs | null) => setBookDate(value)} selectedDate={bookDate} />
            <br />
            <button name="Book Campground" onClick={editsBooking}>Confirm</button>
        </main>
    )
}
