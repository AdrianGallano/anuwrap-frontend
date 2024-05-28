import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../../../shared/services/token.service';

@Component({
  selector: 'app-editworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editworkspace.component.html',
  styleUrl: './editworkspace.component.css'
})
export class EditworkspaceComponent implements OnInit {
  workspaceName: string = '';
  workspaceId: any;
  roleId: { [key: string]: string } = {
    superAdmin: "1",
    admin: "2",
    user: "3"
  };

  constructor(private workspaceService: WorkspaceService, private router: Router, private aRoute: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
      this.fetchWorkspace(this.workspaceId);
    });
  }

  editWorkspace() {
    const userId = this.tokenService.getUserId();
    const workspaceData = {
      name: this.workspaceName,
      user_id: userId,
      workspace_id: this.workspaceId,
      role_id: this.roleId['superAdmin']
    };
  
    this.workspaceService.editWorkspace(workspaceData, this.workspaceId).subscribe(
      (response) => {
        if (response.success) {
          // Update workspaceName with the new name returned from the backend, if available
          if (response.data && response.data.name) {
            this.workspaceName = response.data.name;
          }
        } else {
          console.warn('No workspace data found in the response.');
        }
        this.router.navigate(['../workspacelist']);
      },
      (error) => {
        console.error('Error updating workspace:', error);
      }
    );
  }
  

  fetchWorkspace(workspaceId: any): void {
    this.workspaceService.getWorkspace(workspaceId).subscribe(
      (response) => {
        this.workspaceName = response.data.workspace.name;
      },
      (error) => {
        console.error('Error fetching workspace:', error);
      }
    );
  }
}