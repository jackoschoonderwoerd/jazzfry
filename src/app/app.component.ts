import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { StaffStore } from './admin/staff/staff-store/staff.store';
import { VenuesStore } from './admin/venues/venue-store/venue.store';
import { BookingsStore } from './features/agenda/bookings-store/bookings.store';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { AuthStore } from './auth/auth.store';
import { FooterComponent } from './navigation/footer/footer.component';
import { Dialog } from '@angular/cdk/dialog';
import { UpcomingDialogComponent } from './features/upcoming-dialog/upcoming-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getFirst } from './features/agenda/bookings-store/booking-vm.builders';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'jazzfry';
    staffStore = inject(StaffStore);
    venuesStore = inject(VenuesStore);
    bookingsStore = inject(BookingsStore);
    afAuth = inject(Auth);
    authStore = inject(AuthStore)
    router = inject(Router);
    dialog = inject(MatDialog)


    constructor() {
        console.log(' constructor')
        this.staffStore.getStaffMembers();
        this.venuesStore.getVenues();
        this.bookingsStore.getAllBookings();
        // setTimeout(() => {

        //     this.bookingsStore.setFuture_hideHidden()
        // }, 1000);

    }

    ngOnInit(): void {

        onAuthStateChanged(this.afAuth, (user: FirebaseUser | null) => {
            if (user) {
                this.authStore.persistLogin();
            } else {
                this.router.navigateByUrl('home');
                this.authStore.addVisit();
                console.log(this.authStore.isLoggedIn())
                this.dialog.open(UpcomingDialogComponent, {
                    'width': '100%',
                    'maxWidth': '400px'
                })

            }
        })
    }
}
