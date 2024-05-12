import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css',
  imports: [RouterModule, NavigationBarComponent, CommonModule],
  providers: [DatePipe]
})
export class WorkspacelistComponent implements OnInit {
  workspaces: any[] = [];
  private roles:any;
  constructor(private workspaceService: WorkspaceService, private userWorkspaceService: UserworkspaceService, private route: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchWorkspaces();
    this.roles = {
      "1": "super admin",
      "2": "admin",
      "3": "user"
    }

  }

  fetchWorkspaces(): void {
    this.workspaceService.getWorkspaces().subscribe(
      (response) => {
        this.workspaces = response.data.workspace;

        this.workspaces.forEach((workspace: any) => {
          this.userWorkspaceService.getUserWorkspace(workspace.workspace_id).subscribe(
            (response: any) => {
              let role = response.data.userWorkspace.role_id;
              workspace.role = this.roles[role]
              console.log(workspace.role);
            },
            (error: any) => {
              if (!error.error) return
              if (error.error['message'] == "userworkspaces not found") {
                this.workspaces = []
              } else {
                console.error('Error fetching userworkspaces:', error);
              }
            });
        }
        );
      },
      (error) => {
        console.error('Error fetching workspaces:', error);
      }
    );

  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Super Admin';
      case 2:
        return 'Admin';
      case 3:
        return 'User';
      default:
        return '';
    }
  }

  navigateToCreateWorkspace(): void {
    this.route.navigate(['/createworkspace']);
  }

  navigateToJoinWorkspace() {
    this.route.navigate([`/joinworkspace`]);
  }

  openWorkspace(workspaceId: any): void {
    this.route.navigate(['/workspace', workspaceId]);
  }

  editWorkspace(workspaceId: any): void {
    this.route.navigate(['/editworkspace', workspaceId]);
  }

  deleteWorkspace(workspaceId: any): void {
    this.route.navigate(['/deleteworkspace', workspaceId]);
  }

  leaveWorkspace(workspaceId: any): void {
    this.userWorkspaceService.deleteUserWorkspace(workspaceId).subscribe(
      (response: any) => {
        this.fetchWorkspaces();
      },
      (error: any) => {
        console.error('Error deleting workspace:', error);
      }
    );
  }
}