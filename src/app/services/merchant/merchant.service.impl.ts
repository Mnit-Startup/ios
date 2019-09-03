import _ from 'lodash';
import {MerchantService} from './merchant.service';
import {Employee, EmployeeList, EmployeeDetail} from '../../models';
import {ApiServiceImpl} from '../api.service.impl';
import {ServiceResponse} from '../service.response';
import {AuthService} from '..';

export class MerchantServiceImpl extends ApiServiceImpl implements MerchantService {

    // employees is a map of role to list of employees
    employees: Map<string, EmployeeList>;

    constructor(authService: AuthService) {
        super(authService);
        this.employees = new Map<string, EmployeeList>();
    }

    async createEmployee(employee: Employee, pin: string): Promise<ServiceResponse<Employee>> {
        try {
            const employee_entries = {
                name: employee.name,
                emp_number: employee.empNumber,
                pin,
                role: employee.role,
                active: employee.active,
            };
            const userId = await this.getUserAccountId();
            const response = await this.post(`/account/${userId}/employee`, employee_entries);
            const newEmployee = new Employee(response.data);
            if (this.employees.has(employee.role)) {
                const employees: EmployeeList = this.employees.get(employee.role);
                employees.addNewEmployee(newEmployee);
            } else {
                const employees: EmployeeList = new EmployeeList();
                employees.addNewEmployee(newEmployee);
                this.employees.set(employee.role, employees);
            }
            return new ServiceResponse(newEmployee);
        } catch (e) {
            return new ServiceResponse<Employee>(undefined, ApiServiceImpl.parseError(e));
        }
    }

    async getEmployees(role: string): Promise<ServiceResponse<EmployeeList>> {
        try {
            if (!this.employees.has(role)) {
                const userId = await this.getUserAccountId();
                const response = await this.get(`/account/${userId}/employees/${role}`);
                const employees: EmployeeList = new EmployeeList(response.data);
                this.employees.set(role, employees);
            }
            return new ServiceResponse<EmployeeList>(this.employees.get(role));
        } catch (e) {
            return new ServiceResponse<EmployeeList>(undefined, ApiServiceImpl.parseError(e));
        }
    }

    async removeEmployee(
        empId: string,
        role: string,
    ): Promise<ServiceResponse<Employee>> {
        try {
            const userId = await this.getUserAccountId();
            const response = await this.delete(`/account/${userId}/employee/${empId}`, undefined);
            const deletedEmployee = new Employee(response.data);
            if (this.employees.has(role)) {
                const employees: EmployeeList = this.employees.get(role);
                employees.removeEmployee(empId);
            }
            return new ServiceResponse(deletedEmployee);
        } catch (e) {
            return new ServiceResponse<Employee>(undefined, ApiServiceImpl.parseError(e));
        }
    }

    async getEmployee(
        empId: string,
        role: string,
    ): Promise<ServiceResponse<Employee>> {
        const employees: EmployeeList = this.employees.get(role);
        const employee: Employee = employees.getEmployeeById(empId);
        return new ServiceResponse(employee);
    }

    async editEmployee(employee: Employee, pin: string): Promise<ServiceResponse<Employee>> {
        try {
            const employee_entries = {
                name: employee.name,
                emp_number: employee.empNumber,
                pin,
                role: employee.role,
                active: employee.active,
            };
            const userId = await this.getUserAccountId();
            const response = await this.put(`/account/${userId}/employee/${employee.empId}`, employee_entries);
            const editedEmployee = new Employee(response.data);
            if (this.employees.has(employee.role)) {
                const employees: EmployeeList = this.employees.get(employee.role);
                employees.updateEmployee(editedEmployee);
            }
            return new ServiceResponse(editedEmployee);
        } catch (e) {
            return new ServiceResponse<Employee>(undefined, ApiServiceImpl.parseError(e));
        }
    }
}
