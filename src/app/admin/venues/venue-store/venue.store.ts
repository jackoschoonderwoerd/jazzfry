import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialVenueSlice } from "./venue.slice";
import { computed, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FirebaseError } from "@angular/fire/app";
import { FirestoreService } from "../../../shared/firestore.service";
import { ConfirmService } from "../../../shared/confirm.service";
import { SnackbarService } from "../../../shared/snackbar.service";
import { Venue } from "../../../models/venue.model";
import { PATH_TO_VENUES } from "../../../models/constants";
import { Router } from "@angular/router";

export const VenuesStore = signalStore(
    { providedIn: 'root' },
    withState(initialVenueSlice),
    withComputed((store) => ({
        editmode: computed(() => store.selectedVenue() ? true : false)
    })),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService);
        const router = inject(Router)

        return {
            addVenue: (venue: Venue) => {
                if (!store.editmode()) {
                    fs.addDoc(PATH_TO_VENUES, venue)
                        .then((res: any) => {
                            snackbarService.openSnackbar('venue added')
                            router.navigateByUrl('/admin/venues');
                        })
                        .catch((err: FirebaseError) => {
                            console.log(err);
                            snackbarService.openSnackbar(`there was an error; ${err.message}`)
                        })
                } else {
                    const venueId = store.selectedVenue().id
                    const path = `${PATH_TO_VENUES}/${venueId}`
                    fs.updateDoc(path, venue)
                        .then((res: any) => {
                            snackbarService.openSnackbar('venue updated')
                            router.navigateByUrl('/admin/venues');
                        })
                        .catch((err: FirebaseError) => {
                            console.error(err);
                            snackbarService.openSnackbar(`there was an error; ${err.message}`)
                        })
                }
            },
            deleteVenue: (id) => {
                confirmService.getConfirmation().subscribe((confirmation: boolean) => {
                    if (confirmation) {
                        const path = `${PATH_TO_VENUES}/${id}`
                        fs.deleteDoc(path)
                            .then((res: any) => {
                                snackbarService.openSnackbar('venue deleted')
                                router.navigateByUrl('/admin/venues');
                            })
                            .catch((err: FirebaseError) => {
                                console.error(err);
                                snackbarService.openSnackbar(`operation failde due to: ${err.message}`)
                            })
                    } else {
                        snackbarService.openSnackbar('operation aborted by user')
                    }
                })
            },
            getVenues: () => {
                (() => {
                    patchState(store, { loadingVenues: true })
                })
                fs.sortedCollection(PATH_TO_VENUES, 'name', 'asc').subscribe((venues: Venue[]) => {
                    patchState(store, { venues, loadingVenues: false })
                })
            },
            selectVenue: (venue: Venue) => {
                patchState(store, { selectedVenue: venue })
            },
            getVenueById(id) {

                return store.venues().find(v => v.id === id)
            },
            getVenueNameById(id: string): string {

                const venue: Venue = store.venues().find(v => v.id === id);
                if (!venue.name) {
                    return 'not found'

                } else {

                    return venue.name
                }


            },
            getVenueCityById(id: string) {

                const venue = store.venues().find(v => v.id === id);
                if (!venue.city) {
                    return 'not found'
                } else {
                    return venue.city;
                }
            },
            getVenueStreetById(id: string) {
                const venue = store.venues().find(v => v.id === id);
                return venue.street;
            },
            getVenueNumberById(id: string) {
                const venue = store.venues().find(v => v.id === id);
                return venue.number;
            },
            getVenueUrlById(id: string): string {
                const venue = store.venues().find(v => v.id === id);
                return venue.website
            },
        };
    }),
);
