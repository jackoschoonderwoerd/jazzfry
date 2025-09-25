import { Component, computed, inject, input, Input, InputSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-website-dialog',
    imports: [MatIconModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
    templateUrl: './website-dialog.component.html',
    styleUrl: './website-dialog.component.scss'
})
export class WebsiteDialogComponent {

    loading = signal(true)

    data = inject(MAT_DIALOG_DATA, { optional: true });

    src: SafeResourceUrl

    sanitizer = inject(DomSanitizer);

    constructor(
        public dialogRef: MatDialogRef<WebsiteDialogComponent>
    ) {
        const src = this.data.venue;

        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
    onIframeLoad() {
        this.loading.set(false)
    }

}
