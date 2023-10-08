import { TestBed } from '@angular/core/testing';

import { MessageShowService } from './message-show.service';

describe('MessageShowService', () => {
  let service: MessageShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
