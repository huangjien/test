import { NgModule } from '@angular/core';

export default class Utils {
    static getIcon(type: string): string {
        if (type === 'Case') {
            return 'next_week';
        }
        if (type === 'Suite') {
            return 'shop_two';
        }
        if (type === 'Data') {
            return 'library_books';
        }
        if (type === 'OUT') {
            return 'picture_in_picture';
        }
        if (type === 'Environment') {
            return 'computer';
        }
        if (type === 'Result') {
            return 'chrome_reader_mode';
        }
        if (type === 'Parameter') {
            return 'keyboard_arrow_left';
        }
        if (type === 'Return') {
            return 'keyboard_arrow_right';
        }
        if (type === 'Actions') {
            return 'call_to_action';
        }
        return 'assignment_late';
    }

    static uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = (Math.random() * 16) | 0,
                // tslint:disable-next-line:no-bitwise
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static anythingToJson(obj: any) {
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        if (typeof obj === 'string') {
            return obj;
        }
        return JSON.stringify(obj, null, 2);
    }
}
