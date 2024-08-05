import { Component } from '@angular/core';
import { NavigationComponent } from "../../../../shared/navigation/navigation.component";
import { ActivatedRoute, Params } from '@angular/router';
import { UserworkspaceService } from '../../../../shared/services/userworkspace.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiComponent } from "../../../../shared/ai/ai.component";
import { ReportLineChartComponent } from '../../../../shared/report-line-chart/report-line-chart.component';
import { AnnualReportLineChartComponent } from '../../../../shared/annual-report-line-chart/annual-report-line-chart.component';
import { DashboardIntroCardComponent } from '../../../../shared/dashboard-intro-card/dashboard-intro-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [NavigationComponent, CommonModule, FormsModule, AiComponent, ReportLineChartComponent, AnnualReportLineChartComponent, DashboardIntroCardComponent]
})
export class DashboardComponent {
    userworkspaces: any[] = [];
    workspace_id: any;
    secret_key = "EUNILLELOVEKENT";
    code: any = "";
    categories: any = [];


    constructor(
        private userWorkspaceService: UserworkspaceService,
        private aRoute: ActivatedRoute,
    ) { }

    ngOnInit(params: Params): void {
        this.aRoute.params.subscribe((params: Params) => {
            this.workspace_id = params['workspace_id'];
            this.code = btoa(`${this.workspace_id}${this.secret_key}`);
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