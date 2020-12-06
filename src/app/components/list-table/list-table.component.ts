import {Component, Input, OnInit, Output} from '@angular/core';
import {TableService} from '../../service/table.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {


  constructor(private tableService: TableService) {
  }

  table: object = [];
  sortYearsResultDown: boolean = false;
  sortYearsResultUP: boolean = false;
  @Input() selectListId: Array<string> = [];
  sortNameResultUp: boolean = false;
  sortNameResultDown: boolean = false;

  ngOnInit(): void {
    this.tableService.getDataTable().subscribe((data) => {
      this.table = data;
    });
  }


  sortYearsDown(e: any) {
    this.sortYearsResultDown = e.target.checked;
  }

  sortYearsUp(e: any) {
    this.sortYearsResultUP = e.target.checked;
  }

  sortNameUp(e: any) {
    this.sortNameResultUp = e.target.checked;
  }

  sortNameDown(e: any) {
    this.sortNameResultDown = e.target.checked;
  }
}
