import {Component, Input, OnInit} from '@angular/core';
import {TableService} from './service/table.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  table: object = [];
  primer: any;
  selectGender: string[];
  selectCity: string[];
  selectDepart: string[];


  selectListId: Array<Array<any>> | undefined;

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


  uniqueGender(arr: object) {
    let result = [];
    for (let str of arr) {
      // @ts-ignore
      if (!result.includes(str.gender)) {
        result.push(str.gender);
      }
    }

    return result;
  }

  uniqueCity(arr: object) {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str.address.city)) {
        result.push(str.address.city);
      }
    }

    return result;
  }

  uniqueDepart(arr: object) {
    // @ts-ignore
    let result: any[] = [];
    // @ts-ignore
    for (const str of arr) {
      if (!result.includes(str.department)) {
        result.push(str.department);
      }
    }

    return result;
  }


  getListId(e: any, filter: string, category: number) {
    if (!this.selectListId[category]) {
      this.selectListId[category] = [];
    }
    if (e.target.checked) {
      // @ts-ignore
      this.selectListId[category] = this.selectListId[category].concat(filter);
    } else {
      this.selectListId[category] = this.selectListId[category].filter(item => item !== filter);

    }

  }
}


