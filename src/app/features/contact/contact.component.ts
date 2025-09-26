import { Component, inject } from '@angular/core';
import { UiStore } from '../../shared/ui-store/ui.store';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    uiStore = inject(UiStore)
}
