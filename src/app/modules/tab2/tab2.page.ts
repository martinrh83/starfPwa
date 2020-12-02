import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../core/services/user/auth.service';
import { SharedService } from './../../core/services/user/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  attendances = [];
  groups = [];
  constructor(
    private _authService: AuthService, 
    private _sharedService: SharedService,
    private router: Router
    ) {}

  ionViewWillEnter(){
    this._authService.getAttendances().subscribe((res) =>{
      this.attendances = res.data.attendances;
      /*this.attendances.push({registeredAt: "2020-10-01T11:35:00.000Z",
      _id: "5f7a4f272b59413e573b3fb7",
      subjectCode: "AED",
      subjectName: "ALGORITMOS"})*/
       this.groups = this.groupByArray(this.attendances, 'subjectName');

    })
  }
  
  groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        }
        else {
            rv.push({
                key: v,
                values: [x]
            });
        }
        return rv;
    }, []);
  }

  sendObj(item){
    console.log(item);
    this._sharedService.nextObj(item);
    this.router.navigate(['/tabs/tab2/calendar']);
  }
}
