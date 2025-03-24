export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  dailyrate: number;
  __v: number;
  id: string;
}

export interface BookFetchItem{
  _id: string
  apptDate: string
  user: string
  campground:{
    id: string
    name: string
  }
  nameLastname: string
  tel: string
}

// _id
// name
// address
// district
// province
// postalcode
// tel
//++picture++
//++dailyrate++
// __v
//++id++

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: BookFetchItem[];
}

export interface BookingItem {
  booking_id: string ;
  nameLastname: string;
  tel: string;
  campground: string;
  bookDate: string;
}
