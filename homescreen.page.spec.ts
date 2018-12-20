import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomescreenPage } from './homescreen.page';

describe('HomescreenPage', () => {
  let component: HomescreenPage;
  let fixture: ComponentFixture<HomescreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomescreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomescreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
