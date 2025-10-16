// src/app/services/pwa.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PwaService {
    canInstall = signal(false);
    private deferredPrompt: any;

    constructor() {
        window.addEventListener('beforeinstallprompt', (event: Event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            this.canInstall.set(true);
        });

        // Optional: listen for when app is installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.canInstall.set(false);
            this.deferredPrompt = null;
        });
    }

    async install() {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User install choice: ${outcome}`);
        this.deferredPrompt = null;
        this.canInstall.set(false);
    }
}
