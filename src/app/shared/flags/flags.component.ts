import { Component, inject } from '@angular/core';
import { UiStore } from '../ui-store/ui.store';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-flags',
    imports: [NgClass],
    templateUrl: './flags.component.html',
    styleUrl: './flags.component.scss'
})
export class FlagsComponent {
    uiStore = inject(UiStore)
}
