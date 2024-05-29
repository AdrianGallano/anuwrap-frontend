import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UserworkspaceService } from '../../../../../shared/services/userworkspace.service';
import { FormsModule } from '@angular/forms';
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite';

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css',
  imports: [RouterModule, NavigationBarComponent, CommonModule, FormsModule],
  providers: [DatePipe]
})
export class WorkspacelistComponent implements OnInit {
  workspaces: any[] = [];
  old_workspace: any[] = [];
  workspace_filter= ""
  private roles:any;
  constructor(private workspaceService: WorkspaceService, private userWorkspaceService: UserworkspaceService, private route: Router, private datePipe: DatePipe, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
    this.fetchWorkspaces();
    this.roles = {
      "1": "superadmin",
      "2": "admin",
      "3": "user"
    }

  }

  fetchWorkspaces(): void {
    this.userWorkspaceService.getUserWorkspaces().subscribe(
      (response) => {
        this.workspaces = response.data.userWorkspace;
        this.old_workspace = this.workspaces;
      },
      (error) => {
        console.error('Error fetching workspaces:', error);
      }
    );
    this.cdr.detectChanges();
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'superadmin';
      case 2:
        return 'admin';
      case 3:
        return 'user';
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
    this.route.navigate(['/leaveworkspace', workspaceId]);
  }
}