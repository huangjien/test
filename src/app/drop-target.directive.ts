import { Output, EventEmitter, Input, HostListener, Directive, HostBinding } from '@angular/core';
import { DragService } from './drag-service';

export interface DropTargetOptions {
    item?: string;
}

@Directive({
    selector: '[appDropTarget]'
})

export class DropTargetDirective {
    private options: DropTargetOptions;

    constructor(private dragService: DragService) {

    }

    @Input()
    set appDropTarget(options: DropTargetOptions) {
        if (options) {
            this.options = options;
        }
    }

    @Output('appDrop') appDrop = new EventEmitter();

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        const { item = 'do not drop'} = this.options;
        // console.log('in drop-target:' + item);
        if (this.dragService.accepts(item)) {
            event.preventDefault();
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        const data = JSON.parse(event.dataTransfer.getData('Text'));
        this.appDrop.emit(data);
    }
}
