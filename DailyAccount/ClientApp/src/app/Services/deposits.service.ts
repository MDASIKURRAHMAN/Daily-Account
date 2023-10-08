import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposit } from '../interfaces/IDeposit';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {

  constructor(private http: HttpClient) { }

  getAllDepositsWithPagination(page: number, elementPerPage: number, sort: any[] = []): Observable<any> {
    let sortParams = '';
    if (sort.length === 0) {
      sortParams = 'date,desc';
    } else {
      sortParams = sort.map((item) => `${item.colId},${item.sort}`).join('&');
    }
    const params = new HttpParams()
        .set('elementPerPage', elementPerPage.toString())
        .set('page', page.toString())
        .set('sort', JSON.stringify(sortParams));
    const url = `https://localhost:7188/api/Deposit`;
    return this.http.get<any>(url,{params});
  }
  createDeposit(depositForm:any) {
    return this.http.post<Deposit>("https://localhost:7188/api/Deposit", depositForm);
  }
  updateDeposit(depositForm: any) {
    return this.http.put("https://localhost:7188/api/Deposit", depositForm);
  }
  deleteDeposit(depositID:number){
    return this.http.delete(`https://localhost:7188/api/Deposit/?depositID=${depositID}`);
  }
}
