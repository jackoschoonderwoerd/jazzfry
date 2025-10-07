import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

import { inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';



import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../../shared/firestore.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Venue } from '../../../models/venue.model';
import { PATH_TO_BOOKINGS, PATH_TO_STAFFMEMBERS, PATH_TO_VENUES } from '../../../models/constants';
import { initialBookSlice } from './book.slice';
import { StaffMember } from '../../../models/staff-member';
import { Booking } from '../../../models/booking.model';
import { filter } from 'rxjs';
import { Router } from '@angular/router';



export const BookStore = signalStore(
    { providedIn: 'root' },
    withState(initialBookSlice),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService);
        const router = inject(Router)

        return {
            addStaffMemberId: (staffMemberId: string) => {
                let newstaffMemberIds: string[] = store.staffMemberIds();
                newstaffMemberIds = [...newstaffMemberIds, staffMemberId]
                patchState(store, { staffMemberIds: newstaffMemberIds, formTouched: true });
            },
            removesStaffMember: (id: string) => {
                let newstaffMemberIds: string[] = store.staffMemberIds()
                newstaffMemberIds = newstaffMemberIds.filter((staffMemberId: string) => {
                    console.log(staffMemberId)
                    return staffMemberId !== id
                });
                patchState(store, { staffMemberIds: newstaffMemberIds });
            },
            setDate: (event: any) => {
                const path = `${PATH_TO_BOOKINGS}/${store.id()}`;
                const newDate = event.value;
                console.log(newDate)
                patchState(store, { date: newDate, formTouched: true })
            },
            setStart: (start: string) => {
                console.log(start)
                patchState(store, { start, formTouched: true })
            },
            setEnd: (end: string) => {
                patchState(store, { end, formTouched: true })
            },
            setVenue(venue: Venue) {
                console.log(venue)
                patchState(store, { venue, formTouched: true })
            },
            setPrivateParty(checked: boolean) {
                console.log(checked)
                patchState(store, { privateParty: checked, formTouched: true })
            },
            hide(checked: boolean) {
                console.log('hidden', checked);
                patchState(store, { hidden: checked, formTouched: true });
            },
            addBooking() {
                const booking: Booking = {
                    date: store.date(),
                    start: store.start(),
                    end: store.end(),
                    venue: store.venue(),
                    staffMemberIds: store.staffMemberIds(),
                    privateParty: store.privateParty(),
                    hidden: store.hidden()
                }
                console.log(booking)
                fs.addDoc(PATH_TO_BOOKINGS, booking)
                    .then((res: any) => {
                        console.log(res)
                        patchState(store, { ...initialBookSlice, formTouched: false });
                        router.navigateByUrl('agenda')
                    })
                    .catch((err: FirebaseError) => {
                        console.error(err)
                        snackbarService.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            },
            updateBooking() {
                console.log(store.id());
                const booking: Booking = {
                    id: store.id(),
                    date: store.date(),
                    start: store.start(),
                    end: store.end(),
                    venue: store.venue(),
                    staffMemberIds: store.staffMemberIds(),
                    privateParty: store.privateParty(),
                    hidden: store.hidden()
                }
                console.log(booking)
                const path = `${PATH_TO_BOOKINGS}/${booking.id}`
                fs.setDoc(path, booking)
                    .then((res: any) => {
                        console.log(res);
                        patchState(store, { ...initialBookSlice, formTouched: false });
                        router.navigateByUrl('agenda');
                    })
                    .catch((err: FirebaseError) => {
                        console.error(err)
                        snackbarService.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            },

            setBookingForEdit(booking: Booking) {
                console.log(booking)
                patchState(store, { ...booking, editmode: true, date: new Date(booking.date.seconds * 1000) })
            },
            removeStaffMemberFromBooking(id) {
                const oldStaffMemberIds = store.staffMemberIds();
                const newStaffMemberIds = oldStaffMemberIds.filter(staffId => staffId !== id)
                const bookingId = store.id();
                const path = `${PATH_TO_BOOKINGS}/${bookingId}`
                fs.updateField(path, 'staffMemberIds', newStaffMemberIds)
                    .then((res: any) => {
                        console.log(res)
                        patchState(store, { staffMemberIds: newStaffMemberIds, formTouched: true })
                    })
                    .catch((err: FirebaseError) => {
                        console.log(err);
                        snackbarService.openSnackbar(`operation failed due to: ${err.message}`)
                    })
            },
            deleteBooking(id) {
                const path = `${PATH_TO_BOOKINGS}/${id}`
                confirmService.getConfirmation().subscribe((confirmation: boolean) => {
                    if (confirmation) {

                        fs.deleteDoc(path)
                            .then((res: any) => {
                                snackbarService.openSnackbar(`booking deleted`)
                            })
                            .catch((err: FirebaseError) => {
                                console.error(err);
                                snackbarService.openSnackbar(`operation failed due to: ${err.message}`)
                            })
                    }
                    else {
                        snackbarService.openSnackbar(`operation aborted by user`)
                    }
                })
            },
            clearForm() {
                patchState(store, { ...initialBookSlice, formTouched: false })
            }
        };
    })
);




