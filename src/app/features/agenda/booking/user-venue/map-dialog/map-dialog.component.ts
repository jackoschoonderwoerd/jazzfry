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
'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.022868089344!2d4.886612476894241!3d52.370005347323534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c17a3f59bf%3A0xed0464d6be1baa42!2sCaf%C3%A9%20De%20Koningshut!5e0!3m2!1snl!2snl!4v1758997011208!5m2!1snl!2snl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
