import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseComponent } from './base-component';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	public selectedItem: BaseComponent = null;
	public selectedItem$ = new BehaviorSubject<BaseComponent>(null);

	constructor() {
	}

	public select(item) {
		this.selectedItem = item;
		this.selectedItem$.next(item);
	}

	public deselect(item) {
		if (this.selectedItem === item) {
			this.selectedItem = null;
			this.selectedItem$.next(null);
		}
	}

}
