import {ComponentState, ComponentViewState} from '../../../../../component.state';
import {Orientation} from '../../../../../models/device-orientation';

export interface CreateProductScreenState extends ComponentState {
  productName: {
    value: string,
    valid: boolean,
  };
  price: {
    value: string,
    valid: boolean,
  };
  skuNumber: {
    value: string,
    valid: boolean,
  };
  taxableDropdown: {
    visible: boolean;
    picked: string;
  };
  image: string;
  uploadingImage: boolean;
  reUploadingImage: boolean;
  loadingImage: boolean;
  orientation: Orientation;
  onceSubmitted: boolean;
  storeLogo: string;
  loadingLogo: boolean;
}
