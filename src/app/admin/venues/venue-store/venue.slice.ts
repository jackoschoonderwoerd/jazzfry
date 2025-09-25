import { Venue } from "../../../models/venue.model";


export interface VenueSlice {
    venues: Venue[];
    selectedVenue: Venue;

    // readonly staffMember: StaffMember;
    // readonly editmode: boolean;
}

export const initialVenueSlice: VenueSlice = {
    venues: [],
    selectedVenue: null,


    // staffMember: {
    //     personalia: { firstName: '', particles: '', lastName: '' },
    //     instruments: []
    // },
    // editmode: false
}
