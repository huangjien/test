import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
  styleUrls: ['./env.component.css']
})
export class EnvComponent implements OnInit,
AfterViewInit {
  displayedColumns = [
    'id',
    'type',
    'status',
    'name',
    'description',
    'action'
  ];
  dataSource: MatTableDataSource < EnvData >;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;
  constructor() {
    const fakeData: EnvData[] = [];
    for (let i = 0; i < 100; i++) {
      fakeData.push(this.createFakeData(i));
    }
    this.dataSource = new MatTableDataSource(fakeData);
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  more(id: string) {
    alert(id);
  }

  createFakeData(id: number) {

    return {
      id: id.toString(),
      type: Math.round(Math.random() * 10).toString(),
      status: Math.round(Math.random() * 100000).toString(),
      name: Math.round(Math.random() * 100000).toString(),
      description: Math.round(Math.random() * 10).toString()
    };
  }

}

export interface EnvData {
  id: string;
  type: string;
  status: string;
  name: string;
  description: string;
}
