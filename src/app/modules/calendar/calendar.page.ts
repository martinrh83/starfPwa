import { Component } from '@angular/core';
import { SharedService } from './../../core/services/user/shared.service';
import * as moment from 'moment';
moment.locale('es-AR');
moment.weekdays(true);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  public date = moment();
  public daysArr;
  asistencias:any;

  constructor(private _sharedService: SharedService) { 
    this.daysArr = this.createCalendar(this.date);
    this._sharedService.sharedObj.subscribe(obj => {
      this.asistencias = obj['values'];
      console.log(this.asistencias)
    }); 
  }

  createCalendar(month){
    let firstDay = moment(month).startOf("M");
    let days = Array.apply(null,{length:month.daysInMonth()}).map(Number.call, Number)
    .map(((n)=>{
      return moment(firstDay).add(n,'d');
    }))
    for(let n=0; n < firstDay.weekday();n++){
      days.unshift(null);
    }
    return days;
  }

  nextMonth(){
    this.date.add(1,'M');
    this.daysArr =this.createCalendar(this.date);
  }

  previousMonth(){
    this.date.subtract(1,'M');
    this.daysArr =this.createCalendar(this.date);
  }

  setPresente(day){
    if(this.asistencias.length > 0){
      for (let i=0; i < this.asistencias.length ; i++) {
        if(moment(this.asistencias[i].registeredAt).isSame(day, 'day')) return true;
      }
    }
  }
}
