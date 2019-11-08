import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryService } from './component-factory.service';
import { GridComponent } from './layout/grid/grid.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-article-editor';
    items = [];

    @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	formGroup: FormGroup;

    constructor(private factory: ComponentFactoryService, fb: FormBuilder) {
		this.formGroup = fb.group({});
    }

    addParagraph() {
        // this.items.push({});
        this.factory.addParagraph(this.viewContainerRef);
    }

    addTitle() {
        this.factory.addParagraph(this.viewContainerRef, { type: 'title' });
    }

    addLayout() {
		console.log('Add Layout')
        this.factory.add(GridComponent, this.viewContainerRef);
    }
}
