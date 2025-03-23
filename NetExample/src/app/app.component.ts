import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { SampleService } from './sample.service';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SetFilterModule,
} from 'ag-grid-enterprise';

// Register the AG Grid modules
ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SetFilterModule,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AgGridModule], // Import AG Grid module
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  forexData: any[] = [];
  columnDefs: ColDef[] = [];
  private dataInterval: any;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private samp: SampleService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Fetch initial data when the component is initialized
      this.fetchInitialData();
      
      // Define column definitions for the grid
      this.columnDefs  = [
        { field: 'symbol', headerName: 'Symbol',cellStyle: { fontWeight: 'bold' } },
        {
          field: 'status', 
          headerName: 'Status',
          cellRenderer: () => {
            return `
              <span class="icon-container">
                <i class="fas fa-chart-line"></i>  <!-- Trending Up -->
                <i class="fas fa-file-alt"></i>  <!-- Description -->
                <i class="fas fa-bell"></i>  <!-- Notification -->
              </span>
            `;
          }
        },
        
        
        // Bid Price with conditional color
        {
          field: 'bid',
          headerName: 'Bid Price',
          sortable: true,
          filter: true,
          cellRenderer: (params: { value: number; }) => {
            if (params.value > 100) {
              return `<span style="color: green;">▲ ${params.value}</span>`; // Up arrow
            } else if (params.value < 1) {
              return `<span style="color: red;">▼ ${params.value}</span>`; // Down arrow
            }
            return params.value;
          },cellStyle: { fontWeight: 'bold' }
        },
        
        {
          field: 'ask',
          headerName: 'Ask Price',
          sortable: true,
          filter: true,
          cellRenderer: (params: { value: number; }) => {
            if (params.value > 100) {
              return `<span style="color: green;">▲ ${params.value}</span>`;
            } else if (params.value < 1) {
              return `<span style="color: red;">▼ ${params.value}</span>`;
            }
            return params.value;
          },cellStyle: { fontWeight: 'bold' }
        },
        
        {
          field: 'change',
          headerName: 'Change Price',
          sortable: true,
          filter: true,
          cellRenderer: (params: { value: number; }) => {
            if (params.value > 0) {
              return `<span style="color: green;">▲ ${params.value}</span>`;
            } else if (params.value < 0) {
              return `<span style="color: red;">▼ ${params.value}</span>`;
            }
            return params.value;
          },cellStyle: { fontWeight: 'bold' }
        },
              
        { field: 'time', headerName: 'Time',cellStyle: { fontWeight: 'bold' } }
      ];
      
    }
  }

  

  fetchInitialData() {
    this.forexData = this.samp.getdata(); // Store static data for AG Grid
    this.startDataUpdate(); // Start updating data once initial data is fetched
  }

  startDataUpdate() {
    if (this.isBrowser) {
      this.dataInterval = setInterval(() => {
        this.updateData();
      }, 5000); // Update data every 5 seconds
    }
  }

  updateData() {
    this.forexData = this.forexData.map((data) => ({
      ...data,
      bid: +(data.bid + Math.random() * 0.01).toFixed(2),
      ask: +(data.ask + Math.random() * 0.01).toFixed(2),
      change: +(Math.random() * 2 - 1.5).toFixed(2),
      percentChange: +(Math.random() * 2 - 1.5).toFixed(2),
      time: new Date().toLocaleTimeString(),
    }));
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      // Cleanup interval when component is destroyed
      clearInterval(this.dataInterval);
    }
  }
}
