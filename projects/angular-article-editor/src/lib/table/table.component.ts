import { Component, OnInit, Input } from '@angular/core';

import { TableConfig } from '../interfaces/config';

@Component({
  selector: 'aae-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

	@Input() data: TableConfig;
	selected = false;

	constructor() {
	}

	ngOnInit() {
	}

	onComponentChanged(a) {
		console.log('a', a);
	}

}
