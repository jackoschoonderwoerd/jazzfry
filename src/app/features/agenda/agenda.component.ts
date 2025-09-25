import { Component, inject } from '@angular/core';


import { BookingComponent } from './booking/booking.component';

import { BookingsStore } from './bookings-store/bookings.store';
import { NgClass, NgStyle } from '@angular/common';
import { AuthStore } from '../../auth/auth.store';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-agenda',
    imports: [BookingComponent, MatButtonModule],
    templateUrl: './agenda.component.html',
    styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
    authStore = inject(AuthStore)


    bookingsStore = inject(BookingsStore)



}
