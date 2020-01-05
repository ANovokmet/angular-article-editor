import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { BrowserModule } from '@angular/platform-browser';

import { AngularArticleEditorComponent } from './angular-article-editor.component';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';
import { ComponentOutletDirective } from './directives/component-outlet.directive';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ImageComponent } from './image/image.component';

@NgModule({
	declarations: [
		AngularArticleEditorComponent,
		TableComponent,
		ColumnComponent,
		ParagraphComponent,
		ToolMenuComponent,
		ComponentOutletDirective,
		WrapperComponent,
		ImageComponent
	],
	imports: [
		BrowserModule,
		ContenteditableModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [AngularArticleEditorComponent],
	entryComponents: [
		ParagraphComponent,
		TableComponent,
		ColumnComponent,
		ImageComponent
	]
})
export class AngularArticleEditorModule { }
