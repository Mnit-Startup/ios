import _ from 'lodash';
import {Employee} from './employee';

export class EmployeeList {
    readonly employees: Array<Employee>;

    constructor(list: Array<any> = []) {
        this.employees = [];
        _.forEach(list, (item) => {
            this.employees.push(new Employee(item));
        });
        this.employees.sort(this.compareByName);
    }

    compareByName(employeeA: Employee, employeeB: Employee) {
        const employeeNameA = employeeA.name.toUpperCase();
        const employeeNameB = employeeB.name.toUpperCase();
        let comparison = 0;
        if (employeeNameA > employeeNameB) {
          comparison = 1;
        } else if (employeeNameA < employeeNameB) {
          comparison = -1;
        }
        return comparison;
    }

    addNewEmployee(newEmployee: Employee) {
        this.employees.push(newEmployee);
        this.employees.sort(this.compareByName);
    }

    removeEmployee(id: string) {
        _.remove(this.employees, (employee) => employee.empId === id);
    }

    getEmployeeById(id: string) {
        return _.find(this.employees, (employee) => employee.empId === id);
    }

    updateEmployee(editedEmployee: Employee) {
        const index = _.findIndex(this.employees, (employee) => employee.empId === editedEmployee.empId);
        if (index !== -1) {
            this.employees.splice(index, 1, editedEmployee);
        }
        this.employees.sort(this.compareByName);
    }
}
