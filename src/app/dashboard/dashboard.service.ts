import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  newsArticleSubject: BehaviorSubject<any> = new BehaviorSubject<any>({articles: [], totalResults:0});

  constructor(private _http: HttpClient) { }

  getNewsData(data = {}) {
    // const data ={
    //   queryString: 'Donald trump',
    //   country: "US",
    //   fromDate: "2023-07-08",
    //   toDate: "2023-07-08",
    //   sortBy: "publishedAt"
    // }
    return this._http.post(environment.apiUrl + "news", data);
  }

}
