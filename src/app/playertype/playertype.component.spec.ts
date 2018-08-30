import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayertypeComponent } from './playertype.component';

describe('PlayertypeComponent', () => {
  let component: PlayertypeComponent;
  let fixture: ComponentFixture<PlayertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
