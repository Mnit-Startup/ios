import {ServiceResponse} from '../service.response';
import {Store, Product, Image, StoreList, ProductList} from '../../models';

export interface StoreService {
  createStore(
    store: Store,
  ): Promise<ServiceResponse<Store>>;

  getStores(
  ): Promise<ServiceResponse<StoreList>>;

  createProduct(
    storeId: String,
    product: Product,
  ): Promise<ServiceResponse<Product>>;

  editProduct(
    storeId: String,
    productId: String,
    product: Product,
  ): Promise<ServiceResponse<Product>>;

  removeProduct(
    storeId: String,
    productId: String,
  ): Promise<ServiceResponse<Product>>;

  getProduct(
    storeId: String,
    productId: String,
  ): Promise<ServiceResponse<Product>>;

  uploadImage(
    data: any,
  ): Promise<ServiceResponse<Image>>;

  getProducts(
    storeId: string,
    ): Promise<ServiceResponse<ProductList>>;
}
