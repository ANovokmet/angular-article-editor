import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularArticleEditorService } from '../angular-article-editor.service';
import { TableConfig } from '../interfaces/config';

@Component({
  selector: 'aae-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../styles/shared.scss']
})
export class TableComponent implements OnInit {

	@Input() data: TableConfig;
	selected = false;

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef
	) {
		this.articleService.selectedItem$.pipe(map(i => i === this)).subscribe(s => {
			this.selected = s;
		});
	}

	@HostListener('click', ['$event'])
	onClick(e) {
		console.log(e);
		this.articleService.select(this);
	}

	ngOnInit() {
	}

	onComponentChanged(a) {
		console.log('a', a);
	}

}
