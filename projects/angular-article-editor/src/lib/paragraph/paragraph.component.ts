import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { BaseComponent } from '../base-component.interface';
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

	public control = new FormControl();
	content = 'Insert text';
	type = 'paragraph';
	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));

	onChange: Observable<string>;

	@Output() configChanged = new EventEmitter<ParagraphConfig>();

	constructor(private articleService: AngularArticleEditorService, public elementRef: ElementRef) {
		this.control.valueChanges.subscribe(v => {
			console.log(v);
		});
	}

	set value(_value: string) {
		this.control.setValue(_value, { emitEvent: false });
	}

	ngOnInit() {
		this.control.setValue('Insert text', { emitEvent: false });
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
		this.articleService.deselect(this);
		this.selected = false;
	}
}
