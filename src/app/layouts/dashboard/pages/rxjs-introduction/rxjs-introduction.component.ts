import { Component } from '@angular/core';
import { Observable, Subject, catchError, filter, map, of } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertsService } from '../../../../core/services/alerts.service';


@Component({
  selector: 'app-rxjs-introduction',
  templateUrl: './rxjs-introduction.component.html',
  styles: ``
})
export class RxjsIntroductionComponent {
numberobservable$ = new Observable((subscriber)=>{
subscriber.next(1);
subscriber.next(2);
subscriber.next(3);

});

numberSubject$ = new Subject()

constructor(private loadingService: LoadingService, private alertsService: AlertsService){
this.subscribeToNumberObservable();
this.subscribeToNumberSubject()
this.numberSubject$.next(4);
this.numberSubject$.next(3);
this.numberSubject$.next(2);
this.numberSubject$.next(1);
this.getUsuarios();

}

subscribeToNumberSubject():void{
  this.numberSubject$.subscribe({
    next: (numbers) => console.log('Numero Subject:', numbers)
  })
}

subscribeToNumberObservable():void{
  this.numberobservable$.subscribe({
    next: (numbers) => console.log('Numero:', numbers)
  })
}

getUsuarios(): void {
  const obs = new Observable<string[]>((subscriber) => {
    setTimeout(() => {
      subscriber.next(['Maverick', 'Goose', 'Tom']);
      subscriber.complete();
    }, 2000);
  });
  this.loadingService.setIsLoading(true);
  obs.pipe(
    filter((data)=>!!data.length),
    map((data)=> data.map((el)=> el.toLocaleUpperCase())),
    catchError((error)=>{
      this.alertsService.showError('Error al cargar los Usuarios')
      // return new Observable((subs)=>subs.next([]))
      return of([])
    })
  ).subscribe({
    next: (usuarios) => {
      if(usuarios.length){
        this.alertsService.showSucces('Realizado','Se cargaron los usuarios')
      } 
      console.log(usuarios)
    },
    complete: ()=> {
      this.loadingService.setIsLoading(false)
    }
  });
}
}
