import { Component, OnInit, HostBinding, ElementRef, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { BaseLayoutComponent } from '../base-layout.component';
import { AngularArticleEditorService } from '../angular-article-editor.service';
import { ComponentFactoryService } from '../component-factory.service';

@Component({
  selector: 'aae-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../styles/shared.scss']
})
export class TableComponent extends BaseLayoutComponent implements OnInit {
	columns = [1, 2];
	selected = false;

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef,
		factory: ComponentFactoryService,
		fb: FormBuilder
	) {
		super(factory, fb);
		this.articleService.selectedItem$.pipe(map(i => i === this)).subscribe(s => {
			this.selected = s;
		});

		this.control = fb.array([]);
		this.formArray.push(fb.array([]));
		this.formArray.push(fb.array([]));

		this.control.valueChanges.subscribe(v => {
			console.log('GRID VAL', v);
		});

		this.configChanged.subscribe(v => {
			console.log('grid config', v);
		});
	}

	ngOnInit() {
		this.onChange = this.control.valueChanges;
	}

	@HostListener('click', ['$event'])
	onClick(e) {
		console.log(e);
		this.articleService.select(this);
		this.columns.push(5);
	}
}
