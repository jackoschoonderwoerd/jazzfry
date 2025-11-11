import { Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookingsStore } from '../../features/agenda/bookings-store/bookings.store';
import { DatePipe, isPlatformBrowser, JsonPipe } from '@angular/common';
import { VenuesStore } from '../venues/venue-store/venue.store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StatsOptionsComponent } from './stats-options/stats-options.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { StaffStore } from '../staff/staff-store/staff.store';
import { StaffMemberComponent } from '../staff/staff-member/staff-member.component';
import { Router } from '@angular/router';
import { BookStore } from '../book/book-store/book.store';
import { Booking } from '../../models/booking.model';

@Component({
    selector: 'app-stats',
    imports: [
        MatTableModule,
        DatePipe,
        MatCheckboxModule,
        StatsOptionsComponent,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        StaffMemberComponent
    ],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss',

})
export class StatsComponent {

    fileName = "jazzfry.xlsx"
    bookingsStore = inject(BookingsStore);
    bookStore = inject(BookStore)
    venuesStore = inject(VenuesStore);
    staffStore = inject(StaffStore);
    router = inject(Router)
    displayedColumns: string[] = [
        'edit',
        'delete',
        'date',
        'start',
        'end',
        'venueName',
        'city',
        'staffMembers',
        'private',
        'hidden'


        // 'id',
        // 'venueWebsite',
    ];

    dataSource: any
    private isBrowser: boolean;

    constructor() {
        this.isBrowser = isPlatformBrowser(PLATFORM_ID);
        effect(() => {
            if (this.bookingsStore.showAllActive()) {
                this.dataSource = this.bookingsStore.future_amsterdamOnly_hidePrivate_hideHidden();
            } else {
                this.dataSource = this.bookingsStore.all();
            }
        });
    }


    filename = 'jazzfry.xlsx'

    exportExcel() {

        if (this.isBrowser) {

            let data = document.getElementById('table-data');
            console.log(data);
            const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

            // console.log(ws)

            const wb: XLSX.WorkBook = XLSX.utils.book_new();

            console.log(wb)

            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            XLSX.writeFile(wb, this.fileName)
        }



    }

    onEdit(booking: Booking) {

        this.router.navigateByUrl('/admin/book');
        this.bookStore.setBookingForEdit(booking)
    }

    onPrivatePartyChange(e) {
        console.log(e)
        this.dataSource.filterPredicate = (booking: Booking) => {
            booking.privateParty === true
        }
    }

}
