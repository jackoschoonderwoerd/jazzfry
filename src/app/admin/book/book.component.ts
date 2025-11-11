import { Component, inject } from '@angular/core';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

import { VenuePickerComponent } from './venue-picker/venue-picker.component';
import { StaffPickerComponent } from './staff-picker/staff-picker.component';
import { BookStore } from './book-store/book.store';
import { VenuesStore } from '../venues/venue-store/venue.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StaffMemberComponent } from '../staff/staff-member/staff-member.component';
import { PrivatePartyPickerComponent } from './private-party-picker/private-party-picker.component';
import { DatePipe } from '@angular/common';
import { VisibleToUserPickerComponent } from './visible-to-user-picker/visible-to-user-picker.component';



@Component({
    selector: 'app-book',
    imports: [
        DatePickerComponent,
        TimePickerComponent,
        VenuePickerComponent,
        StaffPickerComponent,
        VisibleToUserPickerComponent,
        PrivatePartyPickerComponent,
        MatButtonModule,
        StaffMemberComponent,
        DatePipe,
        MatIconModule
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

    moveStaffMemberUp(staffMemberId: string) {



        const newArray: string[] = moveUp(this.bookStore.staffMemberIds(), staffMemberId)
        this.bookStore.setStaffmemberIdsArray(newArray)
    }

    moveStaffMemberDown(staffMemberId: string) {
        console.log('down')
        console.log(staffMemberId, this.bookStore.staffMemberIds());

        const newArray: string[] = moveDown(this.bookStore.staffMemberIds(), staffMemberId)
        this.bookStore.setStaffmemberIdsArray(newArray)
    }
}

function moveUp<T>(array: T[], element: T): T[] {
    const index = array.indexOf(element);
    if (index > 0) {
        // swap with previous element
        [array[index - 1], array[index]] = [array[index], array[index - 1]];
    }
    return array;
}



function moveDown<T>(array: T[], element: T): T[] {
    const index = array.indexOf(element);
    if (index !== -1 && index < array.length - 1) {
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
    }
    return array;
}
