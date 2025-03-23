'use client'

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve ({onDateChange}:{onDateChange:Function}){

    const [ bookDate , setBookDate ] = useState<Dayjs|null>(null)

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={bookDate} onChange={(value)=>{setBookDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    )
}