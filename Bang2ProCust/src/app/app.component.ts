import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProCustComponent } from './pro-cust/pro-cust.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProCustComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bang2ProCust';
}
