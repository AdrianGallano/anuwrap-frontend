import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../../shared/services/report.service';
import { ReportselectionService } from '../../../../../shared/services/reportselection.service';
import { AnnualContentService } from '../../../../../shared/services/annualcontent.service';
import { Observable, forkJoin } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-editreportselection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editreportselection.component.html',
  styleUrl: './editreportselection.component.css'
})
export class EditreportselectionComponent {
  workspaceId: any;
  reports: any[] = [];
  filteredReports: any[] = [];
  error: string | null = null;;
  selectAllChecked = false;
  reportSelections: any[] = [];
  newReportSelections: any[] = [];
  annualContent: any = {
    annual_report_id: 0,
    annual_body: ''
  }
  annual_content_id= 0;
  annualContentArray: any = []
  filterType = 'all';
  selectedYear: string | undefined;
  selectedMonth: string | undefined;
  availableYears: string[] = [];
  availableMonths = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];
  searchTerm: string = '';
  noreportslectionerror: string | null = null;

  constructor(
    private route: Router,
    private aRoute: ActivatedRoute,
    private reportService: ReportService,
    private reportSelectionService: ReportselectionService,
    private annualContentService: AnnualContentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params['params']['workspace_id'];
      this.annualContent.annual_report_id = +params['params']['annual_report_id'];
      this.annual_content_id = +params['params']['annual_content_id'];
      this.fetchData();
      this.fetchReportSelection();
    });
  }

  fetchData(): void {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report;
        // Initialize selected state to false
        this.reports.forEach(report => {
          report.selected = false;
          report.humanizedDate = moment(report.date_created).format('MMMM D, YYYY, h:mm:ss a');
        });
        // Cross-reference with report selections
        this.markSelectedReports();
        this.extractAvailableYears();
        this.filterReports();
      },
      (error) => {
        console.log('Error fetching reports:', error);
      }
    );
  }

  fetchReportSelection(): void {
    this.reportSelectionService.getReportSelections().subscribe(
      (response) => {
        const reportSelections = response.data.reportSelections;
        // Filter report selections for the current annual_report_id
        this.reportSelections = reportSelections.filter((selection: any) => {
          return selection.annual_report_id === this.annualContent.annual_report_id;
        });
        // Cross-reference with reports
        this.markSelectedReports();
      },
      (error) => {
        console.log('Error fetching report selections:', error);
      }
    );
  }

  markSelectedReports(): void {
    if (this.reports.length && this.reportSelections.length) {
      this.reports.forEach(report => {
        const foundSelection = this.reportSelections.find((selection: any) => selection.report_id === report.report_id);
        report.selected = !!foundSelection; // Set to true if found, false otherwise
        console.log(foundSelection)
      });
    }
  }

  extractAvailableYears(): void {
    const yearsSet = new Set<string>();
    this.reports.forEach(report => {
      if (report.date_created) {
        const year = report.date_created.split('-')[0];
        yearsSet.add(year);
      }
    });
    this.availableYears = Array.from(yearsSet);
  }

  filterReports(): void {
    let filtered = this.reports;

    if (this.filterType === 'yearly' && this.selectedYear) {
      filtered = filtered.filter(report => report.date_created && report.date_created.startsWith(this.selectedYear));
    } else if (this.filterType === 'monthly' && this.selectedYear && this.selectedMonth) {
      filtered = filtered.filter(report => {
        const [year, month] = report.date_created.split('-');
        return year === this.selectedYear && month === this.selectedMonth;
      });
    }

    if (this.searchTerm) {
      filtered = filtered.filter(report => report.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    this.filteredReports = filtered;
  }

  onFilterTypeChange(): void {
    this.filterReports();
  }

  searchReports(): void {
    this.filterReports();
  }

  toggleCheckbox(report: any): void {
    report.selected = report.selected;
  }

  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.filteredReports.forEach(report => {
      report.selected = this.selectAllChecked;
    });
  }

  createReportSelection(): void {
    const addRequests: Observable<any>[] = [];
    const deleteRequests: Observable<any>[] = [];
  
    this.reports.forEach(report => {
      const isReportSelected = this.reportSelections.some(selection => selection.report_id === report.report_id);
  
      if (isReportSelected && !report.selected) {
        deleteRequests.push(this.reportSelectionService.deleteReportSelection(this.annualContent.annual_report_id, report.report_id));
      }
      else if (!isReportSelected && report.selected) {
        const payload = { report_id: report.report_id, annual_report_id: this.annualContent.annual_report_id };
        addRequests.push(this.reportSelectionService.createReportSelection(payload));
      }
    });
  
    if (addRequests.length > 0 || deleteRequests.length > 0) {
      forkJoin([...addRequests, ...deleteRequests]).subscribe(
        (responses: any[]) => {
          this.fetchUpdatedReportSelections();
        },
        (error: any) => {
          this.error = 'No changes to submit';
          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
      );
    } else {
      this.fetchUpdatedReportSelections();
    }
  }
  
  fetchUpdatedReportSelections(): void {
    this.reportSelectionService.getFilterReportSelections(this.annualContent.annual_report_id).subscribe(
      (response) => {
        this.newReportSelections = response.data.reportSelections;
        this.annualContentArray = this.newReportSelections.map((selection: any) => selection.body);
        this.annualContent.annual_body = this.annualContentArray.join('<br>');
  
        this.annualContentService.editAnnualContent(this.annualContent, this.annual_content_id).subscribe(
          (response) => {
            this.navigateToAnnualReportList();
          },
          (error) => {
            console.log('Error editing annual content:', error);
            this.navigateToAnnualReportList();
          }
        );
      },
      (error) => {
        console.log('Error fetching report selections:', error.error.message);
        
        this.noreportslectionerror = "Please select a report"
        setTimeout(() => {
          this.noreportslectionerror = null;
        }, 3000);
      }
    );
  }

  navigateToAnnualReportList(): void {
    this.route.navigate([`../../../annual_content/${this.annual_content_id}`], { relativeTo: this.aRoute });

 }

  navigateToViewAnnualReport(): void {
    this.route.navigate([`../../../annual_content/${this.annual_content_id}`], { relativeTo: this.aRoute });
 
  }
}