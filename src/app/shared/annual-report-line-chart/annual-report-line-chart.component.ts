import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AnnualreportService } from '../services/annualreport.service';
import { ActivatedRoute, Params } from '@angular/router';
import { format, subMonths, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-annual-report-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './annual-report-line-chart.component.html',
  styleUrls: ['./annual-report-line-chart.component.css']
})
export class AnnualReportLineChartComponent implements OnInit {
  public annual_reports: any[] = [];
  public workspaceId: number | undefined;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.getLast6MonthsLabels(),
    datasets: [
      {
        data: this.getMonthlyReportCounts([]),
        label: 'Annual Report Creations',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,255,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  public lineChartLegend = true;

  constructor(private annualReportService: AnnualreportService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = +params['params']['workspace_id'];
      this.getAnnualReports();
    });
  }

  getAnnualReports() {
    if (this.workspaceId === undefined) return;

    this.annualReportService.getAnnualReports(this.workspaceId).subscribe(
      (response) => {
        this.annual_reports = response.data.reports;
        this.updateChart();
      }
    );
  }

  updateChart() {
    const monthlyCounts = this.getMonthlyReportCounts(this.annual_reports);
    this.lineChartData = {
      labels: this.getLast6MonthsLabels(),
      datasets: [
        {
          data: monthlyCounts,
          label: 'Annual Report Creations',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(0,255,0,0.3)'
        }
      ]
    };
  }

  getMonthlyReportCounts(annual_reports: any[]): number[] {
    const counts = Array(6).fill(0);
    const today = new Date();
    const months = Array.from({ length: 6 }, (_, i) => subMonths(today, i).getMonth());
    const yearMonths = Array.from({ length: 6 }, (_, i) => format(subMonths(today, i), 'yyyy-MM'));

    annual_reports.forEach(annual_report => {
      const annualReportDate = new Date(annual_report.date_created);
      const annualReportMonth = format(annualReportDate, 'yyyy-MM');
      const monthIndex = yearMonths.indexOf(annualReportMonth);
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





