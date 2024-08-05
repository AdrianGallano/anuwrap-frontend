import { Component } from '@angular/core';
import { NavigationComponent } from "../../../../shared/navigation/navigation.component";
import { AiComponent } from "../../../../shared/ai/ai.component";
import { ReportLineChartComponent } from '../../../../shared/report-line-chart/report-line-chart.component';
import { AnnualReportLineChartComponent } from '../../../../shared/annual-report-line-chart/annual-report-line-chart.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NavigationComponent, AiComponent, ReportLineChartComponent, AnnualReportLineChartComponent],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {

}

