import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export interface ToolMenuAction {
	id: string;
	title?: string;
	icon?: string;
}

@Component({
	selector: 'aae-tool-menu',
	templateUrl: './tool-menu.component.html',
	styleUrls: ['./tool-menu.component.scss', '../../styles/button.scss']
})
export class ToolMenuComponent implements OnInit {
	@Output() actionExecute = new EventEmitter<ToolMenuAction>();
	@Input() actions: ToolMenuAction[] = [];

	constructor() {
	}

	ngOnInit() {
	}

	onActionExecute(action) {
		this.actionExecute.emit(action);
	}
}
