import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {




  constructor(private httpclient: HttpClient) {

  }

  getDataTable(): Observable<object> {
    return this.httpclient.get('http://localhost:4200/assets/table.json');
  }
}
