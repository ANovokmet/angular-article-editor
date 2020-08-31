import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'sample-app';

	article = [
		// {
		// 	key: 'title',
		// 	data: 'This is a title'
		// },
		// {
		// 	key: 'paragraph',
		// 	data: `A long paragraph. A long paragraph. A long paragraph. A long paragraph. A
		// 	long paragraph. A long paragraph. A long paragraph. A long paragraph.`
		// },
		{
			key: 'table',
			data: [
				{
					key: 'column',
					data: [
						{
							key: 'title',
							data: 'Sub title'
						},
						{
							key: 'paragraph',
							data: 'Sub text'
						}
					]
				},
				{
					key: 'column',
					data: [
						{
							key: 'title',
							data: 'Sub title'
						}
					]
				}
			]
		},
		{
			key: 'image',
			src: 'assets/zagreb_night.jpg',
			alt: 'Zagreb at night'
		},
		{
			key: 'paragraph',
			data: 'Zagreb at night'
		}
	];

    constructor() {

	}

	log(data) {
		console.log(data);
	}
}
