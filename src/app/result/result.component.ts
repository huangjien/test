import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({selector: 'app-result', templateUrl: './result.component.html', styleUrls: ['./result.component.css']})
export class ResultComponent implements OnInit,
AfterViewInit {

  displayedColumns = [
    'id',
    'version',
    'start',
    'end',
    'duration',
    'status',
    'comment'
  ];
  dataSource: MatTableDataSource < ResultData >;

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;
  constructor() {
    const fakeData: ResultData[] = [];
    for (let i = 0; i < 100; i++) {
      fakeData.push(this.createFakeData(i));
    }
    this.dataSource = new MatTableDataSource(fakeData);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  createFakeData(id: number) {

    return {
      id: id.toString(),
      version: Math.round(Math.random() * 10).toString(),
      start: Math.round(Math.random() * 100000).toString(),
      end: Math.round(Math.random() * 100000).toString(),
      duration: Math.round(Math.random() * 10).toString(),
      status: Math.round(Math.random() * 5).toString(),
      comment: Math.round(Math.random() * 100000).toString()
    };
  }
}

export interface ResultData {
  id: string;
  version: string;
  start: string;
  end: string;
  duration: string;
  status: string;
  comment: string;
}
