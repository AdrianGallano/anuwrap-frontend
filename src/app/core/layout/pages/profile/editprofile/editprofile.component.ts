import { Component, OnInit } from '@angular/core';
import { RouterModule, Route, Router } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { UserService } from '../../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [RouterModule, NavigationBarComponent, CommonModule, FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {
    username: "",
    first_name: "",
    last_name: "",
    email: ""
  };

  

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.first_name = response.data.user.first_name;
        this.user.last_name = response.data.user.last_name;
        this.user.email = response.data.user.email;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  editUser(): void {
    delete this.user.username;
    delete this.user.email;
    this.userService.editUserInformation(this.user).subscribe(
      (response) => {
        this.route.navigate(["/profile"]);
      },
      (error) => {
        console.error('Error fetching user information:', error);
        console.log(this.user)
      }
    );
  }
}
