import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nba-schedule',
  templateUrl: './nba-schedule.component.html',
  styleUrls: ['./nba-schedule.component.css'],
})
export class NbaScheduleComponent implements OnInit {
  partidos: any[] = [];
  error: string = '';
  fecha: string = new Date().toISOString().slice(0, 10);
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPartidos();
  }

  obtenerPartidos(): void {
    this.http
      .get<any>(`https://hoopsfever.up.railway.app/api/nba/schedule/${this.fecha}`)
      // .get<any>(`http://localhost:8000/api/nba/schedule/${this.fecha}`)
      .subscribe({
        next: (data) => {
          this.partidos = data.games || [];
        },
        error: (err) => {
          this.error = 'Error al obtener el calendario';
        },
      });
  }

  getLogoUrl(teamName: string): string {
    const slug = teamName.toLowerCase().replace(/ /g, '-');
    return `https://cdn.nba.com/logos/nba/${this.getTeamId(
      slug
    )}/global/L/logo.svg`;
  }

  getTeamId(slug: string): string {
    const map: { [key: string]: string } = {
      'atlanta-hawks': '1610612737',
      'boston-celtics': '1610612738',
      'brooklyn-nets': '1610612751',
      'charlotte-hornets': '1610612766',
      'chicago-bulls': '1610612741',
      'cleveland-cavaliers': '1610612739',
      'dallas-mavericks': '1610612742',
      'denver-nuggets': '1610612743',
      'detroit-pistons': '1610612765',
      'golden-state-warriors': '1610612744',
      'houston-rockets': '1610612745',
      'indiana-pacers': '1610612754',
      'la-clippers': '1610612746',
      'los-angeles-lakers': '1610612747',
      'memphis-grizzlies': '1610612763',
      'miami-heat': '1610612748',
      'milwaukee-bucks': '1610612749',
      'minnesota-timberwolves': '1610612750',
      'new-orleans-pelicans': '1610612740',
      'new-york-knicks': '1610612752',
      'oklahoma-city-thunder': '1610612760',
      'orlando-magic': '1610612753',
      'philadelphia-76ers': '1610612755',
      'phoenix-suns': '1610612756',
      'portland-trail-blazers': '1610612757',
      'sacramento-kings': '1610612758',
      'san-antonio-spurs': '1610612759',
      'toronto-raptors': '1610612761',
      'utah-jazz': '1610612762',
      'washington-wizards': '1610612764',
    };
    return map[slug] || '0000000000'; // fallback
  }

  verDetalles(gameId: string): void {
  this.router.navigate(['/nba/game', gameId]);
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}


}
