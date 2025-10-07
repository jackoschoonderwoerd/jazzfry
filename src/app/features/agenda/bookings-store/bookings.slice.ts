import { Booking } from "../../../models/booking.model";
import { StaffMember } from "../../../models/staff-member";
import { Venue } from "../../../models/venue.model"

export interface MyDateRange {
    startDate: Date;
    endDate: Date;
}

export interface BookingsSlice {
    all: Booking[];
    future_hideHidden: Booking[];
    future_amsterdamOnly_hidePrivate_hideHidden: Booking[];
    show_future_amsterdamOnly_hidePrivate_hideHidden: boolean;
    bookingsWithinDateRange: Booking[]


    indexSelectedBooking: number;
    showingAll: boolean;
    first: Booking


}

export const initialBookingsSlice: BookingsSlice = {
    all: [],
    future_hideHidden: [],
    future_amsterdamOnly_hidePrivate_hideHidden: [],
    show_future_amsterdamOnly_hidePrivate_hideHidden: true,
    bookingsWithinDateRange: [],

    indexSelectedBooking: null,
    showingAll: false,
    first: null
}
