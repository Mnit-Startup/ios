import {ProductList} from '../../models';
import {ComponentState} from '../../component.state';
import {Orientation} from '../../models/device-orientation';

export interface CartState extends ComponentState {
  productsList: ProductList;
  orientation: Orientation;
}
