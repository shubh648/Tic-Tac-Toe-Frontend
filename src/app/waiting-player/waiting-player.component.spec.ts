import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPlayerComponent } from './waiting-player.component';

describe('WaitingPlayerComponent', () => {
  let component: WaitingPlayerComponent;
  let fixture: ComponentFixture<WaitingPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
