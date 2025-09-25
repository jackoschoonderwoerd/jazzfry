import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { BookStore } from '../book-store/book.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-time-picker',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        NgxMatTimepickerModule,

        FormsModule

    ],
    templateUrl: './time-picker.component.html',
    styleUrl: './time-picker.component.scss'
})
export class TimePickerComponent {
    bookStore = inject(BookStore)

    start = null;
    end = null;


    constructor() {
        if (this.bookStore.start()) {
            this.start = this.bookStore.start();
        }
        if (this.bookStore.end()) {
            this.end = this.bookStore.end();
        }
    }


    // startsAt(start: string) {
    //     console.log('start changed:', start);
    //     this.start = start;
    //     console.log(this.start)
    //     this.bookstore.setStart(start);
    // }

    // endsAt(end: string) {
    //     console.log('end changed:', end);
    //     console.log(this.end)
    //     this.end = end;
    //     this.bookstore.setEnd(end);
    // }


}
