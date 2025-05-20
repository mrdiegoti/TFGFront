import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private baseUrl = 'http://localhost:8000/api/nba/schedule';

  constructor(private http: HttpClient) {}

  getGamesByDate(date: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${date}`);
}

  getUpcomingGames(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/games?per_page=10&page=${page}`);
  }
}
