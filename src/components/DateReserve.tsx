'use client'

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export default function DateReserve({ 
    onDateChange, 
    selectedDate 
}: { 
    onDateChange: (date: Dayjs | null) => void;
    selectedDate?: Dayjs | null;
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate || null} // Handles null values correctly
                onChange={(newValue) => onDateChange(newValue)}
            />
        </LocalizationProvider>
    );
}
