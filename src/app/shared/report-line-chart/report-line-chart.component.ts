import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ReportService } from '../services/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { format, subMonths, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-report-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-line-chart.component.html',
  styleUrls: ['./report-line-chart.component.css']
})
export class ReportLineChartComponent implements OnInit {
  public reports: any[] = [];
  public workspaceId: number | undefined;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.getLast6MonthsLabels(),
    datasets: [
      {
        data: this.getMonthlyReportCounts([]),
        label: 'Report Creations',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,255,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  public lineChartLegend = true;

  constructor(private reportService: ReportService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = +params['params']['workspace_id'];
      this.getReports();
    });
  }

  getReports() {
    if (this.workspaceId === undefined) return;

    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report;
        console.log(this.reports)
        this.updateChart();
      }
    );
  }

  updateChart() {
    const monthlyCounts = this.getMonthlyReportCounts(this.reports);
    this.lineChartData = {
      labels: this.getLast6MonthsLabels(),
      datasets: [
        {
          data: monthlyCounts,
          label: 'Report Creations',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(0,0,255,0.3)'
        }
      ]
    };
  }

  getMonthlyReportCounts(reports: any[]): number[] {
    const counts = Array(6).fill(0);
    const today = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(today, i).getMonth());
    const yearMonths = Array.from({ length: 6 }, (_, i) => format(subMonths(today, i), 'yyyy-MM'));

    reports.forEach(report => {
      const reportDate = new Date(report.date_created);
      const reportMonth = format(reportDate, 'yyyy-MM');
      const monthIndex = yearMonths.indexOf(reportMonth);
      if (monthIndex !== -1) {
        counts[5 - monthIndex] += 1; // 5 - monthIndex to match the reverse order
      }
    });

    return counts;
  }

  getLast6MonthsLabels(): string[] {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => format(subMonths(today, 5 - i), 'MMMM yyyy'));
  }
}
