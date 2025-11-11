import { Component, inject, OnInit } from '@angular/core';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { GalleryStore } from './gallery-store/gallery.store';
import { AdminImagesComponent } from './admin-images/admin-images.component';
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-admin-gallery',
    imports: [
        ImageSelectorComponent,
        AdminImagesComponent,
        MatButtonModule,
        RouterLink,

    ],
    templateUrl: './admin-gallery.component.html',
    styleUrl: './admin-gallery.component.scss'
})
export class AdminGalleryComponent implements OnInit {
    galleryStore = inject(GalleryStore)
    router = inject(Router)

    ngOnInit(): void {
        this.galleryStore.getJFImages()
    }
    navigateToSelecctor() {
        this.router.navigateByUrl('admin/image-selector')
    }

    onLogDate() {
        const date: Date = new Date()
        console.log(date.toDateString());
    }
}
