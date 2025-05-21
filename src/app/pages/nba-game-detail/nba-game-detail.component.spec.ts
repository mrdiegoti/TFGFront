import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaGameDetailComponent } from './nba-game-detail.component';

describe('NbaGameDetailComponent', () => {
  let component: NbaGameDetailComponent;
  let fixture: ComponentFixture<NbaGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbaGameDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
