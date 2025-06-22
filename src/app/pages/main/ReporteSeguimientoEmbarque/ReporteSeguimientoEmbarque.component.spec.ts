/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReporteSeguimientoEmbarqueComponent } from './ReporteSeguimientoEmbarque.component';

describe('ReporteSeguimientoEmbarqueComponent', () => {
  let component: ReporteSeguimientoEmbarqueComponent;
  let fixture: ComponentFixture<ReporteSeguimientoEmbarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSeguimientoEmbarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSeguimientoEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
