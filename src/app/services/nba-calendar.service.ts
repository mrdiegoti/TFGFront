import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaCalendarService {
  private apiKey = 'wfVIBOSY7GR3c12XXhUnzewMqMMr3Skgitqkqafh'; 
  private baseUrl = 'https://api.sportradar.us/nba/trial/v8/en/games';

  constructor(private http: HttpClient) {}

  getGamesByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}/${date}/schedule.json?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
