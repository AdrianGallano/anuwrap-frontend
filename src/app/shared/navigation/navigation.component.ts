import { ChangeDetectorRef, Component, AfterViewInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  workspaceId: any;

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    imageName: ""
  };

  constructor(private cdr: ChangeDetectorRef, private userService: UserService, private tokenService: TokenService, private route: Router, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params['params']['workspace_id'];
    });

    this.getData();
  }

  ngAfterViewInit(): void {
    // Initialize Flowbite after the view has been initialized
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }

  getData(): void {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
        this.user.imageName = response.data.user.image_name;
        this.cdr.detectChanges(); // Ensure the view is updated
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  signOut(): void {
    this.route.navigate([`/logout-confirm`], { relativeTo: this.aRoute });
  }

  navigateToAnnualReportList(){
    this.route.navigate([`../annualreportlist`], { relativeTo: this.aRoute });
  }

  navigateToReportList(){
    this.route.navigate([`../reportlist`], { relativeTo: this.aRoute });
  }

  navigateToChatWithAI(){
    this.route.navigate([`../chatwithai`], { relativeTo: this.aRoute });
  }
}
