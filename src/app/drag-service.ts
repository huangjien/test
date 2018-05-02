import { Injectable } from '@angular/core';

@Injectable()
export class DragService {

    private source: string;

    startDrag(source: string) {
        this.source = source;
    }

    accepts(target: string): boolean {
        return this.acceptDrop(this.source, target);
    }

    acceptDrop(source: string, target: string) {
        // console.log('source: ' + source + ' target: ' + target );
        if (target === 'Data') {
            return source === 'Data';
        }
        if (target === 'Case') {
            return source === 'Data' || source === 'Case';
        }
        return false;
    }

}
