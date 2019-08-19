import {ComponentState} from '../../../../../component.state';
import {Orientation} from '../../../../../models/device-orientation';
import {EmployeeList} from '../../../../../models';

export interface CashierDashboardScreenState extends ComponentState {
  cashierList?: EmployeeList;
  orientation: Orientation;
}
