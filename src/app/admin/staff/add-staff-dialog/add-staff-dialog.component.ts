import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { InstrumentFormArrayComponent } from './instrument-form-array/instrument-form-array.component';
import { PersonaliaFormComponent } from './personalia-form/personalia-form.component';
import { AddStaffStore } from './add-staff-store/add-staff.store';



@Component({
    selector: 'app-add-staff-dialog',
    imports: [
        MatButtonModule,
        MatDialogModule,
        InstrumentFormArrayComponent,
        PersonaliaFormComponent,
    ],
    templateUrl: './add-staff-dialog.component.html',
    styleUrl: './add-staff-dialog.component.scss'
})
export class AddStaffDialogComponent {

    addStaffStore = inject(AddStaffStore)



}
