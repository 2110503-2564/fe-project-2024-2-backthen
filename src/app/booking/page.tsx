"use client"
import { TextField, Select, MenuItem, Button, CircularProgress, InputLabel, FormControl } from "@mui/material"
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
  const [isSubmitting, setIsSubmitting] = useState(false) // To handle submit button loading
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
      booking_id: "",
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

    // Set the submitting state to true to show loading indicator
    setIsSubmitting(true)

    try {
      const response = await createBooking(item, token)
      dispatch(addBooking(response))
      console.log("Booking successful:", response)
      setIsSubmitting(false) // Reset submitting state after success
    } catch (error) {
      console.error("Error creating booking:", error)
      setIsSubmitting(false) // Reset submitting state in case of error
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Name and Lastname input */}
      <TextField
        variant="outlined"
        name="Name-Lastname"
        label="Name-Lastname"
        value={nameLastname}
        onChange={(e) => setNameLastname(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Contact Number input */}
      <TextField
        variant="outlined"
        name="Contact-Number"
        label="Contact-Number"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Campground selection */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Campground</InputLabel>
        <Select
          label="Campground"
          value={campground}
          onChange={(e) => setCampground(e.target.value)}
          disabled={loading}
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
        {loading && <CircularProgress size={20} sx={{ ml: 1, mt: 1 }} />}
      </FormControl>

      {/* Date Reserve component */}
      <DateReserve onDateChange={(value) => setBookDate(value)} />
      <br />

      {/* Submit button */}
      <Button
        variant="contained"
        color="primary"
        onClick={makeBooking}
        disabled={loading || !nameLastname || !tel || !bookDate || !campground || isSubmitting}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Book Campground"}
      </Button>
    </main>
  )
}
