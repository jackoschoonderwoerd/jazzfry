import { StaffMember } from "./staff-member";
import { Venue } from "./venue.model";

export interface Booking {
    readonly id?: string;
    readonly date: any;
    readonly start: string;
    readonly end: string;
    readonly venue: Venue;
    readonly staffMemberIds: string[];
    readonly privateParty?: boolean;
    readonly hidden: boolean;
}
