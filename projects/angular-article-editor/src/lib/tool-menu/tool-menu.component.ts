import { Component, OnInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { AngularArticleEditorService } from '../angular-article-editor.service';
import { BaseComponent } from '../interfaces/base-component.interface';
import { ArticleComponentConfig } from '../interfaces/config';

const TOOL_MENU_TOP_OFFSET = -15;
const TOOL_MENU_LEFT_OFFSET = 0;

@Component({
	selector: 'aae-tool-menu',
	templateUrl: './tool-menu.component.html',
	styleUrls: ['./tool-menu.component.scss', '../../styles/button.scss']
})
export class ToolMenuComponent implements OnInit, OnDestroy {

	@Input() article: Array<ArticleComponentConfig>;

	@HostBinding('style.left.px') left = 10;
	@HostBinding('style.top.px') top = 10;
	show = false;
	positionSub: Subscription;
	selectedComponent: BaseComponent;

	constructor(
		articleService: AngularArticleEditorService
	) {
		this.positionSub = articleService.selectedItem$.subscribe(component => {
			if (component && component.elementRef && component.elementRef.nativeElement) {
				const left = component.elementRef.nativeElement.offsetLeft;
				const top = component.elementRef.nativeElement.offsetTop;
				console.log(left, top);
				this.left = Math.floor(left) + TOOL_MENU_LEFT_OFFSET;
				this.top = Math.floor(top) + TOOL_MENU_TOP_OFFSET;
			}
			this.selectedComponent = component;
			console.log('selected', component);
			this.show = !!component;
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.positionSub.unsubscribe();
	}

	addParagraph() {
		const config = {
			key: 'paragraph',
			data: 'Insert text'
		};
		const targetConfig = (this.selectedComponent as any).data;
		this.insertOrInsertBehind(config, targetConfig);
	}

	findParent(target: ArticleComponentConfig, article: Array<ArticleComponentConfig>) {
		for (let i = 0; i < article.length; i++) {
			const item = article[i];
			if (item === target) {
				return {
					parent: article,
					index: i
				};
			}

			if (Array.isArray(item.data)) {
				const found = this.findParent(target, item.data);
				if (found) {
					return found;
				}
			}
		}
	}

	insertOrInsertBehind(config, targetConfig) {
		if (Array.isArray(targetConfig)) {
			targetConfig.push(config);
		} else {
			const result = this.findParent(targetConfig, this.article);
			if (result) {
				result.parent.splice(result.index + 1, 0, config);
			}
		}
	}

	addTitle() {
		const config = {
			key: 'title',
			data: 'Insert text'
		};
		const targetConfig = (this.selectedComponent as any).data;
		this.insertOrInsertBehind(config, targetConfig);
	}

	remove() {
		const targetConfig = (this.selectedComponent as any).data;
		const result = this.findParent(targetConfig, this.article);
		if (result) {
			result.parent.splice(result.index, 1);
		}
	}
}
