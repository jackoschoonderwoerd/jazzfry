import { Component, inject, Optional, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-map-dialog',
    imports: [MatIconModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
    templateUrl: './map-dialog.component.html',
    styleUrl: './map-dialog.component.scss'
})
export class MapDialogComponent {


    loading = signal(true);

    data = inject(MAT_DIALOG_DATA, { optional: true });

    src: SafeResourceUrl;
    sanitizer = inject(DomSanitizer);

    constructor(public dialogRef: MatDialogRef<MapDialogComponent>) {

        const src = this.data.mapUrl;

        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }

    onIframeLoad() {
        this.loading.set(false)
    }



}
