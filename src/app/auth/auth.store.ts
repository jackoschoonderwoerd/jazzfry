import { inject, Injectable } from '@angular/core';
import {
    getAuth,
    Auth,
    AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    user,
    UserCredential,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from '@angular/fire/auth';

import { signalStore, patchState, withComputed, withMethods, withState } from "@ngrx/signals";

import { FirebaseError } from '@angular/fire/app';
import { User as FirebaseUser } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JFUser } from '../models/jf-user';
import { FirestoreService } from '../shared/firestore.service';
import { PATH_TO_VISITS } from '../models/constants';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WrongEmailPasswordComponent } from './login/wrong-email-password/wrong-email-password.component';
import { VisitFormFirebase } from '../models/visit.model';
import { SnackbarService } from '../shared/snackbar.service';



type AuthState = {
    isLoggedIn: boolean;
    visitsFromFirebase: VisitFormFirebase[];

}
const initialState: AuthState = {
    isLoggedIn: false,
    visitsFromFirebase: []

}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(

        (store,
            fs = inject(FirestoreService),
            auth = inject(Auth),
            router = inject(Router),
            dialog = inject(MatDialog),
            snackbarService = inject(SnackbarService)
        ) => ({
            async login(jfUser: JFUser) {
                if (jfUser) {
                    return signInWithEmailAndPassword(auth, jfUser.email, jfUser.password)
                        .then((userCredential: UserCredential) => {
                            patchState(store, { isLoggedIn: true });
                            router.navigateByUrl('admin');
                            this.getVisits();
                        })
                        .catch((err: AuthError) => {
                            console.log(err.message)
                            dialog.open(WrongEmailPasswordComponent, {
                                data: {
                                    message: err
                                }
                            })
                            patchState(store, { isLoggedIn: false })
                        })
                }

            },
            async logout() {
                // console.log('loggin out')
                auth.signOut().then((res: any) => {
                    snackbarService.openSnackbar('you are succesfully logged out')
                    patchState(store, { isLoggedIn: false })
                })
                    .catch((err: FirebaseError) => {
                        snackbarService.openSnackbar('failed to log out')
                    })
                patchState(store, { isLoggedIn: false })
            },
            persistLogin() {
                this.getVisits();
                patchState(store, { isLoggedIn: true })
            },
            addVisit() {
                const date = new Date()
                fs.addDoc(PATH_TO_VISITS, { visit: date })
                    .then((res: any) => {

                    })
                    .catch((err: FirebaseError) => {
                        console.error(err)
                    })

            },
            getVisits() {
                fs.sortedCollection(PATH_TO_VISITS, 'visit', 'asc').subscribe((visits: any) => {
                    patchState(store, { visitsFromFirebase: visits })
                })
            }
        })
    ),
)
