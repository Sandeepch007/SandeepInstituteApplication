import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalLoginComponent } from './hospital-login.component';

describe('HospitalLoginComponent', () => {
  let component: HospitalLoginComponent;
  let fixture: ComponentFixture<HospitalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospitalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
