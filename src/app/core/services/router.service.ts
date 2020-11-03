import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, GuardsCheckStart, ActivationStart } from '@angular/router';
import { LoaderService } from './../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  private cancelUrl: string = undefined;
  private activationStart: string = undefined;
  private guardsCheck: string = undefined;
  constructor(private router: Router, private loader: LoaderService) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.showLoader();
      } else if (event instanceof NavigationEnd) {
        this.loader.hideLoader();
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
      /*if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }*/
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
