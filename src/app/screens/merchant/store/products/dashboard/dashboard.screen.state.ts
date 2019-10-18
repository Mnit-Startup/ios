import {ComponentState} from '../../../../../component.state';
import {Orientation} from '../../../../../models/device-orientation';
import {ProductList} from '../../../../../models/product-list';

export interface ProductsDashboardScreenState extends ComponentState {
  productsList?: ProductList;
  orientation: Orientation;
  storeLogo: string;
  loadingLogo: boolean;
}
