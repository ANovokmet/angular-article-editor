import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularArticleEditorModule } from 'angular-article-editor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
		BrowserModule,
		AngularArticleEditorModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
