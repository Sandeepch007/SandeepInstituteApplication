import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpwdComponent } from './forgotpwd.component';

describe('ForgotpwdComponent', () => {
  let component: ForgotpwdComponent;
  let fixture: ComponentFixture<ForgotpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotpwdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
