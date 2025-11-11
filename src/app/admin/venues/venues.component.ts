import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddVenueDialogComponent } from './add-venue-dialog/add-venue-dialog.component';

import { JsonPipe } from '@angular/common';
import { VenueComponent } from './venue/venue.component';
import { VenuesStore } from './venue-store/venue.store';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'app-venues',
    imports: [MatButtonModule, VenueComponent, RouterModule],
    templateUrl: './venues.component.html',
    styleUrl: './venues.component.scss'
})
export class VenuesComponent {
    dialog = inject(MatDialog);
    venueStore = inject(VenuesStore);
    router = inject(Router)

    constructor() {
        this.venueStore.getVenues()
    }

    onAddVenue() {
        this.router.navigateByUrl('/add-venue')
        return
        this.dialog.open(AddVenueDialogComponent, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            panelClass: 'full-screen-dialog'
        })
    }
}
