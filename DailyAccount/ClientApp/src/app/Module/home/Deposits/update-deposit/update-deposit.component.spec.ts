import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepositComponent } from './update-deposit.component';

describe('UpdateDepositComponent', () => {
  let component: UpdateDepositComponent;
  let fixture: ComponentFixture<UpdateDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
