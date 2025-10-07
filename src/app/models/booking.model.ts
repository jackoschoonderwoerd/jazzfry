import { StaffMember } from "./staff-member";
import { Venue } from "./venue.model";

export interface Booking {
    id?: string;
    date: any;
    start: string;
    end: string;
    venue: Venue;
    staffMemberIds: string[];
    privateParty?: boolean;
    hidden: boolean;
}
