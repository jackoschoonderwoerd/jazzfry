import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),

        provideRouter(routes),

        provideFirebaseApp(() => initializeApp(environment.firebase)),

        provideAuth(() => getAuth()),

        provideFirestore(() => getFirestore()),

        provideStorage(() => getStorage()),

        provideHttpClient(withInterceptorsFromDi(), withFetch()),

        provideClientHydration(withEventReplay()),

        provideServiceWorker('ngsw-worker.js', {
            enabled: environment.production && !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        // provideServiceWorker('ngsw-worker.js', {
        //     // enabled: !isDevMode(),
        //     enabled: environment.production,
        //     registrationStrategy: 'registerWhenStable:30000'
        // }),
        // provideHttpClient(withInterceptorsFromDi(), withFetch()), provideServiceWorker('ngsw-worker.js', {
        //     enabled: !isDevMode(),
        //     registrationStrategy: 'registerWhenStable:30000'
        // }), provideClientHydration(withEventReplay())
    ]
};
