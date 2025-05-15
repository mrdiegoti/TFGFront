import { Component, OnInit } from '@angular/core';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-nba-schedule',
  templateUrl: './nba-schedule.component.html',
  styleUrls: ['./nba-schedule.component.css']
})
export class NbaScheduleComponent implements OnInit {
  games: any[] = [];
  today: string = new Date().toISOString().split('T')[0];
  selectedDate: string | undefined;

  constructor(private nbaService: NbaService) {}

  ngOnInit(): void {
    this.loadTodayGames();
  }

  loadTodayGames(): void {
    this.nbaService.getGamesByDate(this.today).subscribe({
      next: (res: any) => {
        this.games = res.data;
      },
      error: (err) => {
        console.error('Error al cargar los juegos:', err);
      }
    });
  }

  loadGames(): void {
    if (!this.selectedDate) {
      console.error('No date selected');
      return;
    }
    this.nbaService.getGamesByDate(this.selectedDate).subscribe({
      next: (res: any) => {
        this.games = res.data;
      },
      error: (err) => {
        console.error('Error al cargar los juegos:', err);
      }
    });
  }
}
