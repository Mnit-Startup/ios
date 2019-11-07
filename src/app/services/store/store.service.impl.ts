import _ from 'lodash';
import {StoreService} from './store.service';
import {Store, Product, Image, ProductList, EmployeeDetail, Employee, Transaction} from '../../models';
import {StoreList} from '../../models/store-list';
import {ApiServiceImpl} from '../api.service.impl';
import {ServiceResponse} from '../service.response';
import {AuthService} from '..';
import {DataStore} from '../data-store';

export class StoreServiceImpl extends ApiServiceImpl implements StoreService {

  dataStore: DataStore;
  storeList: StoreList;
  products: Map<string, ProductList>;

  constructor(
    authService: AuthService,
    dataStore: DataStore) {
    super(authService);
    this.storeList = new StoreList();
    this.products = new Map<string, ProductList>();
    this.dataStore = dataStore;
  }

  async getStores(
    ): Promise<ServiceResponse<StoreList>> {
      try {
        if (!this.storeList.hasStores()) {
          const userId = await this.getUserAccountId();
          const response = await this.get(`/account/${userId}/stores`);
          this.storeList = new StoreList(response.data);
        }
        return new ServiceResponse<StoreList>(this.storeList);
      } catch (e) {
        return new ServiceResponse<StoreList>(undefined, ApiServiceImpl.parseError(e));
      }
    }

  async createStore(store: Store): Promise<ServiceResponse<Store>>  {
    try {
      const storeEntries = {
        name: store.name,
        phone: store.phone,
        email: store.email,
        street_address: store.streetAddress,
        street_address_2: store.streetAddress2,
        city: store.city,
        state: store.state,
        zipcode: store.zipcode,
        merchant_id_ein: store.merchantIdEin,
        store_profile: store.storeProfile,
        store_identifier: store.storeIdentifier,
        image: store.image,
        tax: store.tax,
      };
      const userId = await this.getUserAccountId();
      const response = await this.post(`/account/${userId}/store`, storeEntries);
      const newStore = new Store(response.data);
      this.storeList.addNewStore(newStore);
      return new ServiceResponse(newStore);
    } catch (e) {
      return new ServiceResponse<Store>(undefined, ApiServiceImpl.parseErrorParam(e));
    }
  }

  async createProduct(storeId: string, product: Product): Promise<ServiceResponse<Product>> {
    try {
      const productEntries = {
        name: product.name,
        price: product.price,
        sku_number: product.skuNumber,
        taxable: product.taxable,
        image: product.image,
        active: product.active,
        tax: product.tax,
      };
      const userId = await this.getUserAccountId();
      const response = await this.post(`/account/${userId}/store/${storeId}/product`, productEntries);
      const newProduct = new Product(response.data);
      // find and push
      if (this.products.has(storeId)) {
        const products: ProductList = this.products.get(storeId);
        products.addProduct(newProduct);
      }
      return new ServiceResponse(newProduct);
    } catch (e) {
      return new ServiceResponse<Product>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async editProduct(storeId: string, productId: string, product: Product): Promise<ServiceResponse<Product>> {
    try {
      const productEntries = {
        name: product.name,
        price: product.price,
        sku_number: product.skuNumber,
        taxable: product.taxable,
        image: product.image,
        active: product.active,
        tax: product.tax,
      };
      const userId = await this.getUserAccountId();
      const response = await this.put(`/account/${userId}/store/${storeId}/product/${productId}`, productEntries);
      const editedProduct = new Product(response.data);
      if (this.products.has(storeId)) {
        const products: ProductList = this.products.get(storeId);
        products.updateProduct(editedProduct);
      }
      return new ServiceResponse(editedProduct);
    } catch (e) {
      return new ServiceResponse<Product>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async uploadImage(
    data: any,
  ): Promise<ServiceResponse<Image>> {
    try {
      const config = {
        timeout: 30000,
    };
      const response = await this.post('/account/upload-image', data, config);
      return new ServiceResponse(new Image({
        uri: response.data.logo,
      }));
    } catch (e) {
      return new ServiceResponse<Image>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async getProducts(
    storeId: string,
    userId: string,
    ): Promise<ServiceResponse<ProductList>> {
      try {
        if (!this.products.has(storeId)) {
          if (_.isNil(userId)) {
            userId = await this.getUserAccountId();
          }
          const response = await this.get(`/account/${userId}/store/${storeId}/products`);
          const productsList: ProductList = new ProductList(response.data);
          this.products.set(storeId, productsList);
        }
        return new ServiceResponse<ProductList>(this.products.get(storeId));
      } catch (e) {
        return new ServiceResponse<ProductList>(undefined, ApiServiceImpl.parseError(e));
      }
    }

    async removeProduct(
      storeId: string,
      productId: string,
    ): Promise<ServiceResponse<Product>> {
      try {
        const userId = await this.getUserAccountId();
        const response = await this.delete(`/account/${userId}/store/${storeId}/product/${productId}`, undefined);
        const deletedProduct = new Product(response.data);
        if (this.products.has(storeId)) {
          const products: ProductList = this.products.get(storeId);
          products.removeProduct(productId);
        }
      return new ServiceResponse(deletedProduct);
      } catch (e) {
        return new ServiceResponse<Product>(undefined, ApiServiceImpl.parseError(e));
      }
    }

    async getProduct(
      storeId: string,
      productId: string,
    ): Promise<ServiceResponse<Product>> {
          const products: ProductList = this.products.get(storeId);
          const product: Product = products.getProductById(productId);
          return new ServiceResponse(product);
    }

    async addEmployee(
      employeeDetail: EmployeeDetail,
  ): Promise<ServiceResponse<EmployeeDetail>> {
      try {
          const userId = await this.getUserAccountId();
          const response = await
          this.post(`/account/${userId}/store/${employeeDetail.store}/${employeeDetail.role}/${employeeDetail.empId}`, undefined);
          const newEmployeeDetail = new EmployeeDetail(response.data);
          const responseDataStore = await this.dataStore.getEmployee(newEmployeeDetail.empId, newEmployeeDetail.role);
          const employee: Employee = new Employee(responseDataStore.data);
          employee.addToStoreWithRole(newEmployeeDetail.store);
          return new ServiceResponse(newEmployeeDetail);
      } catch (e) {
          return new ServiceResponse<EmployeeDetail>(undefined, ApiServiceImpl.parseErrorParam(e));
      }
  }

    async removeEmployee(
      employeeDetail: EmployeeDetail,
  ): Promise<ServiceResponse<EmployeeDetail>> {
      try {
          const userId = await this.getUserAccountId();
          const response = await
          this.delete(`/account/${userId}/store/${employeeDetail.store}/${employeeDetail.role}/${employeeDetail.empId}`, undefined);
          const removedEmployeeDetail = new EmployeeDetail(response.data);
          const responseDataStore = await this.dataStore.getEmployee(removedEmployeeDetail.empId, removedEmployeeDetail.role);
          const employee: Employee = new Employee(responseDataStore.data);
          employee.removeFromStore(removedEmployeeDetail.store);
          return new ServiceResponse(removedEmployeeDetail);
      } catch (e) {
          return new ServiceResponse<EmployeeDetail>(undefined, ApiServiceImpl.parseErrorParam(e));
      }
  }

  async createTransaction(
    cart: Map<string, number>,
    merchantId: string,
    storeId: string,
  ): Promise<ServiceResponse<Transaction>> {
    try {
      const cart_items = Array<{product: string, quantity: number}>();
      cart.forEach((value, key) => {
        const cartItem = {
          product: key,
          quantity: value,
        };
        cart_items.push(cartItem);
      });
      const response = await this.post(`/account/${merchantId}/store/${storeId}/transaction`, {cart_items});
      const transaction = new Transaction(response.data);
      return new ServiceResponse(transaction);
    } catch (e) {
      return new ServiceResponse<Transaction>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async getStore(
    storeId: string,
    merchantId?: string,
  ): Promise<ServiceResponse<Store>> {
    let store;
    if (this.storeList.hasStores()) {
      store = this.storeList.getStoreById(storeId);
    } else {
      let userId;
      if (!_.isNil(merchantId)) {
        userId = merchantId;
      } else {
        userId = await this.getUserAccountId();
      }
      const response = await this.get(`/account/${userId}/store/${storeId}`);
      store = new Store(response.data);
    }
    return new ServiceResponse(store);
  }
}
