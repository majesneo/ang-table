import {Component, OnInit, Output} from '@angular/core';
import {TableService} from '../../service/table.service';
import {Table} from '../../model/table';
import {toArray} from 'rxjs/operators';
import {OperatorFunction} from 'rxjs';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {


  constructor(private tableService: TableService) {
  }

  table: object = [];
  selectGender: Array<string> = [];
  selectCity: Array<string> = [];
  selectDepart: Array<string> = [];
  @Output() selectListId: Array<string> = [];
  gender = 'gender';
  city = 'city';
  address = 'address';
  department = 'department';

  ngOnInit(): void {
    this.tableService.getDataTable().subscribe((data) => {
      this.table = data;

      this.selectGender = this.unique(data, this.gender);
      // @ts-ignore
      this.selectCity = this.unique(data, this.address, this.city);
      this.selectDepart = this.unique(data, this.department);

    });

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

  toArray(obj: Array<Table>, addFilterName: string) {
    const result: (Table | OperatorFunction<unknown, unknown[]>)[] = [];
    for (const prop in obj) {
      const value = obj[prop];

      if (prop === addFilterName) {
        if (!result.includes(obj[prop])) {
          return value;
        }
      } else if (typeof value === 'object') {
        // @ts-ignore
        result.push(toArray(value));
      }
    }
    return result;
  }


  unique(arr: Array<Table>, filterName: string, addFilterName = null) {
    let result: any[] = [];
    for (let str of arr) {
      // @ts-ignore
      if (typeof str[filterName] === 'object') {
        // @ts-ignore
        if (!result.includes(this.toArray(str[filterName], addFilterName))) {
          // @ts-ignore
          result.push(this.toArray(str[filterName], addFilterName));
        }
      } else { // @ts-ignore
        if (!result.includes(str[filterName])) {
          // @ts-ignore
          result.push(str[filterName]);
        }
      }
    }
    return result;
  }
}
