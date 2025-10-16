import { inject } from "@angular/core";
import { VenuesStore } from '../../../admin/venues/venue-store/venue.store';
import { Booking } from "../../../models/booking.model";
import { DateRange } from "@angular/material/datepicker";
import { MyDateRange } from "./bookings.slice";


export function getAll() {

}
export function getFuture_hideHidden(all: Booking[], yesterday: Date) {

    return all.filter((booking: Booking) => {
        return new Date(booking.date.seconds * 1000) > yesterday && !booking.hidden;
    })
}

export function excludePrivate(bookings: Booking[]): Booking[] {
    return bookings.filter((booking: Booking) => {
        return !booking.privateParty;
    })
}

export function excludeHiddenBookings(bookings: Booking[]): Booking[] {
    return bookings.filter((booking: Booking) => {
        return booking.hidden
    })
}
export function hidePast(bookings: Booking[], today: Date): Booking[] {
    console.log('hidePast', today);
    return bookings.filter((booking: Booking) => {
        return new Date(booking.date.seconds * 1000) > today
    });
}

export function getFirst(all: Booking[]) {

    return all[0]
}

export function get_Future_amsterdamOnly_hidePrivate_hideHidden(
    all: Booking[],
    yesterday: Date,
    venuesStore: any): Booking[] {

    const future = getFuture_hideHidden(all, yesterday)
    return future
}




export function setBookingsWithinDateRange(allBookings, dateRange) {
    const filtered = allBookings.filter(booking => {
        const bookingDate = new Date(booking.date.seconds * 1000);
        return (
            bookingDate >= dateRange.startDate &&
            bookingDate <= dateRange.endDate
        );
    });

    console.log(filtered);
    return filtered;
}
