import { Component, inject, input, InputSignal } from '@angular/core';
import { UiStore } from '../ui-store/ui.store';

@Component({
    selector: 'app-hour',
    imports: [],
    templateUrl: './hour.component.html',
    styleUrl: './hour.component.scss'
})
export class HourComponent {
    // hour = input<string>()
    hour: InputSignal<string> = input<string>();
    uiStore = inject(UiStore)


    getHour(): string {
        if (!this.hour()) return '';

        const lang = this.uiStore.activeLanguage();
        const [h, m] = this.hour().split(':').map(Number);

        if (isNaN(h) || isNaN(m)) return this.hour();

        // Build a Date object for today with the given hour/minute
        const date = new Date();
        date.setHours(h, m, 0, 0);

        // Pick locale: fallback to 'en' if unknown
        const locale = lang === 'nl' ? 'nl-NL' : 'en-US';

        // Format time for that locale
        return new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            minute: '2-digit',
        }).format(date);
    }
}
