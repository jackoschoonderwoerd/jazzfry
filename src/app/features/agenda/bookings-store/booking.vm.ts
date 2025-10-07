import { Booking } from "../../../models/booking.model";

export interface BookingsVm {
    readonly all: Booking[]; // admin
    readonly allFutureInclusivePrivateInclusiveHidden: Booking[]; // admin
    readonly allFutureInclusivePrivateExclusiveHidden: Booking[]; // bandMembers
    readonly allFutureExclusivePrivateExclusiveHidden: Booking[]; // jazzInAmsterdam
    readonly upcomingBooking: Booking // user
}
