import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private baseUrl = 'https://hoopsfever.onrender.com/api/nba';
  // private baseUrl = 'http://localhost:8000/api/nba';

  constructor(private http: HttpClient) {}

  getGamesByDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/${date}`);
  }

  getUpcomingGames(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/games?per_page=10&page=${page}`);
  }

  getTeamPlayerStats(teamId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/team/${teamId}`);
  }
}
