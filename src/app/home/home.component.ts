import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { BehaviorSubject, Observable, from, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fetchedData: any;
  fetchDataObs$?: Observable<any>;
  fetchData$ = this.apiService.fetchData();
  numberSubject = new BehaviorSubject(0); // behavior subject ima pocetnu vrednost
  
  constructor(private apiService: MainService) { }

  ngOnInit(): void {
    
    this.numberSubject.subscribe((number) => console.log('trenutna vrednost', number));
    setTimeout(() => this.numberSubject.next(1), 5000);
    setTimeout(() => this.numberSubject.next(2), 10000);
    setTimeout(() => this.numberSubject.next(3), 15000);


    this.fetchDataFromApi();
    of(2, 3, 6, 8, 9).pipe(
      map((item)=>{
        return item *2
      }),
      tap(item => console.log('Dolazi iz TAP-a ',item))
    ).subscribe({
      next(item) { console.log(item) },
      error(err) { console.log(err) },
      complete() { console.log('Complite') }
    });
    of(2, 3, 6, 8, 9).subscribe(item => console.log(item));
    console.log('---------------------------------');
    from([2, 3, 5, 6, 7, 8, 9]).subscribe((item: any) => console.log(item));

    this.fetchDataObs$ = this.apiService.fetchData().pipe(
      tap(item => console.log(item)),
      map(data=>{
        return data
      })
    )
  }

  fetchDataFromApi(): void {
    this.apiService.fetchData().subscribe(data => {
      this.fetchedData = data;
    });
  }

}
