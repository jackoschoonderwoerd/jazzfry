import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@Component({
    selector: 'app-confirm-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    ngOnInit(): void {
        this.dialogRef.updateSize('300px', 'auto');
    }

}
