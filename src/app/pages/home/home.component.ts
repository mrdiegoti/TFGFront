import { Component } from '@angular/core';
import { fadeInUp } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInUp('300ms')]
})
export class HomeComponent {


  constructor() { }
}