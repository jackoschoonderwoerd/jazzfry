import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

import { inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';



import { FirebaseError } from '@angular/fire/app';
import { FirestoreService } from '../../../shared/firestore.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { SnackbarService } from '../../../shared/snackbar.service';
import { Venue } from '../../../models/venue.model';
import { PATH_TO_STAFFMEMBERS, PATH_TO_VENUES } from '../../../models/constants';

import { StaffMember } from '../../../models/staff-member';
import { initialStaffSlice } from './staff.slice';



export const StaffStore = signalStore(
    { providedIn: 'root' },
    withState(initialStaffSlice),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService)

        return {
            getStaffMembers: () => {
                fs.collection(PATH_TO_STAFFMEMBERS).subscribe((staffMembers: StaffMember[]) => {
                    const sortedStaffMembers = staffMembers.sort((a: StaffMember, b: StaffMember) =>
                        a.personalia.firstName.localeCompare(b.personalia.firstName, undefined, { sensitivity: 'base' })
                    );
                    patchState(store, { staffMembers: sortedStaffMembers })
                })
            },
            getStaffMemberById: (id): StaffMember => {
                const staffMemberArray = store.staffMembers().filter((staffMember: StaffMember) => {
                    return staffMember.id === id
                })
                return staffMemberArray[0]
            }

        };
    })
);



