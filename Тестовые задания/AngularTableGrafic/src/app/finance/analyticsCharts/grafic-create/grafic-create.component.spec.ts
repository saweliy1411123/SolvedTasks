import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficCreateComponent } from './grafic-create.component';

describe('GraficCreateComponent', () => {
  let component: GraficCreateComponent;
  let fixture: ComponentFixture<GraficCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
