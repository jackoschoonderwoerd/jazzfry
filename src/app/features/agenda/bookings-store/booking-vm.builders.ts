import { inject } from "@angular/core";
import { VenuesStore } from "../../../admin/venues/venue-store/venue.store";
import { Booking } from "../../../models/booking.model";
import { DateRange } from "@angular/material/datepicker";
import { MyDateRange } from "./bookings.slice";

// export function buildAllFutureInclusivePrivateExclusiveHiddenVm(allBookings: Booking[], today: Date): Booking[] {
// const today = new Date()

// const futureBookingsArray = futureBookings(allBookings, today)

// return excludePastBookings(allBookings, today)



// function futureBookings(): Booking[] {
//     console.log('hi there')

//     return allBookings.filter((booking: Booking) => {
//         console.log(booking.date.seconds)
//         console.log(futureBookings)
//         return new Date(booking.date.seconds * 1000) > today

//     });
// return futureBookings
// }

// }

// export function hidePast(bookings: Booking[], today: Date) {
//     return bookings.filter((booking: Booking) => {
//         return new Date(booking.date.seconds * 1000) > today
//     });
// }

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
    // console.log(all)
    // console.log(all[0])
    return all[0]
}

export function getFuture_amsterdamOnly_hidePrivate_hideHidden(all: Booking[], yesterday: Date) {
    const future = getFuture_hideHidden(all, yesterday)
    return future
}

export function amsterdamOnly(all: Booking[], yesterday: Date, venuesStore) {
    const vs = inject(VenuesStore)
    const futures: Booking[] = all.filter((booking: Booking) => {
        return new Date(booking.date.seconds * 1000) > yesterday;
    })
    // console.log(futures)
    // return futures
    const isInAmsterdam = futures.filter((future: Booking) => {
        return vs.getVenueById(future.venue).city === 'amsterdam'
    })
    return isInAmsterdam
}
export function setBookingsWithinDateRange(dateRange: MyDateRange) {

    return []
}
