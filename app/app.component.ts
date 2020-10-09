import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AgGridAngular } from 'ag-grid-angular';
import {AggridserviceService} from './aggridservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tablerowData;
  data;
  filteredList;
  selectedItem;
  columnDefs;
  splitedValue: any;
  rangeFirstValue: any;
  rangeSecondValue: any;
  gridApi: any;
  gridColumnApi: any;

  searchData = [
    { range: '10000-20000' },
    { range: '20000-30000' },
    { range: '30000-40000' },
    { range: '40000-100000' },
  ]

  constructor(private aggridservice: AggridserviceService) { }

  ngOnInit(): void {
    this.getJsonData();
  }

  generateColumns(data: any[]) {
    let columnDefinitions = [];
    data.map(object => {
      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key
          }
          columnDefinitions.push(mappedColumn);
        })
    })
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )
    return columnDefinitions;
  }
  getJsonData() {
    this.aggridservice.getAggridData().subscribe(res => {
      this.tablerowData = res;
    })
  }
  search(e) {
    console.log(e);
    this.data = e;
  }
  serchRage(e) {
    this.selectedItem = e;
    this.splitedValue = this.selectedItem.split('-');
    console.log(this.splitedValue);
    this.rangeFirstValue = this.splitedValue[0];
    this.rangeSecondValue = this.splitedValue[1];
    console.log(this.rangeSecondValue, "this.rangeSecondValue");
  }

 
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.aggridservice.getAggridData().subscribe((data) => {
      this.tablerowData = data;
      this.columnDefs = this.generateColumns(this.tablerowData)
      params.api.setRowData(data)
    });
  }

  getExelFile(fileInput: any) {
    let fileReaded = fileInput.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);
    reader.onload = (e) => {
      let csv: any = reader.result;
      let lines = csv.split("\n");
      let result = [];
      let headers = lines[0].split(",");
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          let dataString = String(currentline[j])
          console.log(dataString.toString());
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      console.log(result);
      this.tablerowData = result;
      this.columnDefs = this.generateColumns(this.tablerowData)
    }
  }
  ExportDataOnEXcel() {
    this.gridApi.exportDataAsCsv();
  }


}