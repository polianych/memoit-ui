/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RssChannelsComponent } from './rss-channels.component';

describe('RssChannelsComponent', () => {
  let component: RssChannelsComponent;
  let fixture: ComponentFixture<RssChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
