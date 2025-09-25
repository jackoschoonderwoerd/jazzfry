import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './navigation/admin-header/admin-header.component';

@Component({
    selector: 'app-admin',
    imports: [RouterModule, MatToolbarModule, AdminHeaderComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
