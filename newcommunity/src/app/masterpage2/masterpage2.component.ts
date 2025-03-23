import { Component } from '@angular/core';
import { ArticlesComponent } from '../articles/articles.component';
import { ProjectsComponent } from '../projects/projects.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masterpage2',
  standalone: true,
  imports: [ProjectsComponent,ArticlesComponent,RouterOutlet,RouterLink,CommonModule,],
  templateUrl: './masterpage2.component.html',
  styleUrl: './masterpage2.component.css'
})
export class Masterpage2Component {
 
  constructor(private router:Router,private cookieService:CookieService){}

  logout(): void {
    this.cookieService.deleteAll();
    localStorage.clear(); 
    this.router.navigate(['/User']); 
  }
  
}
