import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AggridViewComponent } from './aggrid-view/aggrid-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AggridViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FinancialData';
}
