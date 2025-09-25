import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-test-dialog',
    imports: [MatDialogModule],
    templateUrl: './test-dialog.component.html',
    styleUrl: './test-dialog.component.scss'
})
export class TestDialogComponent {
    constructor(public dialogRef: MatDialogRef<TestDialogComponent>) { }
}
