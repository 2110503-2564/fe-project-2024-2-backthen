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
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer
