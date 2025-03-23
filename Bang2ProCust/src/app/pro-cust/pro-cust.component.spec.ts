import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCustComponent } from './pro-cust.component';

describe('ProCustComponent', () => {
  let component: ProCustComponent;
  let fixture: ComponentFixture<ProCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProCustComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
