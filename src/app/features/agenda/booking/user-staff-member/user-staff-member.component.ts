import { Component, inject, Input } from '@angular/core';
import { StaffMember } from '../../../../models/staff-member';
import { StaffStore } from '../../../../admin/staff/staff-store/staff.store';

@Component({
    selector: 'app-user-staff-member',
    imports: [],
    templateUrl: './user-staff-member.component.html',
    styleUrl: './user-staff-member.component.scss'
})
export class UserStaffMemberComponent {
    @Input() staffMember: StaffMember;
    staffStore = inject(StaffStore)
}
