import { AfterViewInit, Component, EnvironmentInjector, Inject, inject, OnInit, PLATFORM_ID, runInInjectionContext } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/header/header.component';
import { StaffStore } from './admin/staff/staff-store/staff.store';
import { VenuesStore } from './admin/venues/venue-store/venue.store';
import { BookingsStore } from './features/agenda/bookings-store/bookings.store';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { AuthStore } from './auth/auth.store';
import { FooterComponent } from './navigation/footer/footer.component';

import { UpcomingDialogComponent } from './features/upcoming-dialog/upcoming-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { PwaService } from './services/pwa.service';
import { isPlatformBrowser } from '@angular/common';

import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from './services/seo.service';

import { filter } from 'rxjs/operators';
import { UiStore } from './shared/ui-store/ui.store';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        MatSidenavModule,
        SidenavComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

    staffStore = inject(StaffStore);
    venuesStore = inject(VenuesStore);
    bookingsStore = inject(BookingsStore);
    afAuth = inject(Auth);
    authStore = inject(AuthStore)
    router = inject(Router);
    dialog = inject(MatDialog);
    private injector = inject(EnvironmentInjector);
    private isBrowser: boolean;
    style: string;
    uiStore = inject(UiStore);
    private swUpdate = inject(SwUpdate);
    private snackbar = inject(MatSnackBar);




    constructor(
        private seo: SeoService,
        public pwa: PwaService,
        @Inject(PLATFORM_ID)
        private platformId: object,
        private title: Title,
        private meta: Meta) {
        this.staffStore.getStaffMembers();
        this.venuesStore.getVenues();
        this.bookingsStore.getAllBookings();
        this.isBrowser = isPlatformBrowser(platformId);
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                // console.log('Navigation ended:', event.urlAfterRedirects);
                if (event.urlAfterRedirects === '/home'
                    // || event.urlAfterRedirects === '/admin/admin-gallery'
                    || event.urlAfterRedirects === '/admin/image-selector'
                ) {
                    this.style = "background-color: var(--sahara);"
                } else {
                    this.style = "background-color: var(--blue);"
                }
            });

        this.listenForUpdates()
    }



    ngOnInit(): void {

        if (isPlatformBrowser) {
            this.seo.setMeta({
                title: 'Jazzfry | Discover Jazz Events Near You',
                description: 'Find local jazz concerts, amsterdam, artists, and venues with Jazzfry.',
                url: 'https://www.jazzfry.com',
                image: 'https://www.jazzfry.com/assets/preview.jpg',
            });
        }
        runInInjectionContext(this.injector, () => {
            onAuthStateChanged(this.afAuth, (user: FirebaseUser | null) => {
                if (user) {
                    this.authStore.persistLogin();
                } else {
                    this.router.navigateByUrl('home');
                    this.authStore.addVisit();
                }
            })
        })

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (const registration of registrations) {
                    if (registration.active && registration.active.scriptURL.includes('ngsw-worker.js')) {
                        console.log('Unregistering old Service Worker:', registration.active.scriptURL);
                        registration.unregister();
                    }
                }
            });
        }

        if (this.authStore.isLoggedIn()) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    if (registrations.length > 0) {
                        console.log('Service Worker registered — likely a PWA.');
                    } else {
                        console.log('No Service Worker found.');
                    }
                    setTimeout(() => {
                        console.log('this.pwa.canInstall(): ', this.pwa.canInstall());
                    }, 1000);
                });
            } else {
                console.log('Service Workers not supported in this browser.');
            }
        }
    }


    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        setTimeout(() => {

            if (!this.authStore.isLoggedIn()) {
                this.dialog.open(UpcomingDialogComponent, {
                    'width': '100%',
                    'maxWidth': '400px',
                    data: {
                        calledFrom: 'app-component'
                    }
                })
            }
        },);



        if (isPlatformBrowser(this.platformId)) {
            // open dialog here
        }

    }
    private listenForUpdates() {
        if (!this.swUpdate.isEnabled) return;

        this.swUpdate.versionUpdates.subscribe(event => {
            if (event.type === 'VERSION_READY') {
                const snack = this.snackbar.open(
                    'A new version of the app is available.',
                    'Reload',
                    { duration: 0 } // keep it until user acts
                );

                snack.onAction().subscribe(() => {
                    this.swUpdate.activateUpdate().then(() => document.location.reload());
                });
            }
        });
    }
}
