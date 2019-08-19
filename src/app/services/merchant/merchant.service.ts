import {ServiceResponse} from '../service.response';
import {Employee, EmployeeList} from '../../models';

export interface MerchantService {
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

    getEmployee(
        empId: string,
        role: string,
    ): Promise<ServiceResponse<Employee>>;

    editEmployee(
        employee: Employee,
        pin: string,
    ): Promise<ServiceResponse<Employee>>;
}
