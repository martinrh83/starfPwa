import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(itemName,objectData){
      localStorage.setItem(itemName,objectData);
  }
  
  getItem(itemName){
      return localStorage.getItem(itemName);
  }

  clearItem(itemName){
      localStorage.removeItem(itemName);
  }

  clearAll(){
      localStorage.clear();
  }

}
