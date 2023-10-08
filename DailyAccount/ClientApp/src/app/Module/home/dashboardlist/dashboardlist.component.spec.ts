import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardlistComponent } from './dashboardlist.component';

describe('DashboardlistComponent', () => {
  let component: DashboardlistComponent;
  let fixture: ComponentFixture<DashboardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
