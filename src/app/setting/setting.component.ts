import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit,
AfterViewInit  {

  displayedColumns = [
    'id',
    'type',
    'value',
    'name',
    'description',
    'category',
    'action'
  ];
  dataSource: MatTableDataSource < SettingsData >;

  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;
  constructor() {
    const fakeData: SettingsData[] = [];
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

  edit(id: string) {
    alert(id);
  }

  createFakeData(id: number) {

    return {
      id: id.toString(),
      type: Math.round(Math.random() * 10).toString(),
      value: Math.round(Math.random() * 100000).toString(),
      name: Math.round(Math.random() * 100000).toString(),
      description: Math.round(Math.random() * 10).toString(),
      category: Math.round(Math.random() * 100000).toString()
    };
  }
}

export interface SettingsData {
  id: string;
  type: string;
  value: string;
  name: string;
  description: string;
  category: string;
}
