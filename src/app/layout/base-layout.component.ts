import { AbstractControl, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ElementRef, ViewContainerRef, Type, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentFactoryService } from '../component-factory.service';
import { BaseComponent } from '../base-component';

export class BaseLayoutComponent implements BaseComponent {

	@Input() control: AbstractControl;
	@Output() configChanged = new EventEmitter<any>();

	elementRef: ElementRef<HTMLElement>;
	viewContainerRef?: ViewContainerRef;
	factory: ComponentFactoryService;
	onChange: Observable<any>;
	components: Array<BaseComponent> = [];

	constructor(factory: ComponentFactoryService, fb: FormBuilder) {
		this.factory = factory;
	}

	get formArray() {
		return this.control as FormArray;
	}

	add<T extends BaseComponent>(componentType: Type<T>, props?: Partial<T>) {
		const component = this.factory.add(componentType, this.viewContainerRef, props);
		this.components.push(component.instance);
		this.formArray.push(component.instance.control);
		component.instance.configChanged.subscribe(data => {
			console.log('config changed', data);
			this.componentChanged(component.instance, data);
		});
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
