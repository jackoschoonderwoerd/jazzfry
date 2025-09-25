import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { VenuesStore } from '../venue-store/venue.store';

@Component({
    selector: 'app-add-venue-dialog',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInput,
        MatFormFieldModule,
        MatDialogModule
    ],
    templateUrl: './add-venue-dialog.component.html',
    styleUrl: './add-venue-dialog.component.scss'
})
export class AddVenueDialogComponent {
    fb = inject(FormBuilder)
    form: FormGroup;
    venueStore = inject(VenuesStore);
    selectedVenue = this.venueStore.selectedVenue

    constructor() {
        this.form = this.fb.group({
            name: new FormControl(''),
            street: new FormControl(''),
            number: new FormControl(''),
            city: new FormControl(''),
            country: new FormControl(''),
            phone: new FormControl(''),
            contact: new FormControl(''),
            mapUrl: new FormControl(''),
            website: new FormControl('')

        })
        effect(() => {
            this.form.patchValue(this.selectedVenue())
        })
    }
    addVenue() {
        console.log(this.form.value)
        const venue = this.form.value;
        this.venueStore.addVenue(venue)
    }
}
