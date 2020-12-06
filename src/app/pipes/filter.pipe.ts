import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  constructor() {

  }

  filterArray(table: any[], selectListId: { [x: string]: string; }) {
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

  sortYears(filterCatefories: any, result: any) {
    if (filterCatefories[3] === true) {

      for (const item in result) {
        result.sort((a: number, b: number) => a.age > b.age ? 1 : -1);

      }

    } else {
      for (const item in result) {
        result.sort((a: number, b: number) => a.age > b.age ? -1 : 1);
      }
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
     this.sortYears(filterCatefories, result);

    if (this.checkEmptyFilters(filterCatefories)) {
      return table;
    }


    filterCatefories.forEach(filters => {
      if (!filters || filters.length === 0|| filters == true) {
        return;
      }
      console.log(filters);
      result = this.filterArray(result, filters);
    /*     console.log(result);*/


      this.sortYears(filterCatefories,result)


    });
    return result;
  }
}

