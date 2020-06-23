import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowFirstCharComponent } from './window-first-char.component';

describe('WindowFirstCharComponent', () => {
  let component: WindowFirstCharComponent;
  let fixture: ComponentFixture<WindowFirstCharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowFirstCharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowFirstCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
