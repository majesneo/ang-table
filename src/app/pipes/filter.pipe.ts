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

  sortYearsDown(filterCatefories: any, result: Array<number>) {
    if (filterCatefories[3] === true) {
      this.sortDown(result);
    }
  }

  sortYearsUp(filterCatefories: any, result: Array<number>) {
    if (filterCatefories[4] === true) {
      this.sortUp(result);
    }
  }

  sortNameUp(filterCatefories: any, result: Array<number>) {

    if (filterCatefories[5] === true) {

      this.sortUp(result);
    }
  }

  sortNameDown(filterCatefories: any, result: Array<number>) {
    if (filterCatefories[6] === true) {
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

    if (this.checkEmptyFilters(filterCatefories)) {
      return table;
    }

    filterCatefories.forEach(filters => {

      if (!filters || filters.length === 0 || filters == true) {
        return;
      }

      result = this.filterArray(result, filters);
      this.sortNameDown(filterCatefories, result);
      this.sortNameUp(filterCatefories, result);
      this.sortYearsDown(filterCatefories, result);
      this.sortYearsUp(filterCatefories, result);


    });

    return result;
  }
}

