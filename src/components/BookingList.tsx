"use client"
import { bookSlice, removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
export default function BookingList () {
    const BookingItem = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    return(
        <>
        {
            BookingItem.length === 0 ? (
                <div className="text-center text-xl">No Venue Booking</div>
              ) : (BookingItem.map((BookingItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                    <div className="text-xl">Name-Lastname : {BookingItem.nameLastname}</div>
                    <div className="text-xl">Tel : {BookingItem.tel}</div>
                    <div className="text-xl">Venue : {BookingItem.venue}</div>
                    <div className="text-xl">Date : {BookingItem.bookDate}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indido-600 px-3 py-1 text-white shadow-sm"
                    onClick={()=>dispatch(removeBooking(BookingItem))}>
                        Remove from My Booking
                    </button>
                </div>
            )))
        }
        </>
    )
}