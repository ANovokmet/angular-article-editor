import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';

import { AngularArticleEditorService } from '../angular-article-editor.service';
import { ColumnComponent } from '../column/column.component';
import { ComponentFactoryService } from '../component-factory.service';
import { Subscription } from 'rxjs';

const TOOL_MENU_TOP_OFFSET = -15;
const TOOL_MENU_LEFT_OFFSET = 0;

@Component({
	selector: 'aae-tool-menu',
	templateUrl: './tool-menu.component.html',
	styleUrls: ['./tool-menu.component.scss', '../../styles/button.scss']
})
export class ToolMenuComponent implements OnInit, OnDestroy {

	@HostBinding('style.left.px') left = 10;
	@HostBinding('style.top.px') top = 10;
	show = false;
	positionSub: Subscription;

	constructor(
		private factory: ComponentFactoryService,
		private articleService: AngularArticleEditorService,
		private elementRef: ElementRef<HTMLElement>
	) {
		this.positionSub = articleService.selectedItem$.subscribe(component => {
			if (component && component.elementRef && component.elementRef.nativeElement) {
				const left = component.elementRef.nativeElement.offsetLeft;
				const top = component.elementRef.nativeElement.offsetTop;
				console.log(left, top);
				this.left = Math.floor(left) + TOOL_MENU_LEFT_OFFSET;
				this.top = Math.floor(top) + TOOL_MENU_TOP_OFFSET;
			}

			this.show = !!component;
		});
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.positionSub.unsubscribe();
	}

	addParagraph() {
		const component = this.articleService.selectedItem;
		if (component) {
			(component as ColumnComponent).addParagraph();
		}
	}

	addTitle() {
		const component = this.articleService.selectedItem;
		if (component) {
			(component as ColumnComponent).addTitle();
		}
	}

}
