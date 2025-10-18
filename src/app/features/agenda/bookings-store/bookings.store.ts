import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { computed, inject, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';




import { FirestoreService } from '../../../shared/firestore.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { SnackbarService } from '../../../shared/snackbar.service';

import { PATH_TO_BOOKINGS } from '../../../models/constants';


import { Booking } from '../../../models/booking.model';

import { initialBookingsSlice, MyDateRange } from './bookings.slice';
import { get_Future_amsterdamOnly_hidePrivate_hideHidden, getFirst, getFuture_hideHidden, setBookingsWithinDateRange } from './booking-vm.builders';
import { VenuesStore } from '../../../admin/venues/venue-store/venue.store';
import { DateRange } from '@angular/material/datepicker';



export const BookingsStore = signalStore(
    { providedIn: 'root' },
    withState(initialBookingsSlice),

    withMethods((store) => {
        const fs = inject(FirestoreService);
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService);
        const venuesStore = inject(VenuesStore);

        return {
            getAllBookings: () => {
                fs.sortedCollection(PATH_TO_BOOKINGS, 'date', 'asc')
                    .subscribe((bookings: Booking[]) => {
                        patchState(store, { all: bookings, showingAll: true, filtered: bookings });
                    });
            },
            setIndexSelectedBooking(indexSelectedBooking: number) {
                patchState(store, { indexSelectedBooking });
            },

            set_show_future_amsterdamOnly_hidePrivate_hideHidden() {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                yesterday.setHours(0, 0, 0, 0);

                const futureBookings: Booking[] = store.all().filter((booking: Booking) => {
                    return new Date(booking.date.seconds * 1000) > yesterday
                })

                const inAmsterdam: Booking[] = futureBookings.filter((futureBooking: Booking) => {
                    const id = (futureBooking.venue).toString()
                    const lcCityName = (venuesStore.getVenueCityById(id)).toLowerCase().trim();

                    return lcCityName === 'amsterdam' &&
                        !futureBooking.privateParty &&
                        !futureBooking.hidden;
                })

                patchState(store, {
                    filtered: inAmsterdam,
                    dateFilterActive: false,
                    onlyAmsterdamFutureFilterActive: true,
                    showAllActive: false
                })
            },

            setDateRange(myDateRange: MyDateRange) {
                patchState(store, {
                    filtered: setBookingsWithinDateRange(store.all(), myDateRange),
                    dateFilterActive: true,
                    onlyAmsterdamFutureFilterActive: false,
                    showAllActive: false
                })
            },
            set_filter_to_null() {
                patchState(store, {
                    filtered: store.all(),
                    dateFilterActive: false,
                    onlyAmsterdamFutureFilterActive: false,
                    showAllActive: true
                })
            }

        };
    }),

    withComputed((store) => {
        const venuesStore = inject(VenuesStore);

        return {
            first: computed(() => {
                return getFirst(store.all());
            }),

            future_hideHidden: computed(() => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                yesterday.setHours(0, 0, 0, 0);
                return getFuture_hideHidden(store.all(), yesterday);
            }),

            future_amsterdamOnly_hidePrivate_hideHidden: computed(() => {
                console.log('future_amsterdamOnly_hidePrivate_hideHidden');
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                yesterday.setHours(0, 0, 0, 0);

                // get only future bookings
                const futures = store.all().filter(
                    (b: Booking) => new Date(b.date.seconds * 1000) > yesterday
                );

                // ✅ Filter by city
                const isInAmsterdam = futures.filter(
                    (b: Booking) => venuesStore.getVenueById(b.venue)?.city === 'amsterdam'
                );
                return isInAmsterdam;
            }),




        };
    }),
);







