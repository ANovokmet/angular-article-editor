import { Component, OnInit, Input } from '@angular/core';

import { ColumnConfig } from '../interfaces/config';

@Component({
	selector: 'aae-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss', '../../styles/shared.scss']
})
export class ColumnComponent implements OnInit {

	@Input() data: ColumnConfig;

	constructor() {
	}

	ngOnInit() {
	}
}
