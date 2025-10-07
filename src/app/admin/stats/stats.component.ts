import { Component, effect, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookingsStore } from '../../features/agenda/bookings-store/bookings.store';
import { DatePipe, JsonPipe } from '@angular/common';
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
        // 'id',
        'date',
        'start',
        'end',
        'venueName',
        // 'venueWebsite',
        'city',
        'staffMembers',
        'private',
        'hidden'
    ];

    dataSource: any

    constructor() {
        effect(() => {
            if (this.bookingsStore.show_future_amsterdamOnly_hidePrivate_hideHidden()) {
                this.dataSource = this.bookingsStore.future_amsterdamOnly_hidePrivate_hideHidden();
            } else {
                this.dataSource = this.bookingsStore.all();
            }
        });
    }


    filename = 'jazzfry.xlsx'

    exportExcel() {
        let data = document.getElementById('table-data');

        console.log(data);


        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

        // console.log(ws)

        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        console.log(wb)

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.fileName)
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

    applyPrivatePartyFilter() {
        // this.dataSource.filterPredicate = (booking: Booking) => {
        //     this.dataSource = this.dataSource.filter(this.dataSource) booking.privateParty
        // const date = new Date(data.date);
        // const start = this.startDate ? new Date(this.startDate) : null;
        // const end = this.endDate ? new Date(this.endDate) : null;

        // if (start && end) return date >= start && date <= end;
        // if (start) return date >= start;
        // if (end) return date <= end;
        // return true;
    };

    // Trigger filter refresh (any non-empty value works)
    // this.dataSource.filter = Math.random().toString();
    // }
}
