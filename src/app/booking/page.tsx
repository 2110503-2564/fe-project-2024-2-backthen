"use client"
import { TextField } from "@mui/material"
import {Select, MenuItem} from "@mui/material"
import DateReserve from "@/components/DateReserve"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
//import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"

export default function Form(){

    // const session = await getServerSession(authOptions)
    // if(!session || !session.user.token)return null

    // const profile = await getUserProfile(session.user.token)

    const [bookDate,setBookDate] = useState<Dayjs|null>(null)

    const [ nameLastname, setNameLastname ] = useState("")
    const [ venue, setVenue ] = useState("")
    const [ tel, setTel ] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        const item:BookingItem = {
            nameLastname: nameLastname ,
            tel: tel ,
            venue: venue,
            bookDate: dayjs(bookDate).format("YYYY/MM/DD")
        }
        dispatch(addBooking(item))
    }
    
    return(
        <main>
            {/* <div className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name} Profile</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Name</td><td>{profile.data.name}</td></tr>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{profile.data.createdAt}</td></tr>
                </tbody></table>
            </div> */}
            
            <TextField variant="standard" name='Name-Lastname' label='Name-Lastname' value={nameLastname} onChange={(e)=>setNameLastname(e.target.value)}/>
            <TextField variant="standard" name='Contact-Number' label='Contact-Number' value={tel} onChange={(e)=>setTel(e.target.value)}/>
            <Select variant="standard" id='venue'
                value={venue}
                onChange={(e) => setVenue(e.target.value)}>
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>    
            </Select><br/>
            <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}/><br/>
            <button name="Book Venue" onClick={makeBooking}>Book Venue</button>
                 
        </main>
    )
}