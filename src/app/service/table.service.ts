import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Table} from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {




  constructor(private httpclient: HttpClient) {

  }

  getDataTable(): Observable<Table[]> {
    // @ts-ignore
    return this.httpclient.get('http://localhost:4200/assets/table.json');
  }
}
