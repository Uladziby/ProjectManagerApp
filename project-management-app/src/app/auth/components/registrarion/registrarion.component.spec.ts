import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarionComponent } from './registrarion.component';

describe('RegistrarionComponent', () => {
  let component: RegistrarionComponent;
  let fixture: ComponentFixture<RegistrarionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
