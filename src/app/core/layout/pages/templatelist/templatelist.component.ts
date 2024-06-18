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
      code: `
      <hr>
        <p><img src="../../../../../assets/img/header2.jpg" width="1205" height="242"></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">BSEMC Accomplishment Comprehensive Narrative Report</span></strong></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Renewal of Institutional Membership for Animation Council of the Philippines (ACPI)</span></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Gordon College &ndash; College of Computer Studies renewed it&rsquo;s academic membership with Animation Council of the Philippines (ACPI). This renewal signifies our unwavering commitment in the field of animation and our dedication to supporting the initiatives of ACPI. Our institution has long recognized the vital role played by ACPI in advancing and promoting the field of animation in the Philippines. Since our initial membership commencement on September 2021, our active involvement in ACPI has been a source of pride. Renewing our membership was a natural choice to maintain our contributions to the growth and development of our BSEMC students in the field of animation.</span></p>
        <p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">The renewal of our institutional membership with the Animation Council of the Philippines is a testament to our enduring commitment to the growth and excellence our BSEMC Students in the field of animation. We eagerly anticipate continuing our active involvement, collaborating with fellow members and academic institutions, and contributing to ACPI's mission to further enhance the country's animation landscape.</span></p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;"><img src="../../../../../assets/img/footer2.jpg" width="1201" height="166"><div class="break"></div></p>
        <hr>
        <p><img src="../../../../../assets/img/header2.jpg" width="1205" height="242"></p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p style="line-height: 1.1;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1.1;">&nbsp;</p>
        <p style="line-height: 1; text-align: left;"><img src="../../../../../assets/img/footer2.jpg" width="1201" height="166"></p>
        <p style="line-height: 1.1;"><div class="break"></div></p>`,
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
        <td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
        <td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;"><span style="font-size: 8pt;"></span></td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
        </td>
        <td style="text-align: center;">
        <p><span style="font-size: 8pt;"></span></p>
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
    {
      image:`../../../../../assets/img/teachingandmonitoring.png` ,
      code: `<hr>
      <div style="float: right; margin-right: 10px; border-radius: 50px;"><img src="assets/img/CCS.png" width="81" height="90"></div>
      <p><img style="float: left;" src="assets/img/GC.png" width="76" height="76"></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt;">Republic of the Philippines&nbsp;</span><br><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></p>
      <p style="line-height: 1.1; text-align: center;"><br><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Teaching and Learning Monitoring Form -2</span></strong></p>
      <p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Faculty:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College/Department:</span></span></p>
      <p class="MsoNormal" style="text-align: left;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"> &nbsp;Date Covered:</span></span><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date Submitted:</span></span></p>
      <div align="center">
      <table class="MsoTableGrid" style="border-collapse: collapse; mso-table-layout-alt: fixed; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;" border="1" width="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">No.</span></strong></p>
      </td>
      <td style="width: 88.7pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Courses Handled /</span></strong></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Year &amp; Section</span></strong></p>
      </td>
      <td style="width: 74.35pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="3" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Module Number</span></strong></p>
      </td>
      <td style="width: 9.0cm; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="4" width="410">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Synchronous</span></strong></p>
      </td>
      <td style="width: 239.2pt; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="3" width="282">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Asynchronous</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 1;">
      <td style="width: 9.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="4" width="410">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Virtual</span></strong></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Platform</span></strong></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Schedule of Consultations</span></strong></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" rowspan="2" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Activities</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 2;">
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Platform</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Schedule of Meeting</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Meeting ID</span></strong></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Password / Class Password</span></strong></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;">Activities</span></strong></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 3;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSEMC1A &amp; 1B</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1 - 3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T.<br>2:30 &ndash; 3:30 P.M.</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 9.0pt; line-height: 150%; font-family: 'Arial',sans-serif; color: #5f6368; letter-spacing: .25pt; background: white;">meet.google.com/gyo-qvbw-apm</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T. </span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">12:00 &ndash; 1:00 P.M</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 4;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">2</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSCS-1A</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1.3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">W.Th.</span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">6:00<span style="mso-spacerun: yes;">&nbsp; </span>&ndash; 7:00 P.M</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 13.5pt;" align="center"><span lang="EN-US" style="font-size: 9.0pt; color: #70757a;">https://meet.google.com/cmm-axge-mcr</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">WTh <br>9:00 &ndash; 11:30 A.M.</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      <tr style="mso-yfti-irow: 5; mso-yfti-lastrow: yes;">
      <td style="width: 28.1pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="38">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">3</span></p>
      </td>
      <td style="width: 88.7pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="101">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">BSIT1A &ndash; 1B</span></p>
      </td>
      <td style="width: 74.35pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="82">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">1 - 3</span></p>
      </td>
      <td style="width: 63.75pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="79">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Friday</span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-family: 'Times New Roman',serif;">10:00 <span style="mso-spacerun: yes;">&nbsp;</span>12:00 P.M.</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="172">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 13.5pt;" align="center"><span lang="EN-US" style="font-size: 9.0pt; color: #70757a;">https://meet.google.com/rgw-wzrz-hmp</span></p>
      </td>
      <td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="80">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      <td style="width: 77.95pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Google Meet /LAMP</span></p>
      </td>
      <td style="width: 3.0cm; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="110">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">M.T. </span></p>
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">12:00 &ndash; 1:00 P.M.</span></p>
      </td>
      <td style="width: 76.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" width="86">
      <p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: 150%;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 150%; font-family: 'Times New Roman',serif;">Module</span></p>
      </td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal; tab-stops: 63.8pt 326.05pt 630.8pt;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><span style="font-size: 12pt;">Reynaldo G. Bautista Jr </span></span><span style="font-size: 12pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <u><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Dr. Erlinda C. Abarintos</span></u></span><span style="font-size: 12pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Ms. Kristin Mendoza</span></u></span></span></span><u><span style="font-weight: bold;"><br></span></u><span style="font-size: 8pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature of Faculty&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dean, College of Computer Studies&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Head, HRMU</span></span></span></span></strong></p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;">&nbsp;</p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 10pt;">GC-Acad-Form-<span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp;</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<u><br></u></span><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span style="font-size: 10pt;">cc. VPA</span></span></span></span><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-size: 10pt;">A, Dean, HRMU, Faculty&nbsp;&nbsp;</span></span></span></span></span><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"> &nbsp;</span></span></span></span></strong></p>
      <p class="MsoNormal" style="margin-bottom: 0.0001pt; line-height: normal; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><div class="break"></div></span></span></span></span></strong></p>
      </div>`,
    },
    {
      image:`../../../../../assets/img/facultysched.png` ,
      code: `<hr>
      <div style="float: right; margin-right: 10px; border-radius: 50px;"><span style="font-family: arial, helvetica, sans-serif;"><img src="../../../../../assets/img/CCS.png" width="76" height="76"></span></div>
      <p><span style="font-family: arial, helvetica, sans-serif;"><img style="float: left;" src="../../../../../assets/img/GC.png" width="76" height="76"></span></p>
      <p style="line-height: 1.1; text-align: center;"><span style="font-size: 8pt; font-family: arial, helvetica, sans-serif;">Republic of the Philippines&nbsp;</span><br><span style="font-family: arial, helvetica, sans-serif;"><span style="font-weight: bold;"><span style="font-size: 8pt;">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</span><br></span><span style="font-size: 8pt;">City of Olongapo</span><span style="font-weight: bold;"><br></span><span style="font-size: 14pt;"><strong>GORDON COLLEGE</strong></span></span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 12pt;">INDIVIDUAL FACULTY LOAD AND SCHEDULE</span></strong> </span></p>
      <p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif;"> <strong><span lang="EN-US" style="font-size: 9.0pt; color: black; mso-bidi-font-style: italic;">Semester: 1st, Academic Year: <u>2022 - 2023</u></span></strong> </span></p>
      <p style="line-height: 0.5; text-align: center;">&nbsp;</p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Name of Professor/Instructor:&nbsp;<strong>NAME</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Field of Specialization: <strong>Computer Science</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Highest Educational Qualification: <strong>BACHELOR OF SCIENCE IN COMPUTER SCIENCE</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Academic Rank:&nbsp;<strong>INSTRUCTOR II&nbsp; &nbsp;</strong>Status:&nbsp; X&nbsp; Full-Time(COS)&nbsp; Part-Time(COS)&nbsp; Regular</span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">College/Department:&nbsp;<strong>College of Computer Studies</strong></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Consultation Hours for Students:&nbsp;<strong>MT&nbsp;</strong>(7:00 A.M. - 10:00 A.M.);&nbsp;<strong>Wednesday&nbsp;</strong>(7:00 A.M. - 10:00 A.M.);</span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;">Official Time In and Out: <span lang="EN-US" style="font-size: 9pt; color: black;">MT (7:00 A.M. &ndash; 7:00 P.M.); W (7:00 A.M.&ndash; 8:00 P.M.); Th (7:00 A.M.&ndash; 7:00 P.M.); </span></span></p>
      <p style="line-height: 0.5; text-align: center;"><span lang="EN-US" style="font-size: 9pt; color: black; font-family: arial, helvetica, sans-serif;"><span lang="EN-US" style="font-size: 9pt; color: black;">Fri (7:00 P.M. - 5:00 P.M.);</span></span></p>
      <p><span lang="EN-US" style="font-size: 9.0pt; color: black; mso-bidi-font-style: italic;"><span lang="EN-US" style="font-size: 9pt; color: black;">Regular Teaching Load:</span></span></p>
      <table style="border-collapse: collapse; width: 100%; height: 159.738px;" border="1"><colgroup><col style="width: 8.74427%;"><col style="width: 8.31422%;"><col style="width: 25.2294%;"><col style="width: 5.44725%;"><col style="width: 15.9117%;"><col style="width: 7.31078%;"><col style="width: 6.59404%;"><col style="width: 12.1846%;"><col style="width: 10.1778%;"></colgroup>
      <tbody>
      <tr style="height: 65.6125px;">
      <td style="text-align: center;"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Class Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Title</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Day</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Time</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Room</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Units</span></strong></td>
      <td style="text-align: center; line-height: 1;"><strong><span style="font-size: 10pt;"><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">Hours (for Lab. /Duties</span></span></strong></td>
      <td style="text-align: center;"><span style="font-size: 10pt;"><strong><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">No. of Students</span></strong></span></td>
      </tr>
      <tr style="height: 36px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33108</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CSP225L</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Human Computer Interaction (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">M</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">10:00 A.M. &ndash; 1:00 P.M.</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/518</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr style="height: 46.125px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;33210</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">EMC224&nbsp;</span></td>
      <td style="text-align: center; line-height: 1;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Introduction to Human Computer Interaction&nbsp;</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">M&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1:00 P.M. - 4:00 P.M.&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/410&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3&nbsp;</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3&nbsp;</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr style="height: 12px;">
      <td style="text-align: right;" colspan="9"><strong><span style="font-size: 8pt;">Total Number of Units/Hours of Lab./Duties: 4/6&nbsp;</span></strong></td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-top: 3.95pt; text-align: center; line-height: 1;" align="center">&nbsp;</p>
      <p class="MsoNormal" style="margin-top: 3.0pt; mso-pagination: none; tab-stops: 0cm center 240.0pt left 396.0pt 423.0pt; mso-layout-grid-align: none; text-autospace: none;"><strong><span lang="EN-US" style="font-size: 9.0pt; font-family: 'Arial',sans-serif; color: black;">Excess Teaching Load </span></strong><em style="mso-bidi-font-style: normal;"><span lang="EN-US" style="font-size: 9.0pt; font-family: 'Arial',sans-serif; color: black; mso-bidi-font-weight: bold;">(For Regular Faculty Members and Employees only)</span></em></p>
      <table style="border-collapse: collapse; width: 100%; height: 94.925px;" border="1"><colgroup><col style="width: 8.88761%;"><col style="width: 8.45757%;"><col style="width: 25.2294%;"><col style="width: 5.44725%;"><col style="width: 15.7683%;"><col style="width: 7.16743%;"><col style="width: 6.59404%;"><col style="width: 12.1846%;"><col style="width: 10.3211%;"></colgroup>
      <tbody>
      <tr style="height: 58.925px;">
      <td style="text-align: center;"><strong><span style="font-family: arial, helvetica, sans-serif; font-size: 10pt;">Class Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Code</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Course Title</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Day</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Time</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Room</span></strong></td>
      <td style="text-align: center;"><strong><span style="font-size: 10pt;">Units</span></strong></td>
      <td style="text-align: center; line-height: 1;"><strong><span style="font-size: 10pt;"><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">Hours (for Lab. /Duties</span></span></strong></td>
      <td style="text-align: center;"><span style="font-size: 10pt;"><strong><span lang="EN-US" style="font-family: Arial, sans-serif; color: black;">No. of Students</span></strong></span></td>
      </tr>
      <tr style="height: 36px;">
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33157</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CSP225L</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Human Computer Interaction (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">T</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1:00 P.M. &ndash; 4:00 P.M.</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/520</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">33088</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">CTS1223L</span></td>
      <td style="text-align: center; line-height: 1;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Usability, HCI. UI Design (Web Design) (LAB)</span></td>
      <td style="text-align: center;"><span style="font-size: 8pt;">Wed</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: Arial; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">10:00 A.M. - 1:00 P.M,</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">OL/519</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">1</span></td>
      <td style="text-align: center;"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">3</span></td>
      <td style="text-align: center;">&nbsp;</td>
      </tr>
      <tr>
      <td style="text-align: right;" colspan="9"><span lang="EN-US" style="font-size: 8.0pt; font-family: 'Arial Narrow',sans-serif; mso-fareast-font-family: 'Times New Roman'; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><strong><span style="font-size: 8pt;">Total Number of Units/Hours of Lab./Duties: 2/6</span></strong></span></td>
      </tr>
      </tbody>
      </table>
      <p class="MsoNormal" style="margin-left: 2cm; line-height: 1; text-align: left;">&nbsp;</p>
      <table style="border-collapse: collapse; width: 40.4624%; height: 170px;" border="1"><colgroup><col style="width: 59.122%;"><col style="width: 41.1646%;"></colgroup>
      <tbody>
      <tr style="height: 36px;">
      <td style="text-align: center;" colspan="2">Summary of Academic Load</td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Teaching Load</span></td>
      <td><span style="font-size: 8pt;">13 units/21 hours</span></td>
      </tr>
      <tr style="height: 26px;">
      <td><span style="font-size: 8pt;">Total Regular Load</span></td>
      <td><span style="font-size: 8pt;">13 units/21 hours</span></td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Excess Teaching Load</span></td>
      <td><span style="font-size: 8pt;">5 units/11 hours</span></td>
      </tr>
      <tr style="height: 36px;">
      <td><span style="font-size: 8pt;">Total Number of Preparations</span></td>
      <td><span style="font-size: 8pt;">3</span></td>
      </tr>
      </tbody>
      </table>
      <p><strong>EFFECTIVE DATE:&nbsp;</strong><span style="text-decoration: underline;">June 12, 2024</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>NAME</strong></span></p>
      <p><span style="font-size: 8pt;"><strong>Noted:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Verified:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Recommending approval:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Approved:</strong></span></p>
      <p style="line-height: 1;"><span style="text-decoration: underline;"><span style="font-size: 10pt;"><strong>KENNETH V. BAUTISTA</strong></span></span><span style="font-size: 10pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="text-decoration: underline;">ROWEL Y. CASTILLO</span></strong>&nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>DARWIN P. PAGUIO, PhD</strong></span><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Prof. ARLIDA M. PAME<span style="text-decoration: underline;"><br></span></strong><em>BSCS Program Coordinator</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>Registrar</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>VP for Academic Affairs&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College President</em></span><span style="text-decoration: underline;"><span style="font-size: 10pt;"><strong><br style="text-decoration: underline;"></strong></span></span></p>
      <p><span style="font-size: 10pt;"><span style="text-decoration: underline;"><strong>ERLINDA C. ABARINTOS, DIT</strong></span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="text-decoration: underline;"><strong>IMELDA DP. SORIANO, EdD</strong><strong><br></strong></span><em>Dean&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; College Administrator</em></span><br><span style="font-size: 10pt;"><em>VP for Adminsitration &amp; Finance</em></span></p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p style="line-height: 0.5; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>
      <p style="line-height: 1.1; text-align: center;">&nbsp;</p>`,
    },
    {
      image:`` ,
      code: ``,
    },
    {
      image:`` ,
      code: ``,
    },
    {
      image:`` ,
      code: ``,
    },
    {
      image:`` ,
      code: ``,
    },
    {
      image:`` ,
      code: ``,
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
