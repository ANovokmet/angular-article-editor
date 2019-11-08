import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { GridComponent } from './layout/grid/grid.component';

@Injectable({
	providedIn: 'root'
})
export class ComponentFactoryService {

	constructor(private factoryResolver: ComponentFactoryResolver) { }

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
