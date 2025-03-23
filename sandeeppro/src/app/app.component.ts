import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';

import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,UserloginComponent,RegisterComponent,LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sandeeppro';
}
