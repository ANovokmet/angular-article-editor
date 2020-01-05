import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';

import { ParagraphComponent } from './paragraph/paragraph.component';
import { LayoutComponent, BaseComponent } from './base-component.interface';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';
import { BaseLayoutComponent } from './base-layout.component';

type ComponentCreator = (data: ComponentConfig, layout: LayoutComponent) => BaseComponent;
type TypedComponentCreator<T> = (data: ComponentConfig, layout: LayoutComponent) => T;

interface ComponentConfig {
	key: string;
	data: any;
}

interface ParagraphConfig {
	key: string;
	data: string;
}

interface ColumnConfig {
	key: string;
	data: ComponentConfig[];
}

interface TableConfig {
	key: string;
	data: ColumnConfig[];
}

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {

	private componentCreatorMap: { [key: string]: ComponentCreator } = {};

	constructor(
		private factoryResolver: ComponentFactoryResolver,
		private fb: FormBuilder
	) {

		this.registerCreator('title', (config: ParagraphConfig, layout) => {
			const control = new FormControl(config.data);
			const component = this.add(ParagraphComponent, layout.viewContainerRef, {
				type: 'title',
				control,
				parent: layout
			});
			(layout.control as FormArray).push(control);
			return component.instance;
		});

		this.registerCreator('paragraph', (config: ParagraphConfig, layout) => {
			const control = new FormControl(config.data);
			const component = this.add(ParagraphComponent, layout.viewContainerRef, {
				type: 'paragraph',
				control,
				parent: layout
			});
			(layout.control as FormArray).push(control);
			return component.instance;
		});

		this.registerCreator('column', (config: ColumnConfig, layout) => {
			const formArray = this.fb.array([]);
			const component = this.add(ColumnComponent, layout.viewContainerRef, {
				control: formArray,
				parent: layout
			});
			(layout.control as FormArray).push(formArray);
			return component.instance;
		});

		this.registerCreator('table', (config: TableConfig, layout) => {
			const formArray = this.fb.array([]);
			const table = this.add(TableComponent, layout.viewContainerRef, {
				control: formArray,
				parent: layout
			});
			(layout.control as FormArray).push(formArray);

			config.data.forEach(columnConfig => {
				const column = this.create(columnConfig, table.instance);
				columnConfig.data.forEach(componentConfig => {
					this.create(componentConfig, column);
				});
			});

			return table.instance;
		});
	}

	registerCreator(key: string, creatorFn: ComponentCreator) {
		this.componentCreatorMap[key] = creatorFn;
	}

	create(config: ComponentConfig, layout: LayoutComponent) {
		if (!this.componentCreatorMap[config.key]) {
			console.error(`Component creator not registered for "${config.key}"`);
		} else {
			return this.componentCreatorMap[config.key](config, layout);
		}
	}

	createAll(config: ComponentConfig[], layout: LayoutComponent) {
		config.forEach(componentConfig => {
			this.create(componentConfig, layout);
		});
	}

	addParagraph(container: ViewContainerRef, props?: Partial<ParagraphComponent>) {
		const factory = this.factoryResolver.resolveComponentFactory(ParagraphComponent);
		const component = factory.create(container.parentInjector);
		Object.assign(component.instance, props);
		container.insert(component.hostView);
		return component.instance;
	}

	add<T>(componentType: Type<T>, container: ViewContainerRef, props?: Partial<T>) {
		const factory = this.factoryResolver.resolveComponentFactory(componentType);
		const component = container.createComponent(factory);
		Object.assign(component.instance, props);
		return component;
	}
}
