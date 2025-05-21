import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nba-game-detail',
  templateUrl: './nba-game-detail.component.html',
  styleUrls: ['./nba-game-detail.component.css']
})
export class NbaGameDetailComponent implements OnInit {
  partido: any;
  error: string = '';
  estadisticas!: { // Using definite assignment assertion as you'll assign it from the API
    away: any[];
    home: any[];
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.http.get<any>(`http://localhost:8000/api/nba/game/${gameId}`)
        .subscribe({
          next: (data) => {
            this.partido = data;
            this.estadisticas = data.statistics;
          },
          error: () => {
            this.error = 'Error al obtener los detalles del partido';
          }
        });
    }
  }
}