import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})

export class NavigationBarComponent implements OnInit {
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.getData();
  }

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(private userService: UserService, private tokenService: TokenService, private route: Router) { }

  getData(): void {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
        console.log('User Data:', response.data.user);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  signOut(): void {
    this.tokenService.clearAuth();
    this.route.navigate(["../login"]);
  }

}

