import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHomeComponent } from './hospital-home.component';

describe('HospitalHomeComponent', () => {
  let component: HospitalHomeComponent;
  let fixture: ComponentFixture<HospitalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospitalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
