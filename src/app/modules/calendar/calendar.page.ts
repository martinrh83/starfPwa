import { Component } from '@angular/core';
import { SharedService } from './../../core/services/user/shared.service';
import { AuthService } from './../../core/services/user/auth.service';
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
  percentage: any;
  bar: any;
  barColor: any;
  constructor(private _sharedService: SharedService, private _authService: AuthService, ) { 
    this.daysArr = this.createCalendar(this.date);
    this._sharedService.sharedObj.subscribe(obj => {
      this.asistencias = obj['values'];
      let attendancesSorted = this.asistencias.sort((d1, d2) => new Date(d1.createdAt).getTime() - new Date(d2.createdAt).getTime());
      let lastAttendance = attendancesSorted[attendancesSorted.length - 1]
      //console.log(lastAttendance);
      this.percentage = lastAttendance.percentageCompleted;
      this.bar = this.percentage / 100;
      if(this.percentage >= 75){
        this.barColor = "success";
      }else{
        this.barColor = "danger";
      }
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

  /*setHoliday(day){
    const year = new Date().getFullYear();
    this._authService.getHolidays(year).subscribe((result)=>{
      let array = JSON.parse(JSON.stringify(result));
      for (let i=0; i < array.length ; i++) {
        let holiday = new Date(`${array[i].dia}/${array[i].mes}/${year}`);
        if(moment(holiday).isSame(day, 'day')) return true;
      }
    });
  }*/
}
