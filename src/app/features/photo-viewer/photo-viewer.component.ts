import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { GalleryStore } from '../../admin/admin-gallery/gallery-store/gallery.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { UiStore } from '../../shared/ui-store/ui.store';

@Component({
    selector: 'app-photo-viewer',
    imports: [MatButtonModule, MatIconModule, NgClass],
    templateUrl: './photo-viewer.component.html',
    styleUrl: './photo-viewer.component.scss'
})

export class PhotoViewerComponent {
    galleryStore = inject(GalleryStore);
    uiStore = inject(UiStore)

    activeIndex: WritableSignal<number> = signal(0);
    imageCount = computed(() => this.galleryStore.jfImages().length);
    private touchStartX = 0;

    constructor() {
        this.galleryStore.getJFImages();
    }



    forward() {
        const next = (this.activeIndex() + 1) % this.imageCount();
        this.activeIndex.set(next);
        this.prefetch((next + 1) % this.imageCount());
    }

    back() {
        const prev = (this.activeIndex() - 1 + this.imageCount()) % this.imageCount();
        this.activeIndex.set(prev);
        this.prefetch((prev - 1 + this.imageCount()) % this.imageCount());
    }

    /** Preload one image ahead for smoother transitions */
    private prefetch(index: number) {
        const jfImages = this.galleryStore.jfImages();
        if (jfImages[index]) {
            const img = new Image();
            img.src = jfImages[index].downloadUrl;
        }
    }
    onTouchStart(event: TouchEvent): void {
        this.touchStartX = event.changedTouches[0].screenX;
        // this.showNavButton.set(true);
        // setTimeout(() => this.showNavButton.set(false), 1500);
    }

    onTouchEnd(event: TouchEvent): void {
        const touchEndX = event.changedTouches[0].screenX;
        const deltaX = touchEndX - this.touchStartX;

        const swipeThreshold = 50; // pixels to detect swipe

        if (Math.abs(deltaX) > swipeThreshold) {
            // console.log(deltaX > 0)
            if (deltaX > 0) {
                this.back(); // swipe right → previous image
            } else {
                this.forward(); // swipe left → next image
            }
            // this.showNavButton.set(true);
            // setTimeout(() => this.showNavButton.set(false), 1500);
        }
    }

}
