import { Component, inject, Input, signal } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { NgClass, NgStyle } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BookStore } from '../../../admin/book/book-store/book.store';
import { UserVenueComponent } from './user-venue/user-venue.component';
import { UserStaffMemberComponent } from './user-staff-member/user-staff-member.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingsStore } from '../bookings-store/bookings.store';
import { AuthStore } from '../../../auth/auth.store';
import { VenuesStore } from '../../../admin/venues/venue-store/venue.store';

import { StaffStore } from '../../../admin/staff/staff-store/staff.store';

import { UiStore } from '../../../shared/ui-store/ui.store';
import { DateComponent } from '../../../shared/date/date.component';
import { HourComponent } from '../../../shared/hour/hour.component';



@Component({
    selector: 'app-booking',
    imports: [
        MatExpansionModule,
        DateComponent,
        MatButtonModule,
        MatIconModule,
        UserVenueComponent,
        UserStaffMemberComponent,
        NgClass,
        NgStyle,
        HourComponent

    ],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss'
})
export class BookingComponent {
    @Input() booking: Booking;
    @Input() index: number

    // booking = input<Booking>

    staffStore = inject(StaffStore)
    router = inject(Router);
    bookStore = inject(BookStore);
    authStore = inject(AuthStore)
    dialog = inject(MatDialog);
    bookingsStore = inject(BookingsStore);
    venuesStore = inject(VenuesStore);
    uiStore = inject(UiStore);

    panelOpen = signal(false)



    onEdit(e: Event) {
        e.stopPropagation()
        // console.log(this.booking)
        this.router.navigateByUrl('admin/book')
        this.bookStore.setBookingForEdit(this.booking)
    }

    setIndex(index) {
        this.bookingsStore.setIndexSelectedBooking(index)
    }

    getIsMonthOdd() {
        return new Date(this.booking.date.seconds * 1000).getMonth() % 2 !== 0;
    }

    getExpansionPanelHeaderStyle() {
        return { 'color': 'red!important' }
    }

    onPanelOpened() {
        this.panelOpen.set(true);
    }

    onPanelClosed() {
        this.panelOpen.set(false);
    }


}
