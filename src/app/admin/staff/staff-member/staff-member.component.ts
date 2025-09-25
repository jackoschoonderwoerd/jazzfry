import { JsonPipe } from '@angular/common';
import { Component, inject, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { StaffMember } from '../../../models/staff-member';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StaffStore } from '../staff-store/staff.store';

import { BookStore } from '../../book/book-store/book.store';
import { AddStaffStore } from '../add-staff-dialog/add-staff-store/add-staff.store';

@Component({
    selector: 'app-staff-member',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './staff-member.component.html',
    styleUrl: './staff-member.component.scss'
})
export class StaffMemberComponent implements OnChanges {
    // staffMember = input<StaffMember>()
    // staffMember: StaffMember
    addStaffStore = inject(AddStaffStore)
    staffStore = inject(StaffStore)


    bookStore = inject(BookStore)

    @Input() id: string;
    @Input() staffMember: StaffMember
    constructor() {
        // console.log(this.id)
        // this.staffMember = this.staffStore.getStaffMember(this.id)
        // console.log(this.staffMember)
    }
    // getStaffMember(id) {
    //     return this.staffStore.getStaffMember(id)
    // }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.id) {
            console.log(this.id)
            this.staffMember = this.staffStore.getStaffMemberById(this.id);
            console.log(this.staffMember)
        }
    }
}
