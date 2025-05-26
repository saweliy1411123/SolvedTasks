import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSelectorComponent } from './data-selector.component';

describe('DateCheckerComponent', () => {
  let component: DataSelectorComponent;
  let fixture: ComponentFixture<DataSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
