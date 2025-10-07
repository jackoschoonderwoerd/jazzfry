import { Component, inject } from '@angular/core';
import { BookingsStore } from '../../features/agenda/bookings-store/bookings.store';
import { JsonPipe } from '@angular/common';
import { BookingComponent } from '../../features/agenda/booking/booking.component';

@Component({
    selector: 'app-all-bookings',
    imports: [BookingComponent],
    templateUrl: './all-bookings.component.html',
    styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
    bookingsStore = inject(BookingsStore)
}
