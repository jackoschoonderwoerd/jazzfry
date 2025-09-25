import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { AddStaffDialogComponent } from './add-staff-dialog/add-staff-dialog.component';
import { StaffMember } from '../../models/staff-member';
import { FirestoreService } from '../../shared/firestore.service';
import { PATH_TO_STAFFMEMBERS } from '../../models/constants';
import { StaffMemberComponent } from './staff-member/staff-member.component';
import { StaffStore } from './staff-store/staff.store';

@Component({
    selector: 'app-staff',
    imports: [MatIconModule, MatButtonModule, StaffMemberComponent],
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.scss'
})
export class StaffComponent {

    dialog = inject(MatDialog);
    fs = inject(FirestoreService)

    // staffMembers: StaffMember[] = [];
    staffStore = inject(StaffStore)

    constructor() {
        this.staffStore.getStaffMembers()
    }

    addStaff() {
        this.dialog.open(AddStaffDialogComponent, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            panelClass: 'full-screen-dialog'
        })
    }
}
