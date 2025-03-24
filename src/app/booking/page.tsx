"use client"
import { TextField, Select, MenuItem, Button, CircularProgress } from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { useState, useEffect } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem, CampgroundItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"
import createBooking from "@/libs/createBooking"
import { useSession } from "next-auth/react"

export default function Form() {
  const { data: session } = useSession()
  const [bookDate, setBookDate] = useState<Dayjs | null>(null)
  const [nameLastname, setNameLastname] = useState("")
  const [campground, setCampground] = useState("")
  const [tel, setTel] = useState("")
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  // Fetch campgrounds when component mounts
  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await fetch("https://campground-backend-cyan.vercel.app/api/v1/campgrounds")
        const data = await response.json()
        setCampgrounds(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching campgrounds:", error)
        setLoading(false)
      }
    }

    fetchCampgrounds()
  }, [])

  const makeBooking = async () => {
    if (!bookDate) {
      console.error("Please select a valid date")
      return
    }

    // Prepare the booking data to send to the backend
    const item: BookingItem = {
      booking_id: "" ,
      nameLastname,
      tel,
      campground, // This should now be the campground ID from the database
      bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
    }

    const token = session?.user.token

    if (!token) {
      console.error("No token found!")
      return
    }

    try {
      const response = await createBooking(item, token)
      dispatch(addBooking(response))
      console.log("Booking successful:", response)
    } catch (error) {
      console.error("Error creating booking:", error)
    }
  }

  return (
    <main>
      {/* Name and Lastname input */}
      <TextField
        variant="standard"
        name="Name-Lastname"
        label="Name-Lastname"
        value={nameLastname}
        onChange={(e) => setNameLastname(e.target.value)}
        fullWidth
      />
      <br />

      {/* Contact Number input */}
      <TextField
        variant="standard"
        name="Contact-Number"
        label="Contact-Number"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        fullWidth
      />
      <br />

      {/* Campground selection */}
      <Select
        variant="standard"
        id="campground"
        value={campground}
        onChange={(e) => setCampground(e.target.value)}
        disabled={loading}
        fullWidth
      >
        {loading ? (
          <MenuItem value="">Loading campgrounds...</MenuItem>
        ) : (
          campgrounds.map((camp: CampgroundItem) => (
            <MenuItem key={camp.id} value={camp.id}>
              {camp.name}
            </MenuItem>
          ))
        )}
      </Select>
      {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
      <br />

      {/* Date Reserve component */}
      <DateReserve onDateChange={(value) => setBookDate(value)} />
      <br />

      {/* Book button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={makeBooking}
        disabled={loading || !nameLastname || !tel || !bookDate || !campground}
      >
        Book Campground
      </Button>
    </main>
  )
}
