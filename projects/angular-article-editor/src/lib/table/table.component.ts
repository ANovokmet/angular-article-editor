import { Component, OnInit, HostBinding, ElementRef, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

import { BaseLayoutComponent } from '../base-layout.component';
import { AngularArticleEditorService } from '../angular-article-editor.service';

@Component({
  selector: 'aae-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../../styles/shared.scss']
})
export class TableComponent extends BaseLayoutComponent implements OnInit {

	selected = false;

	constructor(
		private articleService: AngularArticleEditorService,
		public elementRef: ElementRef,
		private fb: FormBuilder
	) {
		super(fb);
		this.articleService.selectedItem$.pipe(map(i => i === this)).subscribe(s => {
			this.selected = s;
		});
	}

	ngOnInit() {
		this.onChange = this.control.valueChanges;

		this.control.valueChanges.subscribe(v => {
			console.log('GRID VAL', v);
		});

		this.configChanged.subscribe(v => {
			console.log('grid config', v);
		});
	}

	@HostListener('click', ['$event'])
	onClick(e) {
		console.log(e);
		this.articleService.select(this);
	}
}
