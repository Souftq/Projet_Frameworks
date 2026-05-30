import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesManualComponent } from './choices-manual.component';

describe('ChoicesManualComponent', () => {
  let component: ChoicesManualComponent;
  let fixture: ComponentFixture<ChoicesManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoicesManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoicesManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
