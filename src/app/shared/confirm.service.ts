import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {

    dialog = inject(MatDialog)
    constructor() { }

    getConfirmation() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent)
        return dialogRef.afterClosed()
    }

}
