import { Component, effect, inject, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingsStore } from '../../../features/agenda/bookings-store/bookings.store';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MyDateRange } from '../../../features/agenda/bookings-store/bookings.slice';
import { NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-stats-options',
    imports: [
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NgClass,
        MatRadioModule,
        FormsModule
    ],
    templateUrl: './stats-options.component.html',
    styleUrl: './stats-options.component.scss'
})
export class StatsOptionsComponent {

    bookingsStore = inject(BookingsStore)
    selectedView: string = 'all'

    options: string[] = [
        'all',
        'jazz in amsterdam'
    ]

    constructor() {
        effect(() => {
            console.log(this.bookingsStore.showAllActive());
            console.log(this.bookingsStore.onlyAmsterdamFutureFilterActive());
            console.log(this.bookingsStore.dateFilterActive());
            if (this.bookingsStore.showAllActive()) {
                this.selectedView = 'showAll'
            };
            if (this.bookingsStore.onlyAmsterdamFutureFilterActive()) {
                this.selectedView = 'jazzInAmsterdam'
            };
            if (this.bookingsStore.dateFilterActive()) {
                this.selectedView = null;
            }

        })
    }

    dateFilterActive = signal<boolean>(false)
    showAllActive = signal<boolean>(false);
    onlyAmsterdamFutureFilterActive = signal<boolean>(false)

    onEndDateChange(startString: string, end: Date) {
        const start = new Date(startString)
        const dateRange: MyDateRange = {
            startDate: new Date(startString),
            endDate: end
        }
        console.log(start, typeof start, end, typeof end)
        this.bookingsStore.setDateRange(dateRange)
    }
}
