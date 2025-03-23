import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { CommonModule } from '@angular/common';
import { Masterpage2Component } from './masterpage2/masterpage2.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MasterpageComponent,CommonModule,MasterpageComponent,Masterpage2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newcommunity';
  username= '';

  constructor(private cookieService: CookieService) {
    //Retrieve the username from the cookie
    this.username = this.cookieService.get('username')|| ''; // Ensure fallback to empty string
    console.log('Username from cookie:', this.username);// Fallback to an empty string if the cookie is not found
  }
  

}
  

  
  


