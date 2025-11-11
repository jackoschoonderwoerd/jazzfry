import { Component, inject, signal, WritableSignal } from '@angular/core';
import { GalleryStore } from '../gallery-store/gallery.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStore } from '../../../auth/auth.store';
import { DatePipe } from '@angular/common';
import { AdminImageComponent } from './admin-image/admin-image.component';

@Component({
    selector: 'app-admin-images',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AdminImageComponent
    ],
    templateUrl: './admin-images.component.html',
    styleUrl: './admin-images.component.scss'
})
export class AdminImagesComponent {
    galleryStore = inject(GalleryStore)

    authStore = inject(AuthStore)





}
