import { Component, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationComponent } from "../../../../shared/navigation/navigation.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserworkspaceService } from '../../../../shared/services/userworkspace.service';
import { ReportService } from '../../../../shared/services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiComponent } from "../../../../shared/ai/ai.component";
import dayjs from 'dayjs';
import { ReportLineChartComponent } from '../../../../shared/report-line-chart/report-line-chart.component';
import { AnnualReportLineChartComponent } from '../../../../shared/annual-report-line-chart/annual-report-line-chart.component';
import { DashboardIntroCardComponent } from '../../../../shared/dashboard-intro-card/dashboard-intro-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [NavigationComponent, CommonModule, FormsModule, AiComponent, ReportLineChartComponent, AnnualReportLineChartComponent, DashboardIntroCardComponent]
})
export class DashboardComponent implements AfterViewInit {
    userworkspaces: any[] = [];
    workspace_id: any;
    secret_key = "EUNILLELOVEKENT";
    code: any = "";
    percentageChange: any = 0;
    timeframe: any = "";
    numberOfReports: any = 0;
    reports: any = [];
    createdReportCounts: any = [];
    modifiedReportCounts: any = [];
    categories: any = [];

    options = {
        // set the labels option to true to show the labels on the X and Y axis
        xaxis: {
            show: true,
            categories: this.categories,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value: any) {
                    return value;
                }
            }
        },
        series: [
            {
                name: "Created Reports",
                data: this.createdReportCounts,
                color: "#1A56DB",
            },
            {
                name: "Modified Reports",
                data: this.modifiedReportCounts,
                color: "#7E3BF2",
            },
        ],
        chart: {
            sparkline: {
                enabled: false
            },
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 6,
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
    };

    constructor(
        private userWorkspaceService: UserworkspaceService,
        private reportService: ReportService,
        private aRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(params: Params): void {
        this.aRoute.params.subscribe((params: Params) => {
            this.workspace_id = params['workspace_id'];
            this.code = btoa(`${this.workspace_id}${this.secret_key}`);
            this.fetchUserWorkspace();
            this.fetchReports();
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            import('apexcharts').then(({ default: ApexCharts }) => {
                if (document.getElementById("grid-chart") && typeof ApexCharts !== 'undefined') {
                    const chart = new ApexCharts(document.getElementById("grid-chart"), this.options);
                    chart.render();
                }
            });
        }
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

    setTimeframe(timeframe: any): void {
        this.timeframe = timeframe;
        this.calculateReportCounts();
        this.updateChart();
    }

    fetchReports(): void {
        this.reportService.getReports(this.workspace_id).subscribe(
            (response: any) => {
                this.reports = response.data.report;
                this.numberOfReports = this.reports.length;
                this.calculateReportCounts();
                this.updateChart();
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    calculateReportCounts(): void {
        const timeframeDays = this.getTimeframeDays();
        this.categories = timeframeDays.map(day => day.format('DD MMM'));
        this.createdReportCounts = new Array(timeframeDays.length).fill(0);
        this.modifiedReportCounts = new Array(timeframeDays.length).fill(0);

        this.reports.forEach((report: any) => {
            const createdDate = dayjs(report.date_created);
            const modifiedDate = dayjs(report.date_modified);

            timeframeDays.forEach((day, index) => {
                if (createdDate.isSame(day, 'day')) {
                    this.createdReportCounts[index]++;
                }
                if (modifiedDate.isSame(day, 'day')) {
                    this.modifiedReportCounts[index]++;
                }
            });
        });
    }

    getTimeframeDays(): dayjs.Dayjs[] {
        let startDate;
        switch (this.timeframe) {
            case 'yesterday':
                startDate = dayjs().subtract(1, 'day');
                break;
            case 'day':
                startDate = dayjs();
                break;
            case 'week':
                startDate = dayjs().subtract(7, 'day');
                break;
            case 'month':
                startDate = dayjs().subtract(30, 'day');
                break;
            default:
                startDate = dayjs().subtract(7, 'day');
                break;
        }

        const days = [];
        for (let i = 0; i <= dayjs().diff(startDate, 'day'); i++) {
            days.push(startDate.add(i, 'day'));
        }
        return days;
    }

    updateChart(): void {
        const chartElement = document.getElementById("grid-chart");
        if (chartElement) {
            const chart = new ApexCharts(chartElement, {
                ...this.options,
                xaxis: {
                    ...this.options.xaxis,
                    categories: this.categories,
                },
                series: [
                    {
                        name: "Created Reports",
                        data: this.createdReportCounts,
                        color: "#1A56DB",
                    },
                    {
                        name: "Modified Reports",
                        data: this.modifiedReportCounts,
                        color: "#7E3BF2",
                    },
                ],
            });
            chart.render();
        }
    }
}