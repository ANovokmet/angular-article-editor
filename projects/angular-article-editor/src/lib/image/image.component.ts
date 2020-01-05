import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';

import { ImageConfig } from '../interfaces/config';
import { AngularArticleEditorService } from '../angular-article-editor.service';

@Component({
	selector: 'aae-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss', '../../styles/shared.scss']
})
export class ImageComponent implements OnInit {
	selected: boolean;

	@Input() data: ImageConfig;

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef
	) {
		this.articleService.selectedItem$.pipe(map(i => i === this)).subscribe(s => {
			this.selected = s;
		});
	}

	ngOnInit() {
	}

	onFocus() {
		this.articleService.select(this);
		this.selected = true;
	}
}
