import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerkeyComponent } from './playerkey.component';

describe('PlayerkeyComponent', () => {
  let component: PlayerkeyComponent;
  let fixture: ComponentFixture<PlayerkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
