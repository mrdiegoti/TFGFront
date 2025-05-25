import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nba-standings',
  templateUrl: './nba-standings.component.html',
  styleUrls: ['./nba-standings.component.css']
})
export class NbaStandingsComponent implements OnInit {
  east: any[] = [];
  west: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.http.get<any[]>('https://hoopsfever.up.railway.app/api/nba/standings').subscribe(data => {
    this.http.get<any[]>('http://localhost:8000/api/nba/standings').subscribe(data => {
      const eastConf = data.find(conf => conf.alias === 'EASTERN');
      const westConf = data.find(conf => conf.alias === 'WESTERN');

      this.east = eastConf.divisions
        .flatMap((division: { teams: any; }) => division.teams)
        .sort((a: { wins: number; }, b: { wins: number; }) => b.wins - a.wins);

      this.west = westConf.divisions
        .flatMap((division: { teams: any; }) => division.teams)
        .sort((a: { wins: number; }, b: { wins: number; }) => b.wins - a.wins);
    });
  }

  goToTeam(team: any): void {
this.router.navigate(['/nba/team', team.sr_id]);
  }

  getTeamLogo(reference: string): string {
    return `https://cdn.nba.com/logos/nba/${reference}/primary/L/logo.svg`;
  }
}
