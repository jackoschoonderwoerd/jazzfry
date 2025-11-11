import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";

import { UiStore } from '../../shared/ui-store/ui.store';
import { AuthStore } from '../../auth/auth.store';
import { GalleryStore } from '../../admin/admin-gallery/gallery-store/gallery.store';
import { SnackbarService } from '../../shared/snackbar.service';


@Component({
    selector: 'app-sidenav',
    imports: [MatButtonModule, MatIconModule, MatListModule, RouterLink],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

    uiStore = inject(UiStore);
    authStore = inject(AuthStore);
    galleryStore = inject(GalleryStore);
    snackbarService = inject(SnackbarService)

    async onCameraFileSelected(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        console.log(event)
        if (!file) return;

        try {
            console.log('📷 Captured image:', file);
            const date = new Date()
            const dateString = date.toDateString();
            const caption: string = `Photo taken on: ${dateString}`
            // await this.galleryStore.addImage(file, 'Photo taken with camera');
            await this.galleryStore.addImage(file, caption);
        } catch (err) {
            console.error('Error uploading camera photo:', err);
            this.snackbarService.openSnackbar('Error uploading photo');
        } finally {
            input.value = ''; // reset input so user can take another photo
        }
    }
}
