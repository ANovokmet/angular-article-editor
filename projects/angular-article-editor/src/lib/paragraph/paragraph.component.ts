import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

interface ParagraphConfig {
	key: string;
	data: string;
}

@Component({
  selector: 'aae-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
	@Input() data: ParagraphConfig;

	content = 'Insert text';
	type = 'paragraph';

	onChange: Observable<string>;

	constructor() {
	}

	ngOnInit() {
	}
}
