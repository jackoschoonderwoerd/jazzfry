import { Component, inject } from '@angular/core';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

import { VenuePickerComponent } from './venue-picker/venue-picker.component';
import { StaffPickerComponent } from './staff-picker/staff-picker.component';
import { BookStore } from './book-store/book.store';
import { VenuesStore } from '../venues/venue-store/venue.store';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StaffMemberComponent } from '../staff/staff-member/staff-member.component';
import { PrivatePartyPickerComponent } from './private-party-picker/private-party-picker.component';



@Component({
    selector: 'app-book',
    imports: [
        DatePickerComponent,
        TimePickerComponent,
        VenuePickerComponent,
        StaffPickerComponent,
        PrivatePartyPickerComponent,
        MatButtonModule,
        StaffMemberComponent,
    ],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss'
})
export class BookComponent {
    bookStore = inject(BookStore)
    venueStore = inject(VenuesStore)
    router = inject(Router)
    constructor() {
        this.venueStore.getVenues()
    }

    onBook() {
        if (this.bookStore.editmode()) {
            this.bookStore.updateBooking()
        } else {

            this.bookStore.addBooking()
        }
    }



    onCancel() {
        this.router.navigateByUrl('agenda')
        this.bookStore.clearForm();
    }
}
