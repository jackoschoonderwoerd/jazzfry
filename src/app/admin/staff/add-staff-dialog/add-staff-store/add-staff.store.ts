import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { Personalia, StaffMember } from '../../../../models/staff-member';
import { effect, inject } from '@angular/core';
import { FirestoreService } from '../../../../shared/firestore.service';
import { FirestoreError } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffDialogComponent } from '../add-staff-dialog.component';
import { initialAddStaffSlice } from './add-staff.slice';
import { PATH_TO_STAFFMEMBERS } from '../../../../models/constants';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmService } from '../../../../shared/confirm.service';
import { SnackbarService } from '../../../../shared/snackbar.service';


export const AddStaffStore = signalStore(
    { providedIn: 'root' },
    withState(initialAddStaffSlice),
    withMethods((store) => {
        const fs = inject(FirestoreService); // ✅ Inject once at the top
        const dialog = inject(MatDialog);
        const confirmService = inject(ConfirmService);
        const snackbarService = inject(SnackbarService)

        return {
            updatePersonalia: (personalia: Personalia) => {
                console.log(personalia, store.staffMember().personalia);
                patchState(store, {
                    staffMember: { ...store.staffMember(), personalia },
                });
            },

            addInstrumentsToStaffMember: (instruments: string[]) => {
                console.log(instruments);
                patchState(store, {
                    staffMember: { ...store.staffMember(), instruments },
                });
            },
            setActiveStaffMember: (selectedStaffMember: StaffMember) => {
                console.log(selectedStaffMember)
                dialog.open(AddStaffDialogComponent, {
                    width: '100vw',
                    height: '100vh',
                    maxWidth: '100vw',
                    panelClass: 'full-screen-dialog'
                })
                patchState(store, { staffMember: selectedStaffMember, editmode: true })
            },
            cancelSelectedStaffMember() {
                patchState(store, { staffMember: initialAddStaffSlice.staffMember, editmode: false })
            },
            // setActiveStaffMember(staffMember: StaffMember) {
            //     patchState(store, { staffMember })
            // },
            addStaffMember: () => {
                const staffMember: StaffMember = store.staffMember();
                console.log(staffMember);
                const path = PATH_TO_STAFFMEMBERS;
                if (!store.editmode()) {
                    fs.addDoc(path, staffMember)
                        .then((res: any) => {
                            console.log(res);
                            patchState(store, { staffMember: initialAddStaffSlice.staffMember })
                            snackbarService.openSnackbar('staff member added')
                        })
                        .catch((err: FirestoreError) => {
                            console.error(err);
                            snackbarService.openSnackbar(`there was an error: ${err.message}`)
                        });
                } else {
                    fs.updateDoc(`${PATH_TO_STAFFMEMBERS}/${staffMember.id}`, staffMember)
                        .then((res: any) => {
                            console.log(res);
                            patchState(store, { staffMember: initialAddStaffSlice.staffMember })
                            snackbarService.openSnackbar('staff member updated')
                        })
                        .catch((err: FirebaseError) => {
                            console.error(err);
                            snackbarService.openSnackbar(`there was an error: ${err.message}`)
                        })

                }
            },
            deleteStaffmember(id: string) {
                confirmService.getConfirmation()
                    .subscribe((confirmation: boolean) => {
                        if (confirmation) {
                            fs.deleteDoc(`${PATH_TO_STAFFMEMBERS}/${id}`)
                                .then((res: any) => {
                                    console.log(res)
                                    snackbarService.openSnackbar('staffmember deleted')
                                })
                                .catch((err: FirebaseError) => {
                                    console.error(err)
                                    snackbarService.openSnackbar(`there was an error: ${err.message}`)
                                })
                        } else {
                            snackbarService.openSnackbar('operation aborted by user')
                        }
                    })
            }
        };
    })
);


// export const AddStaffStore = signalStore(
//     { providedIn: 'root' },
//     withState({ staffMember: initialStafmember }),
//     withMethods((store) => ({

//         updatePersonalia: (personalia: Personalia) => {
//             console.log(personalia, store.staffMember().personalia)
//             patchState(store, { staffMember: { ...store.staffMember(), personalia: personalia } })
//             // patchState(store, {staffMember:})
//         },
//         addInstrumentsToStaffMember: (instruments: string[]) => {
//             console.log(instruments)
//             patchState(store, { staffMember: { ...store.staffMember(), instruments } })
//         },
//         confirmStaffMember: () => {
//             const fs = inject(FirestoreService)
//             const staffMember: StaffMember = store.staffMember()
//             console.log(store.staffMember())
//             const path = `/jazzfry/wC9fvZJNTmk8WVl2QTi1/staffMembers/`
//             fs.addDoc(path, staffMember)
//                 .then((res: any) => {
//                     console.log(res)
//                 })
//                 .catch((err: FirestoreError) => {
//                     console.error(err)
//                 })
//         }
//     }))
// )
