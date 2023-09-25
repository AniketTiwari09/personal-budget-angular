import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private dataSubject = new BehaviorSubject<any>({myBudget:[]});
  public data$ = this.dataSubject;

  constructor(private http: HttpClient) {}
  fetchData(): void {
    if (!this.dataSubject.value.length) {
      this.http.get('http://localhost:4000/budget').subscribe((data: any) => {

      this.dataSubject.next(data);
         // Update the BehaviorSubject with fetched data
      });
    }
  }


}
