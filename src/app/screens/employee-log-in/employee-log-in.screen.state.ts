import {ComponentState} from '../../component.state';

export interface EmployeeLoginScreenState extends ComponentState {
    empNumber: {
        value: string,
        valid: boolean,
    };
    pin: {
        value: string,
        valid: boolean,
    };
    storeIdentifier: {
        value: string;
        valid: boolean;
    };
    onceSubmitted: boolean;
}
