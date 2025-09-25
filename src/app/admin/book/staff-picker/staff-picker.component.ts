import { Component, inject } from '@angular/core';
import { BookStore } from '../book-store/book.store';
import { JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Personalia, StaffMember } from '../../../models/staff-member';
import { StaffStore } from '../../staff/staff-store/staff.store';

@Component({
    selector: 'app-staff-picker',
    imports: [ReactiveFormsModule, MatCheckboxModule],
    templateUrl: './staff-picker.component.html',
    styleUrl: './staff-picker.component.scss'
})
export class StaffPickerComponent {

    staffMembersForm: FormGroup
    staffStore = inject(StaffStore);
    bookStore = inject(BookStore)
    constructor() {
        this.staffStore.getStaffMembers();
    }

    checkboxChange(event, id: string) {
        console.log(id)
        if (event.checked) {
            console.log('checked')
            this.bookStore.addStaffMemberId(id)

        } else {
            console.log('unchecked')
            this.bookStore.removesStaffMember(id)
        }
    }

    isActiveStaffMember(staffMember: StaffMember) {
        return this.bookStore.staffMemberIds().includes(staffMember.id)
    }
}
