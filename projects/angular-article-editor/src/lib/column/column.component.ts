import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

import { ColumnConfig } from '../interfaces/config';
import { CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularArticleEditorService } from '../angular-article-editor.service';

@Component({
	selector: 'aae-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss', '../../styles/shared.scss']
})
export class ColumnComponent implements OnInit, AfterViewInit {

	@Input() data: ColumnConfig;
	cdkDropLists: any[];
	@ViewChild('elementList') elementList: CdkDropList;

	constructor(private articleService: AngularArticleEditorService) {
		this.cdkDropLists = articleService.cdkLists;
	}

	ngAfterViewInit(): void {
		this.articleService.addCdkList(this.elementList);
	}

	ngOnInit() {
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
}
