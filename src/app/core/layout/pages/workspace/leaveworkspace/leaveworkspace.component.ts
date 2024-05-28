import { Component } from '@angular/core';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-leaveworkspace',
  standalone: true,
  imports: [],
  templateUrl: './leaveworkspace.component.html',
  styleUrl: './leaveworkspace.component.css'
})
export class LeaveworkspaceComponent {
  workspaces: any[] = [];
  workspaceId= 0;
  workspaceName='';
  constructor( private userWorkspaceService: UserworkspaceService, private router: Router, private aRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchWorkspace(this.workspaceId);
  }
  
  fetchWorkspace(workspaceId: any): any {
    // Call authService to get the list of workspaces
    this.userWorkspaceService.getUserWorkspace(workspaceId).subscribe(
      (response: any) => {
        this.workspaceName = response.data.userWorkspace.name
      },
      (error: any) => {
        if (!error.error) return
        if (error.error['message'] == "workspaces not found") {
          console.error("Workspace not found")
        } else {
          console.error('Error fetching workspaces:', error);
        }
      }
    );
  }

  leaveWorkspace(): void {
    if (this.workspaceId) {
      this.userWorkspaceService.deleteUserWorkspace(this.workspaceId).subscribe(
        (response: any) => {
          this.goToWorkspaceList();
        },
        (error: any) => {
          console.error('Error deleting workspace:', error);
        }
      );
    } else {
      console.error('Workspace ID is missing.');
    }
  }

  goToWorkspaceList() {
    this.router.navigate(["/workspacelist"]);
  }

}
