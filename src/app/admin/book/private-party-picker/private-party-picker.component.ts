import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookStore } from '../book-store/book.store';

@Component({
    selector: 'app-private-party-picker',
    imports: [MatCheckboxModule],
    templateUrl: './private-party-picker.component.html',
    styleUrl: './private-party-picker.component.scss'
})
export class PrivatePartyPickerComponent {
    bookStore = inject(BookStore)
}
