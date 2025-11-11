import { Component, inject } from '@angular/core';
import { UiStore } from '../../shared/ui-store/ui.store';
import { SeoService } from '../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    uiStore = inject(UiStore)

    constructor(

        private seo: SeoService,
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser) {
            this.seo.setMeta({
                title: 'Jazzfry | Discover Jazz Events Near You',
                description: 'Find local jazz concerts, amsterdam, artists, and venues with Jazzfry.',
                url: 'https://www.jazzfry.com',
                image: 'https://www.jazzfry.com/assets/preview.jpg',
            });
        }
    }
}
