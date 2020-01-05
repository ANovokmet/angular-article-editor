import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularArticleEditorService } from '../angular-article-editor.service';
import { ColumnConfig } from '../interfaces/config';

@Component({
	selector: 'aae-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss', '../../styles/shared.scss']
})
export class ColumnComponent implements OnInit {

	@Input() data: ColumnConfig;

	selected: boolean;
	selected$ = this.articleService.selectedItem$.pipe(map(i => i === this));

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef
	) {

	}

	ngOnInit() {
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
