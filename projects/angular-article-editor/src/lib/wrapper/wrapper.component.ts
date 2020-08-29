import { Component, OnInit, Input, Type, OnChanges, SimpleChanges, HostListener, HostBinding } from '@angular/core';

import { ComponentCacheService } from '../component-cache.service';
import { ArticleComponentConfig } from '../interfaces/config';
import { AngularArticleEditorService } from '../angular-article-editor.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'aae-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss', '../../styles/shared.scss']
})
export class WrapperComponent implements OnInit, OnChanges {
	componentType: Type<any>;
	componentInstance: any;

	@Input() data: ArticleComponentConfig;
	@HostBinding('class.selected') selected: boolean;

	constructor(private cache: ComponentCacheService, private articleService: AngularArticleEditorService) {
		this.articleService.selectedItem$.pipe(map(i => i === this)).subscribe(s => this.selected = s);
	}

	ngOnChanges(changes: SimpleChanges) {
		const dataChange = changes.data;
		if (dataChange) {
			if (
				!dataChange.previousValue ||
				dataChange.currentValue &&
				dataChange.currentValue.key !== dataChange.previousValue.key
			) {
				this.componentType = this.cache.get(this.data.key);
			}
		}
	}

	ngOnInit() {
	}

	@HostListener('click', ['$event'])
	onClick(event) {
		event.stopPropagation();
		console.log(event);
		this.articleService.onSelected({
			event,
			component: this.componentInstance,
			container: this
		});
	}

	onComponentCreated(componentRef: any) {
		this.componentInstance = componentRef.instance;
	}
}
