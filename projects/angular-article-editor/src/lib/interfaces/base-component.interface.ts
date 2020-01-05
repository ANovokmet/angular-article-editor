import { ElementRef, ViewContainerRef, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface BaseComponent {
	elementRef: ElementRef<HTMLElement>;
	viewContainerRef?: ViewContainerRef;
	control: AbstractControl;
	configChanged: EventEmitter<any>;
	parent: LayoutComponent;
	getData?();
}

export interface LayoutComponent {
	viewContainerRef?: ViewContainerRef;
	control: AbstractControl;
}
