import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialAppModule } from '../ngmaterial.module';

import { SearchHistoryComponent } from './search-history.component';


describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ MaterialAppModule ],
      declarations: [ SearchHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
