import { Component, effect, inject, input, Input, InputSignal, OnInit } from '@angular/core';
import { StaffMember } from '../../../../models/staff-member';
import { StaffStore } from '../../../../admin/staff/staff-store/staff.store';
import { AuthStore } from '../../../../auth/auth.store';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-user-staff-member',
    imports: [NgClass],
    templateUrl: './user-staff-member.component.html',
    styleUrl: './user-staff-member.component.scss'
})
export class UserStaffMemberComponent implements OnInit {
    @Input() staffMember: StaffMember;
    staffStore = inject(StaffStore)
    // @Input() calledFrom: string;
    authStore = inject(AuthStore)

    calledFrom: InputSignal<string> = input<string>()

    constructor() {
        // effect(() => {
        //     console.log('calledFrom changed:', this.calledFrom)
        // })
    }

    ngOnInit(): void {
        // console.log('calledFrom changed:', this.calledFrom)
    }
}
