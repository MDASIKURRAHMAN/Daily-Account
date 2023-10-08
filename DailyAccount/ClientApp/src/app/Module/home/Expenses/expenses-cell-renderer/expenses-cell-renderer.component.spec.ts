import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCellRendererComponent } from './expenses-cell-renderer.component';

describe('ExpensesCellRendererComponent', () => {
  let component: ExpensesCellRendererComponent;
  let fixture: ComponentFixture<ExpensesCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
