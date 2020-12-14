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

  sortYearsResultUP: boolean | null = null;
  @Input() selectListId: Array<string> = [];
  sortNameResultUp: boolean | null = null;


  ngOnInit(): void {
    this.tableService.getDataTable().subscribe((data) => {
      this.table = data;
    });
  }


  sortYearsUp(event: MouseEvent) {
    this.sortYearsResultUP = !this.sortYearsResultUP;

  }

  sortNameUp(event: MouseEvent) {
    this.sortNameResultUp = !this.sortNameResultUp;
  }

}
