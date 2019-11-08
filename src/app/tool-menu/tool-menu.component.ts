import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding } from '@angular/core';
import { ComponentFactoryService } from '../component-factory.service';
import { ArticleService } from '../article.service';
import { ColumnComponent } from '../layout/column/column.component';

@Component({
	selector: 'app-tool-menu',
	templateUrl: './tool-menu.component.html',
	styleUrls: ['./tool-menu.component.scss']
})
export class ToolMenuComponent implements OnInit {

	@HostBinding('style.left.px') left = 10;
	@HostBinding('style.top.px') top = 10;


	constructor(
		private factory: ComponentFactoryService,
		private articleService: ArticleService,
		private elementRef: ElementRef<HTMLElement>
	) {
		articleService.selectedItem$.subscribe(component => {
			if (component && component.elementRef && component.elementRef.nativeElement) {
				const { left, top } = component.elementRef.nativeElement.getBoundingClientRect();
				console.log( left, top );
				this.left = Math.floor(left);
				this.top = Math.floor(top) - 15;
			}
		});
	}

	ngOnInit() {
	}


	addParagraph() {
		const component = this.articleService.selectedItem;
		(component as ColumnComponent).addParagraph();
	}

	addTitle() {
		const component = this.articleService.selectedItem;
		(component as ColumnComponent).addTitle();
	}

}
