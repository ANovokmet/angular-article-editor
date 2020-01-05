import { Component, OnInit, ViewContainerRef, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { ComponentFactoryService } from './component-factory.service';
import { TableComponent } from './table/table.component';
import { BaseComponent, LayoutComponent } from './base-component.interface';
import { ParagraphComponent } from './paragraph/paragraph.component';

@Component({
	selector: 'aae-angular-article-editor',
	templateUrl: './angular-article-editor.component.html',
	styleUrls: ['./angular-article-editor.component.scss', '../styles/button.scss']
})
export class AngularArticleEditorComponent implements OnInit {

	@Input() data: any;

	@ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	control: FormArray;
	onChange = new EventEmitter<any>();

	constructor(
		private factory: ComponentFactoryService,
		private fb: FormBuilder
	) {
		this.control = fb.array([]);
		this.control.valueChanges.subscribe(data => {
			console.log(data);
			this.onChange.next(data);
		});
	}

	ngOnInit() {
		this.factory.createAll([
			{
				key: 'title',
				data: 'This is a title'
			},
			{
				key: 'paragraph',
				data: `A long paragraph. A long paragraph. A long paragraph. A long paragraph. A
				long paragraph. A long paragraph. A long paragraph. A long paragraph.`
			},
			{
				key: 'table',
				data: [
					{
						key: 'column',
						data: [
							{
								key: 'title',
								data: 'Sub title'
							}
						]
					},
					{
						key: 'column',
						data: [
							{
								key: 'title',
								data: 'Sub title'
							}
						]
					}
				]
			}
		], this);
	}

	addParagraph() {
		// this.items.push({});
		const component = this.factory.add(ParagraphComponent, this.viewContainerRef, {
			control: new FormControl(),
			parent: this
		});
		this.control.push(component.instance.control);
	}

	addTitle() {
		const component = this.factory.add(ParagraphComponent, this.viewContainerRef, {
			type: 'title',
			control: this.fb.control(''),
			parent: this
		});
		this.control.push(component.instance.control);
	}

	addLayout() {
		console.log('Add Layout');
		const component = this.factory.add(TableComponent, this.viewContainerRef, {
			control: this.fb.array([
				this.fb.array([]), this.fb.array([])
			]),
			parent: this
		});
		this.control.push(component.instance.control);
	}
}
