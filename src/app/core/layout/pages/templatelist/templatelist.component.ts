import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { TemplatelistParentComponent } from '../report/templatelist-parent/templatelist-parent.component';
import { ContentService } from '../../../../shared/services/content.service';
import { response } from 'express';
import { AiComponent } from '../../../../shared/ai/ai.component';
import { CommonModule } from '@angular/common';
import { chdir } from 'process';

@Component({
  selector: 'app-templatelist',
  standalone: true,
  templateUrl: './templatelist.component.html',
  styleUrl: './templatelist.component.css',
  imports: [
    RouterModule,
    TemplatelistParentComponent,
    AiComponent,
    CommonModule,
  ],
})
export class TemplatelistComponent {
  report = {
    report_id: 0,
    title: '',
    report_type_id: 0,
  };

  content = {
    report_id: 0,
    body: '',
  };

  contentId: number = 0;

  templates: any[] = [
    {
      image: '../../../../../assets/img/blanktemplate.png',
      code: '',
    },
    {
      image: '../../../../../assets/img/accomplishment.png',
      code: `<hr>
      <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" width="81" height="90"></div>
      <p><span style="font-size: 12pt;"><img src="../../../../../assets/img/GC.png" width="76" height="76"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
      <p style="line-height: 1.1;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;"><strong>Faculty</strong><br><span style="font-size: 12pt;"><strong>ACCOMPLISHMENT REPORT</strong></span><span style="font-weight: bold;"><br>2nd Semester A.Y. 2023 - 2024<br>&nbsp; &nbsp;&nbsp;</span></p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1; text-align: left;"><span style="font-size: 14pt;"><strong><div class="break"></div></strong></span></p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <hr>
      <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" width="81" height="90"></div>
      <p><span style="font-size: 12pt;"><img style="float: left;" src="../../../../../assets/img/GC.png" width="76" height="76"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;"><div class="break"></div></p>
      <p>&nbsp;</p>
      <hr>
      <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" width="81" height="90"></div>
      <p><span style="font-size: 12pt;"><img style="float: left;" src="../../../../../assets/img/GC.png" width="76" height="76"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: left;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <hr>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
        `,
    },
    {
      image: '../../../../../assets/img/faculty.png',
      code: `<hr>
        <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="../../../../../assets/img/CCS.png" width="129" height="129"></div>
        <p><span style="font-size: 12pt;"><img style="float: left;" src="../../../../../assets/img/GC.png" width="130" height="130"></span></p>
        <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 8pt;">City Of Olongapo</span> <span style="font-weight: bold;"><br>GORDON COLLEGE <br>COLLEGE OF COMPUTER STUDIES </span><br><span style="font-size: small;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200 <br>Telefax No.: (047) 602-7175 loc 322<br><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a></span></p>
        <p style="line-height: 1.1; text-align: center;"><strong>FACULTY MATRIX</strong><br>2nd Semester A.Y. 2023-2024</p>
        <table style="border-collapse: collapse; width: 94.4948%; height: 329.222px;" border="1"><colgroup><col style="width: 4.67128%;"><col style="width: 4.67128%;"><col style="width: 3.38499%;"><col style="width: 3.45269%;"><col style="width: 3.11419%;"><col style="width: 4.19738%;"><col style="width: 10.3581%;"><col style="width: 8.12397%;"><col style="width: 7.85317%;"><col style="width: 6.97307%;"><col style="width: 6.70227%;"><col style="width: 6.70227%;"><col style="width: 7.10847%;"><col style="width: 7.78547%;"><col style="width: 14.8262%;"></colgroup>
        <tbody>
        <tr style="height: 82.1806px;">
        <td style="text-align: center;" colspan="3"><span style="font-size: 8pt;">Name</span></td>
        <td style="text-align: center;" rowspan="2"><span style="font-size: 8pt;">AGE</span><br><span style="font-size: 8pt;"><br></span></td>
        <td style="text-align: center;" rowspan="2"><span style="font-size: 8pt;">SEX</span><br><span style="font-size: 8pt;"><br></span></td>
        <td style="text-align: center;" rowspan="2">
        <p><span style="font-size: 8pt;">TENURE</span><br><span style="font-size: 8pt;">(P/COS)</span></p>
        </td>
        <td style="text-align: center;" rowspan="2">
        <p><span style="font-size: 8pt;">Related Certification/Appropriate Current PRC License</span></p>
        </td>
        <td style="text-align: center;" colspan="5">Educational Background (Specify Degree Obtained)</td>
        <td style="text-align: center;" rowspan="2">
        <p><span style="font-size: 8pt;">&nbsp;</span></p>
        <p><span style="font-size: 8pt;">Designation</span></p>
        </td>
        <td style="text-align: center;" rowspan="2">
        <p><span style="font-size: 8pt;">Teaching experience (No. of years)</span></p>
        </td>
        <td style="text-align: center;" rowspan="2">
        <p><span style="font-size: 8pt;">Membership in Professional Organization</span></p>
        </td>
        </tr>
        <tr style="height: 113.819px;">
        <td style="text-align: center;"><span style="font-size: 8pt;">Last Name</span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">First Name</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Middle Initial</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Doctorate Degree</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Master&rsquo;s Degree</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Baccalaureate Degree</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Specialization</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Enrollment Status (Enrolled or Not enrolled)</span></p>
        </td>
        </tr>
        <tr style="height: 133.222px;">
        <td style="text-align: center;"><span style="font-size: 8pt;">Ferreol</span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Ashley Kier</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Grey</span></p>
        </td>
        <td style="text-align: center;"><span style="font-size: 8pt;">25</span></td>
        <td style="text-align: center;"><span style="font-size: 8pt;">M</span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">P</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">NCII Computer Technology</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">N/A</span></p>
        </td>
        <td style="text-align: center;"><span style="font-size: 8pt;">Masters in Science In Computer Science</span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Bachelor of Science In Computer Science</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Computer Science</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Enrolled</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">Program Coordinator</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">7 Years</span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;">1. Philippine Society of Computer Science<br>2. Association of computing education Deans and Program Heads</span></p>
        </td>
        </tr>
        </tbody>
        </table>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>`,
    },
  ];

  selectedTemplate: any;

  constructor(
    private aRoute: ActivatedRoute,
    private route: Router,
    private contService: ContentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      const title = params['params']['title'];
      const reportTypeId = params['params']['report_type_id'];
      const reportId = params['params']['report_id'];

      this.report.report_type_id = reportTypeId
        ? parseInt(reportTypeId, 10)
        : 0;
      this.content.report_id = reportId ? parseInt(reportId, 10) : 0;
      this.report.title = title || '';
      console.log(this.content.report_id);
    });
    const modal = document.getElementById('defaultModal');
    if (modal) {
    } else {
      console.error('Modal with id defaultModal not found or not initialized.');
    }
  }

  selectTemplate(template: any): void {
    this.selectedTemplate = template;
    this.content.body = template.code;
  }

  pickTemplate(templateIndex: number): void {
    console.log(this.content)
    this.contService.createContent(this.content).subscribe(
      (response) => {
        this.contentId = response.data.content.content_id;
        this.route.navigate([`./content/${this.contentId}`], {
          relativeTo: this.aRoute,
        });
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error creating content:', error);
      }
    );
  }

  navigateToReportList(): void {
    this.route.navigate([`../../reportlist`], { relativeTo: this.aRoute });
  }
}
