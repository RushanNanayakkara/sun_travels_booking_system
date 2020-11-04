import { Timestamp } from 'rxjs';

export interface ActivityRecord{
    activityLogId:number;
    userId:number;
    reservationId:number;
    actionType:string;
    timestamp: Date;
    employeeId:string;
    uuid:string;
}