import { Component, OnInit, ElementRef, EventEmitter, Output, Input, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { BaseComponent, LayoutComponent } from '../base-component.interface';
import { AngularArticleEditorService } from '../angular-article-editor.service';

interface ParagraphConfig {
	key: string;
	content: string;
}

@Component({
  selector: 'aae-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss', '../../styles/shared.scss']
})
export class ParagraphComponent implements OnInit, BaseComponent {

	@Input() parent: LayoutComponent;
	@Input() control: AbstractControl;
	@Output() configChanged = new EventEmitter<ParagraphConfig>();

	content = 'Insert text';
	type = 'paragraph';
	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));

	onChange: Observable<string>;

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef
	) {
	}

	set value(_value: string) {
		this.control.setValue(_value, { emitEvent: false });
	}

	ngOnInit() {
		this.control.valueChanges.subscribe(v => {
			console.log(v);
		});
		// this.control.setValue('Insert text', { emitEvent: false });
		this.onChange = this.control.valueChanges;
		this.control.valueChanges.subscribe((value: string) => {
			this.configChanged.emit(this.getData());
		});
	}

	getData() {
		return {
			key: this.type,
			content: this.control.value
		};
	}

	onFocus() {
		this.articleService.select(this);
		this.selected = true;
	}

	onBlur() {
		// this.articleService.deselect(this);
		this.selected = false;
	}
}
