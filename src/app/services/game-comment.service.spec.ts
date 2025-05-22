import { TestBed } from '@angular/core/testing';

import { GameCommentService } from './game-comment.service';

describe('GameCommentService', () => {
  let service: GameCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
