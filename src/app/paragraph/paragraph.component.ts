import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { ArticleService } from '../article.service';
import { BaseComponent } from '../base-component';
import { Observable } from 'rxjs';

interface ParagraphConfig {
	key: string;
	content: string;
}

@Component({
	selector: 'app-paragraph',
	templateUrl: './paragraph.component.html',
	styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit, BaseComponent {

	public control = new FormControl();
	content = 'penis';
	type = 'paragraph';
	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));

	onChange: Observable<string>;

	@Output() configChanged = new EventEmitter<ParagraphConfig>();

	constructor(private articleService: ArticleService, public elementRef: ElementRef) {
		this.control.valueChanges.subscribe(v => {
			console.log(v);
		});
	}

	set value(_value: string) {
		this.control.setValue(_value, { emitEvent: false });
	}

	ngOnInit() {
		this.control.setValue('penis 2', { emitEvent: false });
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
