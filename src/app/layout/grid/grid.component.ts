import { Component, OnInit, HostBinding, ElementRef, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ArticleService } from 'src/app/article.service';
import { ComponentFactoryService } from 'src/app/component-factory.service';
import { BaseLayoutComponent } from '../base-layout.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends BaseLayoutComponent implements OnInit {
	columns = [1, 2];
	@HostBinding('class.selected') selected = false;
	@HostBinding('class.item') isItem = true;

	constructor(
		private articleService: ArticleService,
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
