import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AggridserviceService {

  constructor(private http:HttpClient) { }
  getAggridData(){
    return this.http.get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json");
  }
}
