import { Component, inject, input, Optional, Signal, signal } from '@angular/core';
import { BookingsStore } from '../agenda/bookings-store/bookings.store';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VenuesStore } from '../../admin/venues/venue-store/venue.store';
import { UserVenueComponent } from '../agenda/booking/user-venue/user-venue.component';
import { UserStaffMemberComponent } from '../agenda/booking/user-staff-member/user-staff-member.component';
import { StaffStore } from '../../admin/staff/staff-store/staff.store';
import { DateComponent } from '../../shared/date/date.component';
import { FlagsComponent } from '../../shared/flags/flags.component';
import { HourComponent } from '../../shared/hour/hour.component';
import { UiStore } from '../../shared/ui-store/ui.store';
import { JsonPipe, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthStore } from '../../auth/auth.store';


@Component({
    selector: 'app-upcoming-dialog',
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        UserVenueComponent,
        UserStaffMemberComponent,
        DateComponent,
        FlagsComponent,
        HourComponent,
        // JsonPipe,
        UserVenueComponent,
        MatProgressSpinnerModule,
        NgClass
    ],
    templateUrl: './upcoming-dialog.component.html',
    styleUrl: './upcoming-dialog.component.scss'
})
export class UpcomingDialogComponent {

    hour = input<number>(0)
    staffStore = inject(StaffStore)
    bookingsStore = inject(BookingsStore)
    venuesStore = inject(VenuesStore)
    uiStore = inject(UiStore);
    authStore = inject(AuthStore)

    data = inject(MAT_DIALOG_DATA, { optional: true });

    constructor(public dialogRef: MatDialogRef<UpcomingDialogComponent>) {
        // console.log(this.data)
    }

    onClose() {
        this.dialogRef.close(true)
    }

}
