'use client'

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve ({ onDateChange, selectedDate}: { onDateChange: (date: Dayjs | null) => void ,selectedDate?: Dayjs | null}) {

    const [bookDate, setBookDate] = useState<Dayjs | null>(null)

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Select Date"
            value={selectedDate || null} // <-- Ensure it handles null
            onChange={(newValue) => onDateChange(newValue)}
        />
            </LocalizationProvider>
        </div>
    )
}
