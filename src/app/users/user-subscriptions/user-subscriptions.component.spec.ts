/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserSubscriptionsComponent } from './user-subscriptions.component';

describe('UserSubscriptionsComponent', () => {
  let component: UserSubscriptionsComponent;
  let fixture: ComponentFixture<UserSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
