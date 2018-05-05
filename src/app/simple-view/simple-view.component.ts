import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Utils from '../shared/utils';
import { DragService } from '../drag-service';
import { DraggableDirective } from '../draggable.directive';
import { DropTargetDirective } from '../drop-target.directive';
import { DataService } from '../data.service';
import { EventBusService } from '../event-bus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-simple-view',
  templateUrl: './simple-view.component.html',
  styleUrls: ['./simple-view.component.css']
})
export class SimpleViewComponent implements OnInit {

  @Output() isStatusChanged = new EventEmitter<boolean>();
  @Input() data;
  name: string;
  type: string;
  id: string;
  icon: string;
  description: string;
  panelOpenState = false;

  constructor(private router: Router, private eventBus: EventBusService) {
   }

  ngOnInit() {

    this.id = this.data['id'];
    this.name = this.data['name'];
    this.type = this.data['type'];
    this.description = this.data['description'];
    this.icon = Utils.getIcon(this.type);

  }

  edit() {
    this.isStatusChanged.emit(true);
    this.router.navigate([this.type, this.id]);
  }

  onDrop(data: any) {
    if (this.id === data['id']) {
      this.eventBus.showMessage('Cannot drop to itself');
    }
    // console.log('dropped: ' + JSON.stringify(data));
  }

  load() {
  //   this.globals.setContent(this.data);
  //   // this.globals.showMessage(this.id);
  //   this.globals.collapseSearchView();
  //   // console.log('id', this.id);
  }

}
