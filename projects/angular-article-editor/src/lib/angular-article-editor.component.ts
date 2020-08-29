import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { ArticleConfig, ArticleComponentConfig } from './interfaces/config';
import { ToolMenuAction } from './tool-menu/tool-menu.component';
import { AngularArticleEditorService } from './angular-article-editor.service';

type ActionCallback = (component, action?: ToolMenuAction) => void;

@Component({
	selector: 'aae-angular-article-editor',
	templateUrl: './angular-article-editor.component.html',
	styleUrls: ['./angular-article-editor.component.scss', '../styles/button.scss']
})
export class AngularArticleEditorComponent implements OnInit {

	@Input() data: ArticleConfig;
	change = new EventEmitter<any>();
	actionMap: Map<string, ActionCallback> = new Map;

	toolMenuLeft: string;
	toolMenuTop: string;
	toolMenuShow: boolean;

	actions: ToolMenuAction[] = [
		{ id: 'add-paragraph', title: 'Add paragraph', icon: 'notes' },
		{ id: 'add-title', title: 'Add title', icon: 'title' },
		{ id: 'remove', title: 'Remove', icon: 'remove' }
	];

	constructor(
		private articleService: AngularArticleEditorService
	) {
		articleService.selected$.subscribe(data => {
			if (data) {
				const element = data.event.target as HTMLElement;
				this.toolMenuLeft = element.offsetLeft + 'px';
				this.toolMenuTop = element.offsetTop + 'px';
				this.toolMenuShow = true;
			} else {
				this.toolMenuShow = false;
			}
		});

		this.actionMap.set('add-paragraph', (component) => this.addParagraphAt(component));
		this.actionMap.set('add-title', (component) => this.addTitleAt(component));
		this.actionMap.set('remove', (component) => this.remove(component));
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

	onActionExecute(action: ToolMenuAction) {
		const { component } = this.articleService.getSelectedData();
		const callback = this.actionMap.get(action.id);
		if (callback) {
			callback(component, action);
		} else {
			throw Error(`No callback registered for action ${action.id}`);
		}
	}

	addParagraphAt(component) {
		const config = {
			key: 'paragraph',
			data: 'Insert text'
		};
		const targetConfig = component.data;
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
			const result = this.findParent(targetConfig, this.data);
			if (result) {
				result.parent.splice(result.index + 1, 0, config);
			}
		}
	}

	addTitleAt(component) {
		const config = {
			key: 'title',
			data: 'Insert text'
		};
		const targetConfig = component.data;
		this.insertOrInsertBehind(config, targetConfig);
	}

	remove(component) {
		const targetConfig = component.data;
		const result = this.findParent(targetConfig, this.data);
		if (result) {
			result.parent.splice(result.index, 1);
			this.articleService.deselect(component);
		}
	}
}
