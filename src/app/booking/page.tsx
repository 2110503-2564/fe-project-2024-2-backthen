"use client"
import { TextField, Select, MenuItem, Button } from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"
import createBooking from "@/libs/createBooking"
import { useSession } from "next-auth/react"  // To get the token from session

export default function Form() {
  const { data: session } = useSession() // Get the session
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
      campground, // Ensure this is the correct campground ID
      bookDate: dayjs(bookDate).format("YYYY/MM/DD"), // Format the date correctly
    }

    // Ensure the token is available in the session
    const token = session?.user.token // Adjust this depending on how the token is stored

    if (!token) {
      console.error("No token found!")
      return
    }

    try {
      // Pass the item and token to the createBooking function
      const response = await createBooking(item, token)
      dispatch(addBooking(response)) // Dispatch the response to Redux
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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={makeBooking}
      >
        Book Campground
      </Button>
    </main>
  )
}
