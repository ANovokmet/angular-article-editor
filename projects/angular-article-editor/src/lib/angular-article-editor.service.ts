import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WrapperComponent } from './wrapper/wrapper.component';

export interface ComponentSelectedData {
	event: MouseEvent;
	component: any;
	container: WrapperComponent;
	data: { key: string };
}

@Injectable({
	providedIn: 'root'
})
export class AngularArticleEditorService {

	constructor() {
	}

	public selectedItem: any = null;
	public selectedItem$ = new BehaviorSubject<any>(null);
	public selected$ = new BehaviorSubject<ComponentSelectedData>(null);
	selectedData: ComponentSelectedData;

	public cdkLists = [];

	public select(item) {
		console.log('selected', item);
		this.selectedItem = item;
		this.selectedItem$.next(item);
	}

	public deselect(item) {
		if (this.selectedItem === item) {
			this.selectedItem = null;
			this.selectedItem$.next(null);
			this.selected$.next(null);
			this.selectedData = null;
		}
	}

	public onSelected(data: ComponentSelectedData) {
		this.selectedItem = data.component;
		this.selectedItem$.next(data.container);
		this.selected$.next(data);
		this.selectedData = data;
	}

	public getSelectedData() {
		return this.selectedData;
	}

	public addCdkList(list) {
		this.cdkLists.push(list);
	}
}
