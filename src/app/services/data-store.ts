import {ServiceResponse} from './service.response';
import {Employee} from '../models';

export interface DataStore {
    getEmployee(empId: string, role: string): Promise<ServiceResponse<Employee>>;
}
