import { Component, inject, Input } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddVenueDialogComponent } from '../add-venue-dialog/add-venue-dialog.component';
import { VenuesStore } from '../venue-store/venue.store';
import { Venue } from '../../../models/venue.model';

@Component({
    selector: 'app-venue',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './venue.component.html',
    styleUrl: './venue.component.scss'
})
export class VenueComponent {

    dialog = inject(MatDialog)
    venueStore = inject(VenuesStore)
    @Input() venue: Venue

    onEdit() {
        console.log(this.venue)
        this.venueStore.selectVenue(this.venue)
        this.dialog.open(AddVenueDialogComponent)
    }
}
