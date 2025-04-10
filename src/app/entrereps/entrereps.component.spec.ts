import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrerepsComponent } from './entrereps.component';

describe('EntrerepsComponent', () => {
  let component: EntrerepsComponent;
  let fixture: ComponentFixture<EntrerepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrerepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrerepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
