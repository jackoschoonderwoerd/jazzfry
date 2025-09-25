import { StaffMember } from "../../../models/staff-member";
import { Venue } from "../../../models/venue.model"


export interface StaffSlice {
    // venues: Venue[];
    staffMembers: StaffMember[];
    staffMember: StaffMember;


}

export const initialStaffSlice: StaffSlice = {
    // venues: [],
    staffMembers: [],
    staffMember: null
}
