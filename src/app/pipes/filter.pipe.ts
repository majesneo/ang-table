import {Injectable, Output, Pipe, PipeTransform} from '@angular/core';
import {TableService} from '../service/table.service';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  constructor(private tableService: TableService) {

  }

  filterArray(table, selectListId) {
    let result: any = [];
    return table.filter((item: any) => {
      for (const j in selectListId) {
        for (let i in item) {
          let str = item[i];
          if (typeof str === 'object') {
            str = item[i].city;
          }
          let regexp = new RegExp('\\b' + selectListId[j] + '\\b', 'gi');
          str = str.toString();
          if (str.match(regexp)) {
            result.push(item);

            return result;

          }
        }
      }
      return false;
    });
  }

  // tslint:disable-next-line:typedef
  checkEmptyFilters(filters: Array<any>) {
    let empty = true;
    filters.forEach(filter => {
      if (filter && filter.length > 0) {
        empty = false;
      }
    });
    return empty;
  }


  transform(table: any, ...filterCatefories: Array<any>) {

    if (this.checkEmptyFilters(filterCatefories)) {
      return table;
    }
    let result: any = table;

    filterCatefories.forEach(filters => {
      if (!filters || filters.length === 0) {
        return;
      }
      result = this.filterArray(result, filters);

      console.log();
    });
    return result;
  }
}

