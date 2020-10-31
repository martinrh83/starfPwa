import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private obj = new BehaviorSubject('-');
  sharedObj = this.obj.asObservable();

  constructor() { }

  nextObj(obj: string) {
    this.obj.next(obj)
  }
}
