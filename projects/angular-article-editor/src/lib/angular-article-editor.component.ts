import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef, forwardRef, Provider, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';

import { ArticleConfig, ArticleComponentConfig } from './interfaces/config';
import { ToolMenuAction } from './tool-menu/tool-menu.component';
import { AngularArticleEditorService } from './angular-article-editor.service';

type ActionCallback = (component, action?: ToolMenuAction) => void;
const CONTROL_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => AngularArticleEditorComponent),
	multi: true
};

@Component({
	selector: 'aae-angular-article-editor',
	templateUrl: './angular-article-editor.component.html',
	styleUrls: ['./angular-article-editor.component.scss', '../styles/button.scss'],
	providers: [CONTROL_VALUE_ACCESSOR]
})
export class AngularArticleEditorComponent implements OnInit, ControlValueAccessor {
	cdkDropLists: any[];

	constructor(
		private articleService: AngularArticleEditorService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		articleService.selected$.subscribe(data => {
			if (data) {
				const element = data.event.target as HTMLElement;
				const childPos = element.getBoundingClientRect();
				const parentPos = this.articleContainer.nativeElement.getBoundingClientRect();

				this.toolMenuLeft = childPos.left - parentPos.left + 'px';
				this.toolMenuTop = childPos.top - parentPos.top + 'px';

				this.toolMenuShow = true;
			} else {
				this.toolMenuShow = false;
			}
		});
		this.cdkDropLists = articleService.cdkLists;

		this.actionMap.set('add-paragraph', (component) => this.addParagraphAt(component));
		this.actionMap.set('add-title', (component) => this.addTitleAt(component));
		this.actionMap.set('remove', (component) => this.remove(component));
	}

	@Input() data: ArticleConfig;
	@Input() disabled: boolean;
	@Input() actions: ToolMenuAction[] = [
		{ id: 'add-paragraph', title: 'Add paragraph', icon: 'notes' },
		{ id: 'add-title', title: 'Add title', icon: 'title' },
		{ id: 'remove', title: 'Remove', icon: 'remove' }
	];

	actionMap: Map<string, ActionCallback> = new Map();

	toolMenuLeft: string;
	toolMenuTop: string;
	toolMenuShow: boolean;

	onChangeCallback: () => any;
	onTouchedCallback: () => any;

	@ViewChild('articleList', { static: true }) articleList: CdkDropList;
	@ViewChild('articleContainer', { static: true }) articleContainer: ElementRef;

	writeValue(obj: any): void {
		this.data = obj;
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = () => fn(this.data);
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = () => fn(this.data);
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	drop(event: CdkDragDrop<any[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}

	ngOnInit() {
		this.articleService.addCdkList(this.articleList);
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

	private handleDataChange(): void {
		this.changeDetectorRef.markForCheck();
		if (this.onChangeCallback) {
			this.onChangeCallback();
		}
	}

	private handleTouched() {
		if (this.onTouchedCallback) {
			this.onTouchedCallback();
		}
	}
}
