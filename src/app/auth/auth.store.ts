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



type AuthState = {
    isLoggedIn: boolean;
    visits: Date[];

}
const initialState: AuthState = {
    isLoggedIn: false,
    visits: []

}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(

        (store, fs = inject(FirestoreService), auth = inject(Auth), router = inject(Router)) => ({
            async login(jfUser: JFUser) {
                if (jfUser) {
                    signInWithEmailAndPassword(auth, jfUser.email, jfUser.password)
                        .then((userCredential: UserCredential) => {
                            patchState(store, { isLoggedIn: true });
                            router.navigateByUrl('admin');
                            this.getVisits();
                        })
                        .catch((err: AuthError) => {
                            console.log(err.message)
                            patchState(store, { isLoggedIn: false })
                        })
                }

            },
            async logout() {
                console.log('loggin out')
                auth.signOut().then((res: any) => {
                    console.log('you are succesfully logged out')
                    patchState(store, { isLoggedIn: false })
                })
                    .catch((err: FirebaseError) => {
                        console.error('failed to log out')
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
                    patchState(store, { visits })
                })
            }
        })
    ),
)
