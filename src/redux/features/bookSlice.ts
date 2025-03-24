import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";
import { CampgroundJson } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<CampgroundJson>) => {
            console.log(action.payload);
            const data = action.payload.data;
            const bookingItems: BookingItem[] = data.map(item => ({
                booking_id: item?._id || "",
                nameLastname: item?.nameLastname || "", // เพิ่มการตรวจสอบ item
                tel: item?.tel || "", // เพิ่มการตรวจสอบ item
                campground: item?.campground?.name || "", // เพิ่มการตรวจสอบ item
                bookDate: item?.apptDate || "", // เพิ่มการตรวจสอบ item
            }));
            state.bookItems = bookingItems;
            console.log(bookingItems)
        },
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const remainBeforeAdd = state.bookItems.filter(obj => {
                return ((obj.campground !== action.payload.campground)
                    || (obj.bookDate !== action.payload.bookDate))
            })
            state.bookItems = remainBeforeAdd
            state.bookItems.push(action.payload)
        },
        removeBookingPage: (state, action: PayloadAction<BookingItem>) => {
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

export const { addBooking, removeBookingPage ,editBooking,setBookings} = bookSlice.actions
export default bookSlice.reducer
