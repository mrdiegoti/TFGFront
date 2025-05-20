import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nba-schedule',
  templateUrl: './nba-schedule.component.html',
  styleUrls: ['./nba-schedule.component.css']
})
export class NbaScheduleComponent implements OnInit {
  partidos: any[] = [];
  error: string = '';
  fecha: string = '2024-11-01';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPartidos();
  }

  obtenerPartidos(): void {
    this.http.get<any>(`http://localhost:8000/api/nba/schedule/${this.fecha}`)
      .subscribe({
        next: (data) => {
          this.partidos = data.games || [];
        },
        error: (err) => {
          this.error = 'Error al obtener el calendario';
        }
      });
  }
}
