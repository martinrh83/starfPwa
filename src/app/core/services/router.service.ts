import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel, GuardsCheckStart, ActivationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  private cancelUrl: string = undefined;
  private activationStart: string = undefined;
  private guardsCheck: string = undefined;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
      if (event instanceof NavigationCancel){
        this.cancelUrl = event.url;
      }
      if (event instanceof GuardsCheckStart){
        this.guardsCheck = event.url;
      }
      if (event instanceof ActivationStart){
        let obj: any = event.snapshot;
        this.activationStart = obj._routerState.url;
      }
    });
  }
  public getActivationStartUrl(){
    return this.activationStart;
  }
  public getPreviousUrl() {
    return this.previousUrl;
  }
  public getCurrentUrl() {
    return this.currentUrl;
  }
  public getCancelUrl(){
    return this.cancelUrl;
  }
  public clearCancelUrl(){
    this.cancelUrl = undefined;
  }
  public setCancelUrl(url){
    this.cancelUrl = url;
  }
  public setGuardsCheck(url){
    this.guardsCheck = url;
  }
  public getGuardsCheck(){
    return this.guardsCheck;
  }
  public clearGuardsCheck(){
    this.guardsCheck = undefined;
  }
}
