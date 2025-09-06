import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Permisionarios } from './permisionarios';

describe('Permisionarios', () => {
  let component: Permisionarios;
  let fixture: ComponentFixture<Permisionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Permisionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Permisionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
