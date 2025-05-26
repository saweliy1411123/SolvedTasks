import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCheckerComponent } from './date-checker.component';

describe('DateCheckerComponent', () => {
  let component: DateCheckerComponent;
  let fixture: ComponentFixture<DateCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
