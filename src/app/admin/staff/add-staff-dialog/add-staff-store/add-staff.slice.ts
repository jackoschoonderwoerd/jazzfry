import { StaffMember } from "../../../../models/staff-member";

export interface AddStaffSlice {
    readonly staffMember: StaffMember;
    readonly editmode: boolean;
}

export const initialAddStaffSlice: AddStaffSlice = {
    staffMember: {
        personalia: { firstName: '', particles: '', lastName: '' },
        instruments: []
    },
    editmode: false
}
