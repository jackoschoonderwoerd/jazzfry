import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

import { computed, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FirebaseError } from "@angular/fire/app";
import { FirestoreService } from "../firestore.service";
import { ConfirmService } from "../confirm.service";
import { SnackbarService } from "../snackbar.service";
import { initialUiSlice } from "./ui.slice";


export const UiStore = signalStore(
    { providedIn: 'root' },
    withState(initialUiSlice),
    // withComputed((store) => ({
    //     editmode: computed(() => store.selectedVenue() ? true : false)
    // })),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService)

        return {
            storeLanguage(language: string) {
                patchState(store, { activeLanguage: language })
            },
        };
    }),
);
