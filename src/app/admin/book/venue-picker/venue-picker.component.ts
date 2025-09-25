import { Component, inject } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { VenuesStore } from '../../venues/venue-store/venue.store';
import { BookStore } from '../book-store/book.store';
import { Venue } from '../../../models/venue.model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-venue-picker',
    imports: [
        MatFormFieldModule,
        MatSelect,
        MatOption,
        FormsModule,
    ],
    templateUrl: './venue-picker.component.html',
    styleUrl: './venue-picker.component.scss'
})
export class VenuePickerComponent {

    currentVenue: Venue;
    currentVenueId: string | null = null;

    constructor() {
        if (this.bookStore.venue()) {
            this.currentVenue = this.bookStore.venue()
            console.log(this.currentVenue)
        }
        if (this.bookStore.venue()) {
            this.currentVenueId = this.bookStore.venue().id
            console.log(this.currentVenueId)
        }
    }

    venueStore = inject(VenuesStore);
    bookStore = inject(BookStore)


}
