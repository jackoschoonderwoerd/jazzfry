import { StaffMember } from "../../../models/staff-member";
import { Venue } from "../../../models/venue.model"


export interface BookSlice {
    // venues: Venue[];
    id?: string;
    staffMemberIds: string[];
    date: Date;
    start: string;
    end: string;
    venue: Venue;
    privateParty: boolean;
    editmode: boolean;
    formTouched: boolean;
}

export const initialBookSlice: BookSlice = {
    id: null,
    staffMemberIds: [],
    date: null,
    start: '',
    end: '',
    venue: null,
    privateParty: false,
    editmode: false,
    formTouched: false
}
