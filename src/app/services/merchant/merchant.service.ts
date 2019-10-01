import {ServiceResponse} from '../service.response';
import {Employee, EmployeeList, EmployeeDetail} from '../../models';
import {DataStore} from '../data-store';

export interface MerchantService extends DataStore {
    createEmployee(
        employee: Employee,
        pin: string,
    ): Promise<ServiceResponse<Employee>>;

    getEmployees(
        role: string,
    ): Promise<ServiceResponse<EmployeeList>>;

    removeEmployee(
        empId: string,
        role: string,
    ): Promise<ServiceResponse<Employee>>;

    editEmployee(
        employee: Employee,
        pin: string,
    ): Promise<ServiceResponse<Employee>>;
}
