import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { ActivityRecord } from 'src/app/shared/models/data-object/ActiviryRecord';
import { Reservation } from 'src/app/shared/models/data-object/Reservation';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit,OnDestroy {

  subscriptions:Subscription[] = [];
  reservationList:Reservation[];
  displayedColumns: string[] = [
    'position','employeeId', 'reservationUuid', 'actionType', 'timestamp'
  ];
  dataSource:ActivityRecord[];
  
  constructor(private router:Router,
              private userService:UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getActivity(0,10).subscribe(activityList=>{
        this.dataSource = activityList;
      })
    )
  }

  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goBack(){
    this.router.navigateByUrl('/search/room');
  }

}
