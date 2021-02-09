import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  slidesCards = [
    {
      icon: 'videocam',
      description:'Ingresá cada día al aula mirando a la cámara instalada en la entrada.',
      back_color: '#29375b',
      color: "#fff"
    },
    {
      icon: 'paper-plane',
      description: 'Recibí una notificacion al confirmarse el registro tu asistencia.',
      back_color: '#ff6a3d',
      color: "#fff"
    },
    {
      icon: 'calendar',
      description: 'Llevá un control de tu asistencia a clases durante el año.',
      back_color: '#fff',
      color: "#29375b"
    }
  ];
  last_slide = false;
  buttonText = 'SIGUIENTE';
  constructor(private router: Router, private _storage: StorageService ) { }

  ngOnInit() {
  }

  slideChanged(){
    this.slides.getActiveIndex().then(number =>{
      if (number == 2) {
        console.log('slide final')
        this.buttonText = 'ENTENDIDO';
      } else {
        this.buttonText = 'SIGUIENTE';
      }
    })
  }

  finishTutorial(){
    this.slides.getActiveIndex().then(number =>{
      if (number == 2) {
        console.log('entre slide final')
        this._storage.setItem('tutorialComplete', true);
        this.router.navigateByUrl('');
      } else {
        console.log('siguiente')
        this.slides.slideNext();
      }
    })
  }
}
