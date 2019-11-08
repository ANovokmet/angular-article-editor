import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';

import { AppComponent } from './app.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ColumnComponent } from './layout/column/column.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';
import { GridComponent } from './layout/grid/grid.component';

@NgModule({
    declarations: [
        AppComponent,
        ParagraphComponent,
        ColumnComponent,
        ToolMenuComponent,
        GridComponent
    ],
    imports: [
        ContenteditableModule,
		FormsModule,
		ReactiveFormsModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ParagraphComponent, GridComponent]
})
export class AppModule { }
