import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { AuthStore } from '../../auth/auth.store';
import { FlagsComponent } from '../../shared/flags/flags.component';
import { SnackbarService } from '../../shared/snackbar.service';
import { GalleryStore } from '../../admin/admin-gallery/gallery-store/gallery.store';
import { UiStore } from '../../shared/ui-store/ui.store';




@Component({
    selector: 'app-header',
    imports: [
        MatToolbarModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        FlagsComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    authStore = inject(AuthStore);
    snackbarService = inject(SnackbarService);
    galleryStore = inject(GalleryStore);
    uiStore = inject(UiStore)
    router = inject(Router);




    async onCameraFileSelected(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        console.log(event)
        if (!file) return;

        try {
            console.log('📷 Captured image:', file);
            await this.galleryStore.addImage(file, 'Photo taken with camera');
        } catch (err) {
            console.error('Error uploading camera photo:', err);
            this.snackbarService.openSnackbar('Error uploading photo');
        } finally {
            input.value = ''; // reset input so user can take another photo
        }
    }
    // showNavigation(status: boolean) {
    //     console.log(status)
    //     this.router.navigateByUrl('user-gallery')
    //     this.uiStore.setShowNavigation(false)
    // }
    // showPhotoViewer() {
    //     this.router.navigateByUrl('photo-viewer');
    //     // this.uiStore.setShowNavigation(false);
    // }
    onMenu() {
        console.log('onMenu()')
    }
}
