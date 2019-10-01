import _ from 'lodash';

export class EmployeeDetail {
    readonly empId: string;
    readonly store: string;
    readonly role: string;
    readonly active: boolean;

    constructor(employeeDetail: any) {
        this.empId = _.get(employeeDetail, 'employee', '');
        this.store = _.get(employeeDetail, 'store', '');
        this.role = _.get(employeeDetail, 'role', '');
        this.active = _.get(employeeDetail, 'active', false);
    }
}
