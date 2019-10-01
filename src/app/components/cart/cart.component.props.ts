import {MemoizedFunction} from 'lodash';
import {StoreService} from '../../services';
import {CheckoutCart} from '../../models';

export interface CartProps {
  cart: CheckoutCart;
  storeService: StoreService;
  storeId: string;
  merchantId: string;
  translate: ((key: any, config?: any) => string) & MemoizedFunction;
}
