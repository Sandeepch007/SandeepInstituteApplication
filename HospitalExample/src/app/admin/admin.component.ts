import { Component } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import { AdminusersComponent } from '../adminusers/adminusers.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdmindashboardComponent,AdminusersComponent,RouterLink,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor( private router: Router) {}

  logout() {
  
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
