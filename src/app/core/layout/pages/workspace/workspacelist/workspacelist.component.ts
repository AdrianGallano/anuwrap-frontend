import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';
import { FormsModule } from '@angular/forms';
import { AiComponent } from "../../../../../shared/ai/ai.component";

@Component({
    selector: 'app-workspacelist',
    standalone: true,
    templateUrl: './workspacelist.component.html',
    styleUrls: ['./workspacelist.component.css'],
    providers: [DatePipe],
    imports: [RouterModule, NavigationBarComponent, CommonModule, FormsModule, AiComponent]
})
export class WorkspacelistComponent implements OnInit {
  workspaces: any[] = [];
  old_workspace: any[] = [];
  workspace_filter = "";
  owner = "";

  owned_workspaces: any[] = [];
  notOwned_workspaces: any[] = [];
  filteredWorkspaces: any[] = [];

  workspaceFilterOption: string = 'all';
  
  private roles: any;

  constructor(
    private workspaceService: WorkspaceService,
    private userWorkspaceService: UserworkspaceService,
    private route: Router,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchWorkspaces();
    this.roles = {
      "1": "superadmin",
      "2": "admin",
      "3": "user"
    };
  }

  fetchWorkspaces(): void {
    this.userWorkspaceService.getUserWorkspaces().subscribe(
      (response) => {
        this.workspaces = response.data.userWorkspace;
        this.owner = response.data.username;
        this.old_workspace = this.workspaces;

        // Separate workspaces based on role_id
        this.owned_workspaces = this.workspaces.filter(workspace => workspace.role_id === 1);
        this.notOwned_workspaces = this.workspaces.filter(workspace => workspace.role_id !== 1);

        console.log(this.workspaces);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching workspaces:', error);
      }
    );
  }

  filterWorkspaces(): void {
    if (this.workspaceFilterOption === 'all') {
      this.filteredWorkspaces = this.workspaces;
    } else if (this.workspaceFilterOption === 'owned') {
      this.filteredWorkspaces = this.owned_workspaces;
    } else if (this.workspaceFilterOption === 'notOwned') {
      this.filteredWorkspaces = this.notOwned_workspaces;
    }
    this.cdr.detectChanges();
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Me';
      case 2:
        return 'admin';
      case 3:
        return this.owner;
      default:
        return '';
    }
  }

  searchWorkspace() {
    this.workspaces = this.old_workspace;
    this.workspaces = this.workspaces.filter(workspace => {
      return workspace.name.includes(this.workspace_filter); 
    });
  }

  navigateToCreateWorkspace(): void {
    this.route.navigate(['/createworkspace']);
  }

  navigateToJoinWorkspace(): void {
    this.route.navigate(['/joinworkspace']);
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
    this.route.navigate(['/leaveworkspace', workspaceId]);
  }
}
