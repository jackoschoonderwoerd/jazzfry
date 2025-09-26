import { Component, inject } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    imports: [RouterModule, MatIconModule, MatButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    authStore = inject(AuthStore)
}
