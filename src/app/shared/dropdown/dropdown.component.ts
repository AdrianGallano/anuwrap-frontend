import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    imageName: ""
  };

  constructor(private userService: UserService, private route: Router, private aRoute: ActivatedRoute, private cdr: ChangeDetectorRef ){}
  
  ngOnInit(): void {
    this.getData();
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


  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
