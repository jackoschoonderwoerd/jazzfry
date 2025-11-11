import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PwaService {
    private isBrowser: boolean;
    private deferredPrompt: any = null;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId);

        if (this.isBrowser) {
            this.listenForInstallPrompt();
        }
    }

    canInstall(): boolean {
        return this.isBrowser && !!this.deferredPrompt;
    }

    async promptInstall(): Promise<boolean> {
        if (!this.deferredPrompt) return false;

        this.deferredPrompt.prompt();
        const choiceResult = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;
        return choiceResult.outcome === 'accepted';
    }

    private listenForInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (event: Event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            console.log('PWA install prompt captured.');
        });
    }
}

// // import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// // import { isPlatformBrowser } from '@angular/common';

// // @Injectable({ providedIn: 'root' })
// // export class PwaService {
// //     private isBrowser: boolean;

// //     constructor(@Inject(PLATFORM_ID) platformId: object) {
// //         this.isBrowser = isPlatformBrowser(platformId);

// //         if (this.isBrowser) {
// //             // ✅ Safe zone — window/document/navigator available
// //             this.initPwa();
// //         }
// //     }

// //     private initPwa(): void {
// //         // Example browser-only code:
// //         window.addEventListener('beforeinstallprompt', (event) => {
// //             event.preventDefault();
// //             console.log('Install prompt intercepted');
// //         });
// //     }
// // }

// // // // src/app/services/pwa.service.ts
// // // import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
// // // import { isPlatformBrowser } from '@angular/common';

// // // @Injectable({ providedIn: 'root' })
// // // export class PwaService {
// // //     canInstall = signal(false);
// // //     private deferredPrompt: any;
// // //     private isBrowser: boolean;

// // //     constructor(@Inject(PLATFORM_ID) platformId: object) {

// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({ providedIn: 'root' })
// export class PwaService {
//     private isBrowser: boolean;
//     private deferredPrompt: any = null;

//     constructor(@Inject(PLATFORM_ID) platformId: object) {
//         this.isBrowser = isPlatformBrowser(platformId);

//         if (this.isBrowser) {
//             this.listenForInstallPrompt();
//         }
//     }

//     /** 🔍 Checks if we’re running in the browser and an install prompt is ready */
//     canInstall(): boolean {
//         return this.isBrowser && !!this.deferredPrompt;
//     }

//     /** 💾 Shows the install prompt when available */
//     async promptInstall(): Promise<boolean> {
//         if (!this.deferredPrompt) return false;

//         this.deferredPrompt.prompt();
//         const choiceResult = await this.deferredPrompt.userChoice;
//         this.deferredPrompt = null; // reset after showing once
//         return choiceResult.outcome === 'accepted';
//     }

//     /** 🧩 Listen for browser install prompt */
//     private listenForInstallPrompt(): void {
//         window.addEventListener('beforeinstallprompt', (event: Event) => {
//             event.preventDefault();
//             this.deferredPrompt = event;
//             console.log('PWA install prompt captured.');
//         });
//     }
// }

// // //         this.isBrowser = isPlatformBrowser(platformId);

// // //         if (this.isBrowser) {
// // //             // ✅ Safe to access window here
// // //             console.log('Running in browser:', window.location.href);
// // //             // ... your existing browser-only logic
// // //         } else {
// // //             // 🧱 Server context — do not touch window/document/navigator
// // //             console.log('Running on server — skipping PWA setup');
// // //         }

// // //         window.addEventListener('beforeinstallprompt', (event: Event) => {
// // //             event.preventDefault();
// // //             this.deferredPrompt = event;
// // //             this.canInstall.set(true);
// // //         });

// // //         // Optional: listen for when app is installed
// // //         window.addEventListener('appinstalled', () => {
// // //             console.log('PWA was installed');
// // //             this.canInstall.set(false);
// // //             this.deferredPrompt = null;
// // //         });
// // //     }

// // //     async install() {
// // //         if (!this.deferredPrompt) return;
// // //         this.deferredPrompt.prompt();
// // //         const { outcome } = await this.deferredPrompt.userChoice;
// // //         console.log(`User install choice: ${outcome}`);
// // //         this.deferredPrompt = null;
// // //         this.canInstall.set(false);
// // //     }
// // // }
