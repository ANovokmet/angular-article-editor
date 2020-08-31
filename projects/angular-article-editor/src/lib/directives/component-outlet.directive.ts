import {
	Directive, OnChanges, OnDestroy, Injector, Type, NgModuleFactory,
	ViewContainerRef, NgModuleRef, ComponentRef, Input, SimpleChanges, ComponentFactoryResolver, Output, EventEmitter
} from '@angular/core';

/**
 * Works just like ngComponentOutlet with an aditional data input.
 */
@Directive({
	selector: '[aaeComponentOutlet]'
})
export class ComponentOutletDirective implements OnChanges, OnDestroy {
	@Input() aaeComponentOutlet: Type<any>;
	@Input() ngComponentOutletInjector: Injector;
	@Input() ngComponentOutletContent: any[][];
	@Input() ngComponentOutletNgModuleFactory: NgModuleFactory<any>;

	@Input() data: any;

	@Output() componentCreated = new EventEmitter<ComponentRef<any>>();

	private _componentRef: ComponentRef<any> = null;
	private _moduleRef: NgModuleRef<any> = null;

	constructor(private _viewContainerRef: ViewContainerRef) { }

	ngOnChanges(changes: SimpleChanges) {
		if (this._componentRef) {
			this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
		}
		this._viewContainerRef.clear();
		this._componentRef = null;

		if (this.aaeComponentOutlet) {
			let injector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;

			if ((changes as any).ngComponentOutletNgModuleFactory) {
				if (this._moduleRef) { this._moduleRef.destroy(); }
				if (this.ngComponentOutletNgModuleFactory) {
					this._moduleRef = this.ngComponentOutletNgModuleFactory.create(injector);
				} else {
					this._moduleRef = null;
				}
			}
			if (this._moduleRef) {
				injector = this._moduleRef.injector;
			}

			const componentFactory =
				injector.get(ComponentFactoryResolver).resolveComponentFactory(this.aaeComponentOutlet);

			this._componentRef = this._viewContainerRef.createComponent(
				componentFactory, this._viewContainerRef.length, injector, this.ngComponentOutletContent);
			this.componentCreated.emit(this._componentRef);
		}

		if (this._componentRef) {
			(this._componentRef.instance as any).data = this.data;
		}
	}
	ngOnDestroy() {
		if (this._moduleRef) { this._moduleRef.destroy(); }
	}
}
