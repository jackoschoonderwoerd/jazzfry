import { Component, inject, input } from '@angular/core';
import { JFImage } from '../../../../models/JFImage.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { AuthStore } from '../../../../auth/auth.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GalleryStore } from '../../gallery-store/gallery.store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-image',
    imports: [DatePipe, MatButtonModule, MatIconModule],
    templateUrl: './admin-image.component.html',
    styleUrl: './admin-image.component.scss'
})
export class AdminImageComponent {
    image = input<JFImage>();
    authStore = inject(AuthStore);
    galleryStore = inject(GalleryStore);
    router = inject(Router)

    onEdit() {
        this.galleryStore.setImageUpForEdit(this.image)
        this.router.navigateByUrl('/admin/image-selector')
    }
}
