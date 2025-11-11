import { Component, computed, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreService } from '../../../shared/firestore.service';
import { StorageService } from '../../../services/storage.service';

import { GalleryStore } from '../gallery-store/gallery.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
    selector: 'app-image-selector',
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
    templateUrl: './image-selector.component.html',
    styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit {

    fs = inject(FirestoreService)
    storage = inject(StorageService)
    imagePreview: string;
    file: File;
    galleryStore = inject(GalleryStore)
    caption = viewChild<ElementRef>('caption')
    // editmode: boolean = false;
    editmode = computed(() => !!this.galleryStore.imageUpForEdit())
    imageUpForEdit$ = computed(() => this.galleryStore.imageUpForEdit());
    router = inject(Router)


    ngOnInit(): void {
        // console.log(this.imageUpForEdit$())
        // console.log(this.imagePreview)
    }


    async onFileInputChange(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.files?.length) return
        this.file = input.files[0]
        const reader = new FileReader();
        reader.onload = () => (this.imagePreview = reader.result as string);
        reader.readAsDataURL(this.file)
    }

    onStoreImage() {
        const caption = this.caption().nativeElement.value
        if (this.editmode()) {
            this.galleryStore.updateCaption(caption);
        } else {
            this.galleryStore.addImage(this.file, caption)
                .then((res: any) => {
                    console.log(res)
                    this.imagePreview = null;
                })
                .catch((err: any) => {
                    console.log(err);
                })
        }
    }
    onCancel() {
        console.log('onCancel()')
        this.galleryStore.setImageUpForEdit(null);
        this.router.navigateByUrl('admin/admin-gallery')
    }
}
