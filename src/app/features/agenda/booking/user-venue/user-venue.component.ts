import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { Venue } from '../../../../models/venue.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { WebsiteDialogComponent } from './website-dialog/website-dialog.component';



@Component({
    selector: 'app-user-venue',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
    ],
    templateUrl: './user-venue.component.html',
    styleUrl: './user-venue.component.scss',

})
export class UserVenueComponent {


    venue: InputSignal<Venue> = input<Venue>();
    dialog = inject(MatDialog)
    privateBooking: InputSignal<boolean> = input<boolean>();
    showName: InputSignal<boolean> = input<boolean>();



    openWebsiteDialog() {
        this.dialog.open(WebsiteDialogComponent, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            data: { venue: this.venue().website },

            panelClass: 'fullscreen-dialog',
            autoFocus: false,
            restoreFocus: false,
        })
    }

    onMapDialog() {
        this.dialog.open(MapDialogComponent, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            panelClass: 'fullscreen-dialog',
            data: { mapUrl: this.venue().mapUrl },
            autoFocus: false,
            restoreFocus: false
        })
    }

}

