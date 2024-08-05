import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [RouterModule, DropdownComponent]
})
export class NavigationComponent implements OnInit {
  workspaceId: any;
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params['params']['workspace_id'];
    });

    this.getData();
  }

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(private userService: UserService, private tokenService: TokenService, private route: Router, private aRoute: ActivatedRoute) { }

  getData(): void {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
  signOut(): void {
    this.tokenService.clearAuth();
}
 
  navigateToAnnualReportList(){
    this.route.navigate([`../annualreportlist`], { relativeTo: this.aRoute });
  }

  navigateToReportList(){
    this.route.navigate([`../reportlist`], { relativeTo: this.aRoute });
  }

  navigateToAnalytics(){
    this.route.navigate([`../analytics`], { relativeTo: this.aRoute });
  }

  navigateToChatWithAI(){
    this.route.navigate([`../chatwithai`], { relativeTo: this.aRoute });
  }
}