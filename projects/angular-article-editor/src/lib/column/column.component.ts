import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, Type, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, AbstractControl, FormGroup, Form } from '@angular/forms';
import { Observable, config } from 'rxjs';

import { BaseLayoutComponent } from '../base-layout.component';
import { AngularArticleEditorService } from '../angular-article-editor.service';
import { ParagraphComponent } from '../paragraph/paragraph.component';

export interface ColumnConfig {
	key: string;
	data: string[];
}

@Component({
	selector: 'aae-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss', '../../styles/shared.scss']
})
export class ColumnComponent extends BaseLayoutComponent implements OnInit {

	@ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef,
		private fb: FormBuilder
	) {
		super(fb);
	}

	ngOnInit() {
		this.onChange = this.control.valueChanges;
	}

	onFocus() {
		console.log(this);
		this.articleService.select(this);
		this.selected = true;
	}

	onBlur() {
		console.log('blurred', this);
		this.articleService.deselect(this);
		this.selected = false;
	}
}
