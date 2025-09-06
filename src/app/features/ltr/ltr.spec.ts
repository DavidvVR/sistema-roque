import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ltr } from './ltr';

describe('Ltr', () => {
  let component: Ltr;
  let fixture: ComponentFixture<Ltr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ltr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ltr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
