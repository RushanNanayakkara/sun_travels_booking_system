import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  
  panelOpenState = false;
  activeUserType = null;
  
  constructor(
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.activeUserType = this.authService.getLoggedInUser().tenantId;
  }

  signOut(){
    this.authService.signOut();
  }

}
