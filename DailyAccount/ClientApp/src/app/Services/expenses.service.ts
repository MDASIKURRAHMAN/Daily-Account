import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../interfaces/IExpenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  getAllExpensesWithPagination(page: number, elementPerPage: number, sort: any[] = []): Observable<any> {
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
    const url = `https://localhost:7188/api/Expenses`;
    return this.http.get<any>(url,{params});
  }
  createExpenses(expensesForm: any) {
    return this.http.post<Expenses>("https://localhost:7188/api/Expenses", expensesForm);
  }
  updateExpenses(expensesForm: any) {
    return this.http.put("https://localhost:7188/api/Expenses", expensesForm);
  }
  deleteExpenses(expensesID:number){
    return this.http.delete(`https://localhost:7188/api/Expenses/?expensesID=${expensesID}`);
  }
}
