import { Injectable } from '@angular/core';
import { BaseComponent } from './interfaces/base-component.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularArticleEditorService {

  public selectedItem: any = null;
  public selectedItem$ = new BehaviorSubject<any>(null);

  constructor() {
  }

  public select(item) {
	  this.selectedItem = item;
	  this.selectedItem$.next(item);
  }

  public deselect(item) {
	  if (this.selectedItem === item) {
		  this.selectedItem = null;
		  this.selectedItem$.next(null);
	  }
  }
}
