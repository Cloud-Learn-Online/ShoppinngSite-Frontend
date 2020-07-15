import { TestBed } from '@angular/core/testing';

import { ItemDetailService } from './item-detail.service';

describe('ProductDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDetailService = TestBed.get(ItemDetailService);
    expect(service).toBeTruthy();
  });
});
