import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, inject, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';




import { FirestoreService } from '../../../shared/firestore.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { SnackbarService } from '../../../shared/snackbar.service';

import { PATH_TO_BOOKINGS } from '../../../models/constants';


import { Booking } from '../../../models/booking.model';


import { VenuesStore } from '../../../admin/venues/venue-store/venue.store';
import { initialStatsSlice } from './stats.slice';


export const StatsStore = signalStore(
    { providedIn: 'root' },
    withState(initialStatsSlice),

    withMethods((store) => {
        const fs = inject(FirestoreService);
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService);
        const venuesStore = inject(VenuesStore);

        return {
            // getAllBookings: () => {
            //     fs.sortedCollection(PATH_TO_BOOKINGS, 'date', 'asc')
            //         .subscribe((bookings: Booking[]) => {
            //             patchState(store, { all: bookings, showingAll: true });
            //         });
            // },
            setStartDate(startDate: Date) {
                patchState(store, { startDate })
            },
            setEndDate(endDate: Date) {
                patchState(store, { endDate })
            }
        };
    }),

    withComputed((store) => {
        const venuesStore = inject(VenuesStore);

        return {
            //     first: computed(() => {
            //         console.log('first');
            //         return getFirst(store.all());
            //     }),

            //     future_hideHidden: computed(() => {
            //         console.log('future_hideHidden');
            //         const today = new Date();
            //         const yesterday = new Date(today);
            //         yesterday.setDate(today.getDate() - 1);
            //         yesterday.setHours(0, 0, 0, 0);
            //         return getFuture_hideHidden(store.all(), yesterday);
            //     }),

            //     future_amsterdamOnly_hidePrivate_hideHidden: computed(() => {
            //         console.log('future_amsterdamOnly_hidePrivate_hideHidden');
            //         const today = new Date();
            //         const yesterday = new Date(today);
            //         yesterday.setDate(today.getDate() - 1);
            //         yesterday.setHours(0, 0, 0, 0);

            //         // get only future bookings
            //         const futures = store.all().filter(
            //             (b: Booking) => new Date(b.date.seconds * 1000) > yesterday
            //         );

            //         // ✅ Filter by city
            //         const isInAmsterdam = futures.filter(
            //             (b: Booking) => venuesStore.getVenueById(b.venue)?.city === 'amsterdam'
            //         );

            //         return isInAmsterdam;
            //     }),
        };
    }),
);







