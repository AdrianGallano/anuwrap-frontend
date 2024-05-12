import { Component } from '@angular/core';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TokenService } from '../../../../../shared/services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-joinworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './joinworkspace.component.html',
  styleUrl: './joinworkspace.component.css'
})
export class JoinworkspaceComponent {
  private userWorkspaces: any[] = [];
  private userId: any;
  userWorkspaceData = {
    user_id: 0,
    workspace_id: 0,
    role_id: 0
  };
  error=""

  constructor(private userWorkspaceService: UserworkspaceService, private route: Router,private aRoute: ActivatedRoute, private tokenService: TokenService) {
    this.userId = this.tokenService.getUserId();
  }


  fetchUserWorkspaces() {

    this.userWorkspaceService.getUserWorkspaces().subscribe(
      (response: any) => {
        this.userWorkspaces = response.data.workspace;

      },
      (error: any) => {
        if (!error.error) return
        if (error.error['message'] == "workspaces not found") {
          this.userWorkspaces = []
        } else {
          console.error('Error fetching workspaces:', error);
        }
      }
    );
  }

  joinUserWorkspace() {
    this.userWorkspaceData.user_id = this.userId;
    this.userWorkspaceData.role_id = 3;
    console.log(this.userWorkspaceData)
    this.userWorkspaceService.createUserWorkspace(this.userWorkspaceData).subscribe(
      (response: any) => {
        if (response.data) {
        }
        this.route.navigate(['../workspacelist'])
      },
      (error: any) => {
        this.error = "workspace id does not exist"
      }
    );
  }

  navigateToWorkspaceList(){
    this.route.navigate([`../workspacelist`], {relativeTo: this.aRoute});
  }

}
