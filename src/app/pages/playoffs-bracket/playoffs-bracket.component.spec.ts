import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffsBracketComponent } from './playoffs-bracket.component';

describe('PlayoffsBracketComponent', () => {
  let component: PlayoffsBracketComponent;
  let fixture: ComponentFixture<PlayoffsBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayoffsBracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffsBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
