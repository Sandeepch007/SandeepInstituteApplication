import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { UserloginComponent } from '../userlogin/userlogin.component';
import { register } from 'module';
import { RegisterComponent } from '../register/register.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [CommonModule,HomeComponent,RouterOutlet,RouterLink,AdminloginComponent,UserloginComponent,RegisterComponent,ForgotpasswordComponent],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent {
 
}
