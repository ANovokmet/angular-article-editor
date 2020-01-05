import { Component, OnInit, Input, Type, OnChanges, SimpleChanges } from '@angular/core';

import { ComponentCacheService } from '../component-cache.service';
import { ArticleComponentConfig } from '../interfaces/config';

@Component({
	selector: 'aae-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, OnChanges {
	componentType: Type<any>;

	@Input() data: ArticleComponentConfig;

	constructor(private cache: ComponentCacheService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const dataChange = changes.data;
		if (dataChange) {
			if (
				!dataChange.previousValue ||
				dataChange.currentValue &&
				dataChange.currentValue.key !== dataChange.previousValue.key
			) {
				this.componentType = this.cache.get(this.data.key);
			}
		}
	}

	ngOnInit() {
	}
}
