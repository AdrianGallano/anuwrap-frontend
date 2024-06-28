import { AfterViewInit, Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    templateUrl: './navigation-bar.component.html',
    styleUrl: './navigation-bar.component.css',
    imports: [RouterModule, DropdownComponent]
})

export class NavigationBarComponent implements OnInit, AfterViewInit{
  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    // Initialize Flowbite after the view has been initialized
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    imageName: ""
  };

  constructor(private userService: UserService, private tokenService: TokenService, private route: Router, private aRoute: ActivatedRoute) { }

  getData(): void {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
        this.user.imageName = response.data.user.image_name;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  signOut(): void {
    this.route.navigate([`/logout-confirm`], { relativeTo: this.aRoute });
}

}

