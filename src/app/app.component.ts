import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { StaffStore } from './admin/staff/staff-store/staff.store';
import { VenuesStore } from './admin/venues/venue-store/venue.store';
import { BookingsStore } from './features/agenda/bookings-store/bookings.store';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { AuthStore } from './auth/auth.store';
import { FooterComponent } from './navigation/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'jazzfry';
    staffStore = inject(StaffStore);
    venuesStore = inject(VenuesStore);
    bookinsStore = inject(BookingsStore);
    afAuth = inject(Auth);
    authStore = inject(AuthStore)
    router = inject(Router)
    constructor() {
        this.staffStore.getStaffMembers();
        this.venuesStore.getVenues();
        this.bookinsStore.getBookings();
    }

    ngOnInit(): void {
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.authStore.persistLogin();
            } else {
                this.router.navigateByUrl('home');
            }
        })
        if (!this.authStore.isLoggedIn()) {
            this.authStore.addVisit();
        }
    }
}
