import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComment.TsComponent } from './edit-comment.ts.component';

describe('EditComment.TsComponent', () => {
  let component: EditComment.TsComponent;
  let fixture: ComponentFixture<EditComment.TsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComment.TsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComment.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
