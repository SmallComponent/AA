/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyHttpService } from './myHttp.service';

describe('Service: MyHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyHttpService]
    });
  });

  it('should ...', inject([MyHttpService], (service: MyHttpService) => {
    expect(service).toBeTruthy();
  }));
});