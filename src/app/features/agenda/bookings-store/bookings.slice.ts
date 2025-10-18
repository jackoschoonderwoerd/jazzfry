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

    bookingsWithinDateRange: Booking[]
    indexSelectedBooking: number;
    showingAll: boolean;

    dateFilterActive: boolean;
    onlyAmsterdamFutureFilterActive: boolean;
    showAllActive: boolean;


}

export const initialBookingsSlice: BookingsSlice = {
    all: [],
    filtered: [],

    bookingsWithinDateRange: [],

    indexSelectedBooking: null,
    showingAll: false,
    // first: null,

    dateFilterActive: false,
    onlyAmsterdamFutureFilterActive: false,
    showAllActive: true
}
