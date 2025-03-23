import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { SampleService } from '../sample.service';
import { AgTable } from '../Models/ag-table';
import { ColDef, GridOptions, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular'; 
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import {
  
  ClientSideRowModelModule,
 
 
 
  type ValueFormatterFunc,
  type ValueGetterParams,
} from 'ag-grid-community';


import {
  AdvancedFilterModule,
  CellSelectionModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  IntegratedChartsModule,
  RichSelectModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SetFilterModule,
  SparklinesModule,

} from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule,ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  CellSelectionModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SetFilterModule,
  RichSelectModule, 
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  SparklinesModule.with(AgChartsEnterpriseModule),
]);
const numberFormatter: ValueFormatterFunc = (params) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
  });
  return params.value == null ? '' : formatter.format(params.value);
};



const sparklineTooltipRenderer = (params: any) => {
  if (!params || !params.xValue) {
    return null; // Ensure there's a valid value
  }

  // Convert price to two decimal places
  const formattedPrice = Number(params.yValue).toFixed(2);

  return {
    content: ` ${formattedPrice}`, // Show formatted price
  };
};



@Component({
  selector: 'app-aggrid-view',
  standalone: true,
  imports: [AgGridAngular, CommonModule,AgGridModule,],
  templateUrl: './aggrid-view.component.html',
  styleUrl: './aggrid-view.component.css'
})
export class AggridViewComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
 tables:AgTable[]=[];
 cellSelection: boolean = true;
  enableCharts: boolean = true;
  rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined =
    'always';
  suppressAggFuncInHeader: boolean = true;
  groupDefaultExpanded = -1;

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    enableRowGroup: true,
    enableValue: true,
  };
  coldefs: ColDef<AgTable>[]=[
      { field: 'name', headerName: 'Name', width: 100, cellRenderer: (params: ICellRendererParams) => {
        const name = params.value || 'Unknown';
        const firstTwoLetters = name.substring(0, 2).toUpperCase(); // Extract first two letters
    
        return `
          <span style="display: flex; align-items: center; font-weight: bold;">
            <span style="
              width: 28px;
              height: 28px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              background:linear-gradient(45deg,rgb(231, 42, 9),rgb(71, 247, 22));
              color: white;
              border-radius: 50%;
              font-size: 14px;
              font-weight: bold;
              margin-right: 5px;
            ">
              ${firstTwoLetters}
            </span>
            ${name}
          </span>
        `;
      } },

      { field: 'instrument', headerName: 'Instrument', width: 100 },
      {
        field: 'purchaseDate',
        headerName: 'Purchase Date',
        width: 150,
        valueFormatter: ({ value }) => value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
      },
      
      
      { field: 'purchasePrice', headerName: 'PurchasePrice', width: 100 },
      { field: 'currentPrice', headerName: 'CurrentPrice', width: 150,
         valueFormatter: (params: ValueFormatterParams) => {
        const purchasePrice = params.data?.purchasePrice ?? 0;
        const currentPrice = params.value ?? 0;
        const difference = currentPrice - purchasePrice;
    
        // Ensure two decimal places
        const formattedCurrentPrice = currentPrice.toFixed(2);
        const formattedDifference = difference.toFixed(2);
        const sign = difference >= 0 ? '+' : '-';
    
        return `${formattedCurrentPrice} (${sign}${Math.abs(Number(formattedDifference)).toFixed(2)})`;
      },
      cellRenderer: (params: ICellRendererParams) => {
        const purchasePrice = params.data?.purchasePrice ?? 0;
        const currentPrice = params.value ?? 0;
        const difference = currentPrice - purchasePrice;
    
        // Ensure two decimal places
        const formattedCurrentPrice = currentPrice.toFixed(2);
        const formattedDifference = difference.toFixed(2);
        const sign = difference >= 0 ? '+' : '-';
    
        // Set color for only the difference
        const color = difference >= 0 ? 'green' : 'red';
    
        return `<span>${formattedCurrentPrice} (<span style="color: ${color}; font-weight: bold;">${sign}${Math.abs(Number(formattedDifference)).toFixed(2)}</span>)</span>`;
      }
    },
    {
      field: 'timelineprice',
      headerName: 'TimeLinePrice',
      sortable: false,
      filter: false,
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          direction: 'vertical',
          axis: {
            strokeWidth: 0,
          },
          tooltip: {
            renderer: sparklineTooltipRenderer,
          },
        },
      },
    },
    
      {
        colId: 'p&l',
        headerName: 'P&L',
        cellDataType: 'number',
        filter: 'agNumberColumnFilter',
        type: 'rightAligned',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueGetter: ({ data }: ValueGetterParams) => this.calculateValues(data, 'p&l'),
        cellStyle: (params) => ({
          color: params.value >= 10 ? 'green' : 'red', // Green if profit, Red if loss
          fontWeight: 'bold'
        }),
        valueFormatter: (params)=>{
          const value=params.value;
          const formmatedValue=numberFormatter(params);
          return value > 10 ? `+${formmatedValue}`:formmatedValue;
        },
        aggFunc: 'sum',
        minWidth: 140,
        initialWidth: 140,
      },
      {
        colId: 'totalValue',
        headerName: 'Total Value',
        type: 'rightAligned',
        cellDataType: 'number',
        filter: 'agNumberColumnFilter',
        valueGetter: ({ data }: ValueGetterParams) => this.calculateValues(data, 'totalValue'),
        // cellStyle: (params) => ({
        //   color: params.value >= 1 ? 'green' : 'red', // Green if profit, Red if loss
        //   fontWeight: 'bold'
        // }),
        cellRenderer: (params: ICellRendererParams) => {
          const quantity = params.data?.quantity ?? 1;
          const purchasePrice = params.data?.purchasePrice ?? 0;
          const currentPrice = params.data?.currentPrice ?? 0;
      
          const totalPurchaseValue = quantity * purchasePrice;
          const totalCurrentValue = quantity * currentPrice;
          const difference = totalCurrentValue - totalPurchaseValue;
      
          // Ensure two decimal places
          const formattedTotalValue = totalCurrentValue.toFixed(2);
          const formattedDifference = difference.toFixed(2);
          const sign = difference >= 0 ? '+' : '-';
      
          // Set color for only the difference
          const color = difference >= 0 ? 'green' : 'red';
      
          return `<span>${formattedTotalValue} (<span style="color: ${color}; font-weight: bold;">${sign}${Math.abs(Number(formattedDifference)).toFixed(2)}</span>)</span>`;
        },
        valueFormatter: numberFormatter, // Keep your number formatting function
        aggFunc: 'sum',
        minWidth: 160,
        initialWidth: 160,
      },
      
  ];

  calculateValues(rowData: any, type: 'p&l' | 'totalValue'): number {
    if (!rowData) return 0; // Ensure row data exists
  
    const quantity = rowData.quantity ?? 1; // Default to 1 if missing
    const price = rowData.currentPrice ?? 0;
    const purchasePrice = rowData.purchasePrice && rowData.purchasePrice !== 0 ? rowData.purchasePrice : 1; // Avoid division by 0
  
    // console.log(`Calculating ${type}: Quantity=${quantity}, Price=${price}, PurchasePrice=${purchasePrice}`);
  
    if (type === 'p&l') {
      return quantity * (price / purchasePrice);
    } else if (type === 'totalValue') {
      return quantity * price;
    }
  
    return 0;
  }
  
  
  
  

  isBrowser: boolean;
  AgGridModule: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object,private samp:SampleService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  

  async ngOnInit(): Promise<void> {
    
    if (this.isBrowser) {
      const { AgGridAngular } = await import('ag-grid-angular');
      this.AgGridModule = AgGridAngular;
    }

    
    this.samp.gettable().subscribe((data:any) => {  
      this.tables = data;
      this.startPriceUpdate();
    });
    
  }




  startPriceUpdate() {
    setInterval(() => {
      this.tables = this.tables.map((row) => {
        const priceChange = Math.random() * 4 - 2; // Random change between -2 and +2
        const newPrice = Math.max((row.currentPrice ?? 1) + priceChange, 1); // Ensure price stays above 1
  
        return {
          ...row,
          currentPrice: newPrice,
          timelineprice: [...(row.timelineprice ?? []).slice(-9), newPrice] // Keep last 10 values
        };
      });
  
      // **Correct Way to Update Grid Data**
      if (this.agGrid?.api) {
        this.agGrid.api.applyTransaction({ update: this.tables });
        this.agGrid.api.refreshCells({ force: true });
      }
    }, 2000);
  }
    
}








