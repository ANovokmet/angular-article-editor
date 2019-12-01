import { Component, OnInit, ViewContainerRef, ViewChild, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ComponentFactoryService } from './component-factory.service';
import { TableComponent } from './table/table.component';

@Component({
	selector: 'aae-angular-article-editor',
	templateUrl: './angular-article-editor.component.html',
	styleUrls: ['./angular-article-editor.component.scss', '../styles/button.scss']
})
export class AngularArticleEditorComponent implements OnInit {

	@Input() data: any;

	@ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	formGroup: FormArray;
	onChange = new EventEmitter<any>();

	constructor(private factory: ComponentFactoryService, fb: FormBuilder) {
		this.formGroup = fb.array([]);
		this.formGroup.valueChanges.subscribe(data => {
			console.log(data);
			this.onChange.next(data);
		});
	}

	ngOnInit() {
	}

	addParagraph() {
		// this.items.push({});
		const component = this.factory.addParagraph(this.viewContainerRef);
		this.formGroup.push(component.control);
	}

	addTitle() {
		const component = this.factory.addParagraph(this.viewContainerRef, { type: 'title' });
		this.formGroup.push(component.control);
	}

	addLayout() {
		console.log('Add Layout');
		const component = this.factory.add(TableComponent, this.viewContainerRef);
		this.formGroup.push(component.instance.control);
	}
}
