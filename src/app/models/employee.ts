import _ from 'lodash';

export class Employee {
    readonly empId?: string;
    readonly name: string;
    readonly empNumber: string;
    readonly role: string;
    readonly active: boolean;
    readonly stores?: Array<string>;

    constructor(employee: any) {
        this.empId = _.get(employee, 'id', '');
        this.name = _.get(employee, 'name', '');
        this.empNumber = _.get(employee, 'emp_number', '');
        this.role = _.get(employee, 'role', '');
        this.active = _.get(employee, 'active', false);
        this.stores = _.get(employee, 'stores', []);
    }

    addToStoreWithRole(store: string) {
        if (this.stores) {
            this.stores.push(store);
        }
    }

    removeFromStore(store: string) {
        if (this.stores) {
            _.remove(this.stores, (storeId) => storeId === store);
        }
    }
}
