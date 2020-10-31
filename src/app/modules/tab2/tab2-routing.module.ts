import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { CalendarPage } from '../calendar/calendar.page';


const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'calendar',
    component: CalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
