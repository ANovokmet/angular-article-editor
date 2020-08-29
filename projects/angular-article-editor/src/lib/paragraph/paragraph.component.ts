import { Component, OnInit, ElementRef, EventEmitter, Output, Input, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { LayoutComponent } from '../interfaces/base-component.interface';

interface ParagraphConfig {
	key: string;
	data: string;
}

@Component({
  selector: 'aae-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

	@Input() parent: LayoutComponent;
	@Input() control: AbstractControl;
	@Output() configChanged = new EventEmitter<ParagraphConfig>();
	@Input() data: ParagraphConfig;

	content = 'Insert text';
	type = 'paragraph';

	onChange: Observable<string>;

	constructor() {
	}

	ngOnInit() {
	}

	getData() {
		return {
			key: this.type,
			content: this.control.value
		};
	}
}
