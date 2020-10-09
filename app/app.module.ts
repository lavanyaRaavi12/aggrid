import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ModuleRegistry} from '@ag-grid-community/core';     // @ag-grid-community/core will always be implicitly available
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {CsvExportModule} from "@ag-grid-community/csv-export";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import { AggridpipePipe } from './aggridpipe.pipe';
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule,
    ExcelExportModule,
    MasterDetailModule
]);
@NgModule({
  declarations: [
    AppComponent,
    AggridpipePipe
  ],

  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
