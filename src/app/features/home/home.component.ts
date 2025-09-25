import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    router = inject(Router)
}
