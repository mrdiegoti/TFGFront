import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Matchup {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  winner: string | null;
  round: number;
}

@Component({
  selector: 'app-playoffs-bracket',
  templateUrl: './playoffs-bracket.component.html',
  styleUrls: ['./playoffs-bracket.component.css']
})
export class PlayoffsBracketComponent implements OnInit {
  matchupsGrouped: { [round: number]: Matchup[] } = {};
  error: string = '';
  Object = Object;
  rounds: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPlayoffsBracket();
  }

  loadPlayoffsBracket(): void {
  // const url = 'https://hoopsfever.up.railway.app/api/nba/playoffs';
  const url = 'http://localhost:8000/api/nba/playoffs';
  const token = localStorage.getItem('token'); // Obtener el token del localStorage

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el bracket de playoffs.');
      }
      return response.json();
    })
    .then(data => {
      const matchups = this.parseMatchups(data);
      this.matchupsGrouped = matchups.reduce((acc: { [round: number]: Matchup[] }, m: Matchup) => {
        if (!acc[m.round]) acc[m.round] = [];
        acc[m.round].push(m);
        return acc;
      }, {});
    })
    .catch(err => {
      this.error = 'Error al cargar el bracket de playoffs.';
      console.error(err);
    });
}


  parseMatchups(data: any): Matchup[] {
    const matchups: Matchup[] = [];

    if (!data || !data.rounds) return matchups;

    data.rounds.forEach((round: any, index: number) => {
      round.matchups.forEach((m: any) => {
        matchups.push({
          id: m.id,
          home_team: m.home_team.name,
          away_team: m.away_team.name,
          home_score: m.home_score ?? null,
          away_score: m.away_score ?? null,
          winner: m.winner ?? null,
          round: index + 1
        });
      });
    });

    return matchups;
  }
}
