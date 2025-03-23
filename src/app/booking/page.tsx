"use client"
import { TextField } from "@mui/material"
import { Select, MenuItem } from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"

export default function Form(){

    const [bookDate, setBookDate] = useState<Dayjs | null>(null)

    const [nameLastname, setNameLastname] = useState("")
    const [campground, setCampground] = useState("")
    const [tel, setTel] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if (bookDate) { // Ensure bookDate is not null before creating the booking item
            const item: BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                campground: campground,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))
        } else {
            console.error("Please select a valid date")
        }
    }

    return(
        <main>
            <TextField 
                variant="standard" 
                name='Name-Lastname' 
                label='Name-Lastname' 
                value={nameLastname} 
                onChange={(e) => setNameLastname(e.target.value)} 
            />
            <TextField 
                variant="standard" 
                name='Contact-Number' 
                label='Contact-Number' 
                value={tel} 
                onChange={(e) => setTel(e.target.value)} 
            />
            <Select 
                variant="standard" 
                id='campground'
                value={campground}
                onChange={(e) => setCampground(e.target.value)}
            >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>    
            </Select><br/>
            <DateReserve onDateChange={(value: Dayjs | null) => { setBookDate(value) }} /><br/>
            <button name="Book Campground" onClick={makeBooking}>Book Campground</button>
        </main>
    )
}
