import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { UserService } from '../../../../../shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterModule, NavigationBarComponent, FormsModule, CommonModule, AiComponent]
})
export class ProfileComponent implements OnInit {
  user = {
    user_id: 0,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    imageName: ""
  };

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUserInformation().subscribe(
      (response) => {
        this.user.user_id = response.data.user.user_id;
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
        this.user.imageName = response.data.user.image_name;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  uploadAvatar(event:any): void {

    this.userService.createUserAvatar(event, this.user.user_id).subscribe(
      (response) => {
        console.log(response)
        this.fetchUser();
      },
      (error) => {
        console.error('Error uploading user avatar:', error);
      }
    );
  }
}