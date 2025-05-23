import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaTeamDetailComponent } from './nba-team-detail.component';

describe('NbaTeamDetailComponent', () => {
  let component: NbaTeamDetailComponent;
  let fixture: ComponentFixture<NbaTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbaTeamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
