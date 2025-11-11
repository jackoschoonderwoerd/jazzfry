import { Component, inject, OnInit } from '@angular/core';


import { BookingComponent } from './booking/booking.component';

import { BookingsStore } from './bookings-store/bookings.store';

import { AuthStore } from '../../auth/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-agenda',
    imports: [
        BookingComponent,
        MatButtonModule,
        // JsonPipe
    ],
    templateUrl: './agenda.component.html',
    styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
    authStore = inject(AuthStore)


    bookingsStore = inject(BookingsStore);


    constructor(

        private seo: SeoService,
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser) {
            this.seo.setMeta({
                title: 'Jazzfry | Discover Jazz Events Near You',
                description: 'Find local jazz concerts, amsterdam, artists, and venues with Jazzfry.',
                url: 'https://www.jazzfry.com',
                image: 'https://www.jazzfry.com/assets/preview.jpg',
            });
        }
    }



}
