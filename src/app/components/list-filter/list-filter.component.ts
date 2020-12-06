import {Component, OnInit, Output} from '@angular/core';
import {TableService} from '../../service/table.service';
import {Table} from '../../model/table';

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

  ngOnInit(): void {
    this.tableService.getDataTable().subscribe((data) => {
      this.table = data;
      this.selectGender = this.uniqueGender(data);
      this.selectCity = this.uniqueCity(data);
      this.selectDepart = this.uniqueDepart(data);

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

  uniqueGender(arr: Array<Table>) {

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

}
