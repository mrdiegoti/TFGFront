import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nba-team-detail',
  templateUrl: './nba-team-detail.component.html',
  styleUrls: ['./nba-team-detail.component.css']
})
export class NbaTeamDetailComponent implements OnInit {
  teamId!: string;
  players: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id')!;
    this.fetchPlayersStats();
  }

  fetchPlayersStats() {
this.http.get<any[]>(`http://localhost:8000/api/nba/team/${encodeURIComponent(this.teamId)}/players-stats`).subscribe({
      next: data => {
        this.players = data;
        this.errorMessage = '';
      },
      error: err => {
        this.errorMessage = 'Error al cargar las estadísticas del equipo.';
        console.error(err);
      }
    });
  }
}
