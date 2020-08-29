import { Injectable, Type } from '@angular/core';

import { ParagraphComponent } from './paragraph/paragraph.component';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';
import { ImageComponent } from './image/image.component';

/**
 * Contains all the possible component types. All article component keys
 * need to be registered within the cache.
 */
@Injectable({
	providedIn: 'root'
})
export class ComponentCacheService {

	private componentCache: { [key: string]: Type<any> } = {};

	constructor() {
		this.register('title', ParagraphComponent);
		this.register('paragraph', ParagraphComponent);
		this.register('column', ColumnComponent);
		this.register('table', TableComponent);
		this.register('image', ImageComponent);
	}

	register(key: string, componentType: Type<any>) {
		this.componentCache[key] = componentType;
	}

	get(key: string) {
		if (!this.componentCache[key]) {
			console.error(`Component not registered for "${key}"`);
			return null;
		} else {
			return this.componentCache[key];
		}
	}
}
