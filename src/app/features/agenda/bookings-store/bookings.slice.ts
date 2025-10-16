import { Booking } from "../../../models/booking.model";
import { StaffMember } from "../../../models/staff-member";
import { Venue } from "../../../models/venue.model"

export interface MyDateRange {
    startDate: Date;
    endDate: Date;
}

export interface BookingsSlice {
    all: Booking[];
    filtered: Booking[];
    // future_hideHidden: Booking[];
    // future_amsterdamOnly_hidePrivate_hideHidden: Booking[];
    // show_future_amsterdamOnly_hidePrivate_hideHidden: boolean;
    bookingsWithinDateRange: Booking[]
    indexSelectedBooking: number;
    showingAll: boolean;
    // first: Booking;

    dateFilterActive: boolean;
    onlyAmsterdamFutureFilterActive: boolean;
    showAll: boolean;


}

export const initialBookingsSlice: BookingsSlice = {
    all: [],
    filtered: [],
    // future_hideHidden: [],
    // future_amsterdamOnly_hidePrivate_hideHidden: [],
    // show_future_amsterdamOnly_hidePrivate_hideHidden: true,
    bookingsWithinDateRange: [],

    indexSelectedBooking: null,
    showingAll: false,
    // first: null,

    dateFilterActive: false,
    onlyAmsterdamFutureFilterActive: false,
    showAll: true
}
