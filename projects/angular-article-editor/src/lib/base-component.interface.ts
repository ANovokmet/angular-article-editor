import { ElementRef, ViewContainerRef, EventEmitter } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

export interface BaseComponent {
	elementRef: ElementRef<HTMLElement>;
	viewContainerRef?: ViewContainerRef;
	control: AbstractControl;
	configChanged: EventEmitter<any>;
	getData?();
}
