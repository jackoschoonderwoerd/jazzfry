import { Booking } from "../../../models/booking.model";
import { StaffMember } from "../../../models/staff-member";
import { Venue } from "../../../models/venue.model"


export interface BookingsSlice {
    bookings: Booking[];
    indexSelectedBooking: number;
    showingAll: boolean;


}

export const initialBookingsSlice: BookingsSlice = {
    bookings: [],
    indexSelectedBooking: null,
    showingAll: false
}
