import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<BookingItem[]>) => {
            state.bookItems = action.payload
        },
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const remainBeforeAdd = state.bookItems.filter(obj => {
                return ((obj.campground !== action.payload.campground)
                    || (obj.bookDate !== action.payload.bookDate))
            })
            state.bookItems = remainBeforeAdd
            state.bookItems.push(action.payload)
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.campground !== action.payload.campground)
                    || (obj.bookDate !== action.payload.bookDate)
                    || (obj.nameLastname !== action.payload.nameLastname)
                    || (obj.tel !== action.payload.tel))
            })
            state.bookItems = remainItems
        },
        editBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.map(obj => 
                (obj.campground === action.payload.campground &&
                 obj.bookDate === action.payload.bookDate &&
                 obj.nameLastname === action.payload.nameLastname &&
                 obj.tel === action.payload.tel)
                ? action.payload
                : obj
            );
        }
        
    }
})

export const { addBooking, removeBooking ,editBooking,setBookings} = bookSlice.actions
export default bookSlice.reducer
