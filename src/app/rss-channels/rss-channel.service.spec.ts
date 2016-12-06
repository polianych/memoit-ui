/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RssChannelService } from './rss-channel.service';

describe('Service: RssChannel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssChannelService]
    });
  });

  it('should ...', inject([RssChannelService], (service: RssChannelService) => {
    expect(service).toBeTruthy();
  }));
});
