import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCliquableComponent } from './image-cliquable.component';

describe('ImageCliquableComponent', () => {
  let component: ImageCliquableComponent;
  let fixture: ComponentFixture<ImageCliquableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageCliquableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCliquableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
