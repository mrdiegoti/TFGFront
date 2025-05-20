import { TestBed } from '@angular/core/testing';

import { NbaCalendarService } from './nba-calendar.service';

describe('NbaCalendarService', () => {
  let service: NbaCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
