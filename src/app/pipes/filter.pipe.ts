import {Pipe, PipeTransform} from '@angular/core';
import {Table} from '../model/table';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  constructor() {
  }

  filterArray(table: any[], selectListId: any = null) {
    let result: any = [];
    console.log(selectListId);
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

  sortUp = (result: Array<number>) => {
    for (const item in result) {
      // @ts-ignore
      result.sort((a: number, b: number) => a.age < b.age ? 1 : -1);
    }
  };
  sortDown = (result: Array<number>) => {
    for (const item in result) {
      // @ts-ignore
      result.sort((a: number, b: number) => a.age > b.age ? 1 : -1);
    }
  };

  sortYears(filterCatefories: any, result: Array<number>) {
    console.log(filterCatefories);
    if (filterCatefories[3] === true) {
      this.sortUp(result);
    } else if (filterCatefories[3] !== null && filterCatefories[3] === false) {
      this.sortDown(result);
    }
  }

  sortName(filterCatefories: any, result: Array<number>) {
    if (filterCatefories[4] === true) {
      this.sortUp(result);
    } else if (filterCatefories[4] !== null && filterCatefories[4] === false) {
      this.sortDown(result);
    }
  }


  checkEmptyFilters(filters: Array<string>) {
    let empty = true;

    filters.forEach(filter => {
      if (filter && filter.length > 0) {
        empty = false;
      }
    });
    return empty;
  }


  transform(table: any, ...filterCatefories: Array<any>) {

    let result: any = table;
    this.sortYears(filterCatefories, table);
    this.sortName(filterCatefories, table);

    if (this.checkEmptyFilters(filterCatefories)) {
      return table;
    }

    filterCatefories.forEach(filters => {

      if (!filters || filters.length === 0 || filters == true) {
        return table;
      }
      result = this.filterArray(result, filters);

    });

    return result;
  }
}

