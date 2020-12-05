import {Component, Input, OnInit} from '@angular/core';
import {TableService} from './service/table.service';
import {Table} from './model/table';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  table: object = [];
  primer: any;
  selectGender: Array<string> = [];
  selectCity: Array<string> = [];
  selectDepart: Array<string> = [];
  selectListId: Array<string>  = [];

  constructor(private tableService: TableService) {

  }

  ngOnInit(): void {
    this.tableService.getDataTable().subscribe((data) => {
      this.table = data;
      console.log(this.table);
      this.selectGender = this.uniqueGender(data);
      this.selectCity = this.uniqueCity(data);
      this.selectDepart = this.uniqueDepart(data);

    });
    this.selectListId = new Array<string>();


  }


  uniqueGender(arr: Array<Table>) {
    console.log(arr);
    let result: any[] = [];

    for (let str of arr) {

      if (!result.includes(str.gender)) {
        result.push(str.gender);
      }
    }

    return result;
  }

  uniqueCity(arr: Array<Table>) {
    let result: any[] = [];

    for (let str of arr) {
      if (!result.includes(str.address.city)) {
        result.push(str.address.city);
      }
    }

    return result;
  }

  uniqueDepart(arr: Array<Table>) {
    let result: any[] = [];

    for (const str of arr) {
      if (!result.includes(str.department)) {
        result.push(str.department);
      }
    }

    return result;
  }


  getListId(e: any, filter: string, category: number) {

    if (!this.selectListId[category]) {

      // @ts-ignore
      this.selectListId[category] = [];
    }
    if (e.target.checked) {

      this.selectListId[category] = this.selectListId[category].concat(filter);
    } else {

      // @ts-ignore
      this.selectListId[category] = this.selectListId[category].filter((item: string) => item !== filter);

    }

  }
}


