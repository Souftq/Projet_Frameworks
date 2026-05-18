import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesAssistedComponent } from './choices-assisted.component';

describe('ChoicesAssistedComponent', () => {
  let component: ChoicesAssistedComponent;
  let fixture: ComponentFixture<ChoicesAssistedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoicesAssistedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoicesAssistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
