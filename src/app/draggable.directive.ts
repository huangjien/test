import {Input, HostListener, Directive, HostBinding} from '@angular/core';
import {DragService} from './drag-service';

export interface DraggableOptions {
    item?: string;
    data?: any;
}

@Directive({selector: '[appDraggable]'})
export class DraggableDirective {
    constructor(private dragService: DragService) {}

    @HostBinding('draggable')
    get draggable() {
        return true;
    }

    @Input()
    set appDraggable(options: DraggableOptions) {
        if (options) {
            this.options = options;
        }
    }

    private options: DraggableOptions = {};

    @HostListener('dragstart', ['$event'])
    onDragStart(event) {
        const {
            item = 'do not drag',
            data = {}
        } = this.options;

        this.dragService.startDrag(item);

        console.log(JSON.stringify(data));
        event.dataTransfer.setData('Text', JSON.stringify(data));
    }
}
