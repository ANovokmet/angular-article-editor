import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, Type, Input, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, AbstractControl, FormGroup, Form } from '@angular/forms';
import { Observable, config } from 'rxjs';

import { ComponentFactoryService } from 'src/app/component-factory.service';
import { ArticleService } from 'src/app/article.service';
import { ParagraphComponent } from 'src/app/paragraph/paragraph.component';
import { BaseLayoutComponent } from '../base-layout.component';

export interface ColumnConfig {
	key: string;
	data: string[];
}

@Component({
	selector: 'app-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss']
})
export class ColumnComponent extends BaseLayoutComponent implements OnInit {

	@ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));
	empty = true;

	constructor(
		factory: ComponentFactoryService,
		private articleService: ArticleService,
		public elementRef: ElementRef,
		private fb: FormBuilder
	) {
		super(factory, fb);
	}

	ngOnInit() {
		this.onChange = this.control.valueChanges;
	}


	addParagraph() {
		this.add(ParagraphComponent);
		this.empty = false;
	}

	addTitle() {
		this.add(ParagraphComponent, { type: 'title' });
		this.empty = false;
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
