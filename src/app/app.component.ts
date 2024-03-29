import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PF-Angular-AlvarezJoaquin';

  isLoading = false;
  // isLoading$: Observable<Boolean>;

  constructor(private loadingService: LoadingService){
    // this.isLoading$ = this.loadingService.isLoading$
    this.loadingService.isLoading$.subscribe({
      next: (value) => {
        setTimeout(()=>{this.isLoading = value})}
    })
  }
}
