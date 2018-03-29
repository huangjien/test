import { Component, OnInit, Input } from '@angular/core';
import Utils from '../shared/utils';

@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  styleUrls: ['./simple-view.component.css']
})
export class SimpleViewComponent implements OnInit {

  @Input() data;
  name: string;
  type: string;
  id: string;
  icon: string;
  description: string;
  panelOpenState = false;

  constructor() {
   }

  ngOnInit() {
    this.id = this.data['id'];
    this.name = this.data['name'];
    this.type = this.data['type'];
    this.description = this.data['description'];
    this.icon = Utils.getIcon(this.type);
  }

  // load() {
  //   this.globals.setContent(this.data);
  //   // this.globals.showMessage(this.id);
  //   this.globals.collapseSearchView();
  //   // console.log('id', this.id);
  // }

}