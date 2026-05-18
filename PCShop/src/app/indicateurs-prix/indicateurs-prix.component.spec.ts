import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateursPrixComponent } from './indicateurs-prix.component';

describe('IndicateursPrixComponent', () => {
  let component: IndicateursPrixComponent;
  let fixture: ComponentFixture<IndicateursPrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicateursPrixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicateursPrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
