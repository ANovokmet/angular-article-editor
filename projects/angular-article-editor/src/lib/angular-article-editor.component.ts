import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { ArticleConfig } from './interfaces/config';

@Component({
	selector: 'aae-angular-article-editor',
	templateUrl: './angular-article-editor.component.html',
	styleUrls: ['./angular-article-editor.component.scss', '../styles/button.scss']
})
export class AngularArticleEditorComponent implements OnInit {

	@Input() data: ArticleConfig;
	change = new EventEmitter<any>();

	constructor(
	) {
	}

	ngOnInit() {
	}

	addParagraph() {
		this.data.push({
			key: 'paragraph',
			data: 'Enter text...'
		});
	}

	addTitle() {
		this.data.push({
			key: 'title',
			data: 'Enter text...'
		});
	}

	addLayout() {
		console.log('Add Layout');
		this.data.push({
			key: 'table',
			data: [
				{
					key: 'column',
					data: []
				}, {
					key: 'column',
					data: []
				}
			]
		});
	}
}
