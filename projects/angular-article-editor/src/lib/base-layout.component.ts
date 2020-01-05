import { AbstractControl, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ElementRef, ViewContainerRef, Type, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseComponent, LayoutComponent } from './base-component.interface';

export class BaseLayoutComponent implements BaseComponent {

	/** Layout this component is contained within */
	@Input() parent: LayoutComponent;
	@Input() control: AbstractControl;
	@Output() configChanged = new EventEmitter<any>();

	elementRef: ElementRef<HTMLElement>;
	viewContainerRef?: ViewContainerRef;
	onChange: Observable<any>;
	components: Array<BaseComponent> = [];

	constructor(fb: FormBuilder) {
	}

	get formArray() {
		return this.control as FormArray;
	}

	getData() {
		return {
			key: 'layout',
			data: this.components.map(c => c.getData())
		};
	}

	componentChanged(component: BaseComponent, data) {
		this.configChanged.emit(this.getData());
	}

	remove<T extends BaseComponent>(component: T) {
		const index = this.components.indexOf(component);
		if (index !== -1) {
			this.viewContainerRef.remove(index);
			this.components.splice(index, 1);
			this.formArray.removeAt(index);
		}
	}
}
