import { Component } from '@angular/core';
import { HospitalLoginComponent } from '../hospital-login/hospital-login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HospitalHomeComponent } from '../hospital-home/hospital-home.component';
import { HopitalregisterComponent } from '../hopitalregister/hopitalregister.component';

@Component({
  selector: 'app-masterpage1',
  standalone: true,
  imports: [HospitalLoginComponent,RouterLink,RouterOutlet,HospitalHomeComponent,HopitalregisterComponent],
  templateUrl: './masterpage1.component.html',
  styleUrl: './masterpage1.component.css'
})
export class Masterpage1Component {

}
