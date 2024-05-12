import { Component } from '@angular/core';
import { NavigationComponent } from "../../../../shared/navigation/navigation.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserworkspaceService } from '../../../../shared/services/userworkspace.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavigationComponent, CommonModule, FormsModule]
})
export class DashboardComponent {
    userworkspaces: any[] = [];
    workspace_id: any;
    constructor(
        private userWorkspaceService: UserworkspaceService,
        private route: Router,
        private aRoute: ActivatedRoute,

    ) { }

    ngOnInit(params: Params): void {
        this.aRoute.params.subscribe((params: Params) => {
            this.workspace_id = params['workspace_id'];
            this.fetchUserWorkspace();
        });
    }

    fetchUserWorkspace(): void {
        this.userWorkspaceService.getUserWorkspacesWithWorkspace(this.workspace_id).subscribe(
            (response: any) => {
                this.userworkspaces = response.data["userWorkspace"];
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
}
