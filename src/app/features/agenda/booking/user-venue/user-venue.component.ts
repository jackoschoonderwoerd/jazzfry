import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { Venue } from '../../../../models/venue.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { WebsiteDialogComponent } from './website-dialog/website-dialog.component';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../../../../auth/auth.store';



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
export class UserVenueComponent implements OnInit {


    venue: InputSignal<Venue> = input<Venue>();
    http = inject(HttpClient)
    dialog = inject(MatDialog)
    privateBooking: InputSignal<boolean> = input<boolean>();
    showName: InputSignal<boolean> = input<boolean>();
    authStore = inject(AuthStore)
    // instagramUrl = 'https://www.instagram.com/yourusername';
    frameStatus = signal<boolean>(false); // empty by default

    constructor() {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.checkWebsiteAccessibility()
        }, 1000);

    }

    checkWebsiteAccessibility() {
        const apiUrl = 'https://checkiframe-w2t5jvzxtq-uc.a.run.app';

        const url = this.venue()?.website;


        this.http
            .get<{ frameAllowed: boolean }>(`${apiUrl}?url=${encodeURIComponent(url)}`)
            .subscribe({
                next: res => {
                    const status = res.frameAllowed ? '✅ Allowed' : '🚫 Blocked';
                    // this.frameStatus.set(status);  // update signal
                    this.frameStatus.set(res.frameAllowed);
                },
                error: err => {
                    console.error('❌ Error:', err);
                    // this.frameStatus.set('❌ Error'); // show error in UI
                    this.frameStatus.set(false);
                }
            });
    }



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

