import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from './mock-heroes';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  private heroesUrl = `${environment.baseUrl}/heroes`

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap((heroes) => this.log(`fetched ${heroes.length} heroes`)))


  }

  getOne(id: number): Observable<Hero> {

    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(hero => this.log(`fetched ${this.descAttributes(hero)}`))
      )

  }

  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap(hero => this.log(`created ${this.descAttributes(hero)}`))
    )
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero).pipe(
      tap(hero => this.log(`updated ${this.descAttributes(hero)}`))
    ) 
  }

  private descAttributes(hero: Hero): string {
    return `hero id=${hero.id} and name=${hero.name}`
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }



}
