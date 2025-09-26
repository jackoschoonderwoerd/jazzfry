import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

import { inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';



import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../../shared/firestore.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Venue } from '../../../models/venue.model';
import { PATH_TO_BOOKINGS, PATH_TO_STAFFMEMBERS, PATH_TO_VENUES } from '../../../models/constants';

import { StaffMember } from '../../../models/staff-member';
import { Booking } from '../../../models/booking.model';
import { filter } from 'rxjs';
import { initialBookingsSlice } from './bookings.slice';
import { where } from '@angular/fire/firestore';



export const BookingsStore = signalStore(
    { providedIn: 'root' },
    withState(initialBookingsSlice),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService)

        return {
            getAllBookings: () => {
                fs.sortedCollection(PATH_TO_BOOKINGS, 'date', 'asc')
                    .subscribe((bookings: Booking[]) => {
                        console.log(bookings)
                        patchState(store, { bookings, showingAll: true })
                    })
            },
            getBookings: () => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1)
                const criteria = {
                    path: PATH_TO_BOOKINGS,
                    queryFieldname: 'date',
                    queryOperator: '>',
                    queryCriterium: yesterday,
                    orderByFieldname: 'date',
                    orderDirection: 'asc'
                }
                fs.sortedCollectionQuery(criteria).subscribe((bookings: Booking[]) => {
                    patchState(store, { bookings, showingAll: false })
                })
            },
            setIndexSelectedBooking(indexSelectedBooking: number) {
                patchState(store, { indexSelectedBooking })
            }
        };
    })
);




