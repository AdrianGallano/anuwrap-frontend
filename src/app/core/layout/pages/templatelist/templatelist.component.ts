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
    // blank
    {
      title:'Blank Page',
      image: '../../../../../assets/img/blanktemplate.png',
      code: ' </div> <div class="break"></div>',
    },
    // accomplishment report
    {
      title:'Accomplishment Report',
      image: '../../../../../assets/img/accomp.png',
      code:`<div class="content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><span style="font-size: 12pt;"><strong> <span lang="EN-US" style="line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong><span lang="EN-US" style="line-height: 107%; font-family: 'Times New Roman', serif;">Accomplishment Report</span></span></p>
</div>
<p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong></p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-align: center;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"> &nbsp;</span></strong></p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-align: center;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">BSEMC Accomplishment Comprehensive Narrative Report</span></strong></p>
<p class="MsoNormal" style="margin-bottom: .0001pt;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Renewal of Institutional Membership for Animation Council of the Philippines (ACPI)</span></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>
<p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Gordon College &ndash; College of Computer Studies renewed it&rsquo;s academic membership with Animation Council of the Philippines (ACPI). This renewal signifies our unwavering commitment in the field of animation and our dedication to supporting the initiatives of ACPI. Our institution has long recognized the vital role played by ACPI in advancing and promoting the field of animation in the Philippines. Since our initial membership commencement on September 2021, our active involvement in ACPI has been a source of pride. Renewing our membership was a natural choice to maintain our contributions to the growth and development of our BSEMC students in the field of animation.</span></p>
<p class="MsoNormal" style="margin-bottom: .0001pt; text-indent: 36.0pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">The renewal of our institutional membership with the Animation Council of the Philippines is a testament to our enduring commitment to the growth and excellence our BSEMC Students in the field of animation. We eagerly anticipate continuing our active involvement, collaborating with fellow members and academic institutions, and contributing to ACPI's mission to further enhance the country's animation landscape.</span></p>
<div class="collage-wrapper" style="width: 400px; height: auto; resize: both; overflow: hidden; margin: 0 auto; cursor: move; position: relative;" draggable="true"><button class="delete-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0); color: black; border: 2px solid black; border-radius: 5px; padding: 0.5rem 1rem; cursor: pointer; z-index: 1000;">Delete</button>
<div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden; position: relative;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
Figure 1</div>
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden; position: relative;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
Figure 2</div>
</div>
</div>
<p class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 36pt; text-align: center;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp;</span></p>
</div>
<p><div class="break"></div></p>`,
    },
    // faculty matrix
    {
      title:'Faculty Matrix',
      image: '../../../../../assets/img/fac.png',
      code: `<div class="faculty-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 12pt;">Republic of the Philippines</span><br><span style="font-size: 12pt;">City Of Olongapo</span><br><span style="font-size: 12pt;">Gordon College</span><br><span style="font-size: 12pt;">College Of Computer Studies</span><br><span style="font-size: 12pt;"> Olongapo City Sports Complex, Donor St., East Tapinac, Olongapo City 2200<br>Telefax No.: (047) 602-7175 loc 322</span></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 12pt;"><a class="text-blue-500 underline" href="http://www.gordoncollege.edu.ph/">www.gordoncollege.edu.ph</a> </span></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 12pt;">Faculty<strong> </strong>Matrix</span><br><span style="font-size: 12pt;">2nd Semester A.Y. 2023-2024</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong></p>
</div>
<div class="faculty-table-wrapper">
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<table style="width: 100%; height: 374.8px;"><colgroup><col style="width: 4.56615%;"><col style="width: 4.56615%;"><col style="width: 5.00102%;"><col style="width: 3.58769%;"><col style="width: 3.37025%;"><col style="width: 5.65333%;"><col style="width: 14.242%;"><col style="width: 6.52307%;"><col style="width: 5.76204%;"><col style="width: 8.47999%;"><col style="width: 8.47999%;"><col style="width: 7.06666%;"><col style="width: 6.30732%;"><col style="width: 8.26087%;"><col style="width: 8.04512%;"></colgroup>
<tbody>
<tr style="height: 28.525px;">
<td colspan="3">Name</td>
<td rowspan="2">AGE</td>
<td rowspan="2">SEX</td>
<td rowspan="2">TENURE<br>(P/COS)</td>
<td rowspan="2">Related Certification/Appropriate Current PRC License</td>
<td colspan="5">Educational Background (Specify Degree Obtained)</td>
<td rowspan="2">Designation</td>
<td rowspan="2">Teaching experience (No. of years)</td>
<td rowspan="2">Membership in Professional Organization</td>
</tr>
<tr style="height: 118.075px;">
<td>Last Name</td>
<td>First Name</td>
<td>Middle Initial</td>
<td>Doctorate Degree</td>
<td>Master&rsquo;s Degree</td>
<td>Baccalaureate Degree</td>
<td>Specialization</td>
<td>Enrollment Status (Enrolled or Not enrolled)</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 28.525px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
<div class="break"></div>`,
    },
    // teaching and learning
    {
      title:'Teaching and Learning',
      image:`../../../../../assets/img/teach_learn.png` ,
      code:`<div class="teaching-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;">Teaching and Learning<br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong></p>
</div>
<p style="line-height: 1.1; text-align: center;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><span style="font-family: 'Times New Roman', serif; font-size: 12pt;">&nbsp;</span></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><span style="font-family: 'Times New Roman', serif; font-size: 12pt;">Teaching:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;College/Department:</span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp;Date Covered:&nbsp;</span> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Date Submitted:</span></p>
<div align="center">&nbsp;</div>
<table class="MsoTableGrid">
<thead>
<tr>
<th rowspan="3">No.</th>
<th rowspan="3">Courses Handled /<br>Year &amp; Section</th>
<th rowspan="3">Module Number</th>
<th colspan="4">Synchronous</th>
<th colspan="3">Asynchronous</th>
</tr>
<tr>
<th colspan="4">Virtual</th>
<th rowspan="2">Platform</th>
<th rowspan="2">Schedule of Consultations</th>
<th rowspan="2">Activities</th>
</tr>
<tr>
<th>Platform</th>
<th>Schedule of Meeting</th>
<th>Meeting ID / Password / Class Password</th>
<th>Activities</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>BSEMC1A &amp; 1B</td>
<td>1 - 3</td>
<td>Google Meet</td>
<td valign="top">M.T.<br>2:30 &ndash; 3:30 P.M.</td>
<td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
<td>Module</td>
<td>Google Meet /LAMP</td>
<td>Google Meet /LAMP</td>
<td>Activities</td>
</tr>
<tr>
<td>1</td>
<td>BSEMC1A &amp; 1B</td>
<td>1 - 3</td>
<td>Google Meet</td>
<td valign="top">M.T.<br>2:30 &ndash; 3:30 P.M.</td>
<td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
<td>Module</td>
<td>Google Meet /LAMP</td>
<td>Google Meet /LAMP</td>
<td>Activities</td>
</tr>
<tr>
<td>1</td>
<td>BSEMC1A &amp; 1B</td>
<td>1 - 3</td>
<td>Google Meet</td>
<td valign="top">M.T.<br>2:30 &ndash; 3:30 P.M.</td>
<td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
<td>Module</td>
<td>Google Meet /LAMP</td>
<td>Google Meet /LAMP</td>
<td>Activities</td>
</tr>
<tr>
<td>1</td>
<td>BSEMC1A &amp; 1B</td>
<td>1 - 3</td>
<td>Google Meet</td>
<td valign="top">M.T.<br>2:30 &ndash; 3:30 P.M.</td>
<td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
<td>Module</td>
<td>Google Meet /LAMP</td>
<td>Google Meet /LAMP</td>
<td>Activities</td>
</tr>
<tr>
<td>1</td>
<td>BSEMC1A &amp; 1B</td>
<td>1 - 3</td>
<td>Google Meet</td>
<td valign="top">M.T.<br>2:30 &ndash; 3:30 P.M.</td>
<td><span style="font-size: 9.0pt; color: #5f6368; letter-spacing: .25pt;">meet.google.com/gyo-qvbw-apm</span></td>
<td>Module</td>
<td>Google Meet /LAMP</td>
<td>Google Meet /LAMP</td>
<td>Activities</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
</div>
<div class="break"></div>`,
    },
    // faculty schedule
    {
      title:'Faculty Schedule',
      image:`../../../../../assets/img/fac_sched.png` ,
      code: `<div class="facultysched-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;">Republic of the Philippines&nbsp;</span><br><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">Office Of The Vice President For Academic Affairs<br>City of Olongapo<br>Gordon College</span></p>
<p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;"> <span lang="EN-US">individual Faculty Load And Schedule</span></span></p>
<p style="line-height: 0.5; text-align: center;"><span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;"> <span lang="EN-US" style="color: black;">Semester: 1st, Academic Year: <u>2022 - 2023</u></span> </span></p>
</div>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
<p style="line-height: 0.5; text-align: center;">&nbsp;</p>
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
<p style="line-height: 1.1; text-align: center;">&nbsp;</p>
</div>
<div class="break"></div>`,
    },
    // event report
    {
      title:'Event Report',
      image:`../../../../../assets/img/event.png` ,
      code:   `<div class="event-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;">&nbsp;</p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Event Report</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong></p>
</div>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;</span></span></p>
<p class="MsoNormal" style="text-align: left;" align="center">&nbsp;</p>
<p class="MsoNormal" style="text-align: left;" align="center">&nbsp;</p>
<p class="MsoNormal" style="text-align: left;" align="center">&nbsp;</p>
<p class="MsoNormal" style="text-align: left;" align="center">&nbsp;</p>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Faculty:&nbsp; &nbsp; </span></span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;College/Department:</span></span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;</span></span></strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Date Covered:</span></span><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp;Date Submitted:</span></span></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Brief overview of the event:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Objectives and goals:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Event planning process:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Team members involved:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Budget and resources:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Description of the event activities:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Number of attendees:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Key speakers or guests:</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Goals met:</span></strong></p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Feedback from attendees:</span></strong></p>
<p><strong><span style="font-family: 'times new roman', times, serif;">Positive impacts:</span></strong></p>
<p>&nbsp;</p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Issues encountered:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Lessons learned:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Suggestions for future events:</strong></span></p>
<p class="MsoNormal" style="text-align: left;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Budget overview:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Actual expenditures:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Sponsorship and donations:</strong></span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Overall assessment of the event:</strong></span></p>
<p><span style="font-family: 'times new roman', times, serif;"><strong>Recommendations for future events:</strong></span></p>
<div class="collage-wrapper" style="width: 400px; height: auto; resize: both; overflow: hidden; margin: 0 auto; cursor: move; position: relative;" draggable="true"><button class="delete-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0); color: black; border: 2px solid black; border-radius: 5px; padding: 0.5rem 1rem; cursor: pointer; z-index: 1000;">Delete</button>
<div class="collage-container" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px; overflow: hidden;">
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden; position: relative;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
Figure 1</div>
<div class="image-container" style="width: 30%; margin-bottom: 20px; overflow: hidden; position: relative;">
<div class="image-placeholder" style="height: 100px; background-color: #ccc;">&nbsp;</div>
Figure 2</div>
</div>
</div>
<p style="text-align: center;"><span style="font-family: 'times new roman', times, serif;"><strong>&nbsp;</strong></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
<div class="break"></div>`,
    },
    // Financial report
    {
      title:'Financial Report',
      image:`../../../../../assets/img/financial.png` ,
      code: `<div class="financial-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;">&nbsp;</p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Financial Report</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong></p>
</div>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Name of Organization:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;School Year:&nbsp;</span></strong></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Source Funds</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><em><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Example</span></em></p>
<p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Remaining fund (SY 2023-2024)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php</span></p>
<p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Collected Membership Fee&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Php</span></p>
<p style="line-height: 1.1; text-align: left;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Income Generating Projects&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Php</span></p>
<p style="line-height: 1.1; text-align: left;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Total fund:</span></strong></p>
<p style="line-height: 1.1; text-align: left;"><strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;">Summary of Expenses</span></strong></p>
<table style="border-collapse: collapse; width: 100%; height: 180.859px;" border="1"><colgroup><col style="width: 20.0173%;"><col style="width: 20.0173%;"><col style="width: 20.0173%;"><col style="width: 12.567%;"><col style="width: 27.381%;"></colgroup>
<tbody>
<tr style="height: 36.1719px;">
<td style="text-align: center;">Activity &amp; Date</td>
<td style="text-align: center;">Item</td>
<td style="text-align: center;">Amount per Unit</td>
<td style="text-align: center;">Quantity</td>
<td style="text-align: center;">Total</td>
</tr>
<tr style="height: 36.1719px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 36.1719px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 36.1719px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr style="height: 36.1719px;">
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 72.5108%;"><col style="width: 27.4892%;"></colgroup>
<tbody>
<tr>
<td style="text-align: left; padding-left: 240px;"><span style="font-family: 'times new roman', times, serif;">TOTAL EXPENSES</span></td>
<td style="text-align: left; padding-left: 240px;">&nbsp;</td>
</tr>
</tbody>
</table>
<p><span style="font-family: 'times new roman', times, serif;">Total Fund</span></p>
<p style="padding-left: 40px;"><span style="font-family: 'times new roman', times, serif;">-<em>(less)</em></span></p>
<p><span style="font-family: 'times new roman', times, serif;">Total expenses <span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></p>
<p><span style="font-family: 'times new roman', times, serif;">Cash on Hand <span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span></p>
<p><span style="font-family: 'times new roman', times, serif;">Prepared by:</span></p>
<p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;"> </span></span></span></p>
<p style="line-height: 1;">&nbsp;</p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the Treasurer</span></span></span></span></span></span></span></span></p>
<p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Audited by:</span></span></span></p>
<p>&nbsp;</p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the Auditor&nbsp;</span></span></span></span></span></span></span></span></p>
<p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Noted by:</span></span></span></p>
<p>&nbsp;</p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="text-decoration: underline;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> &nbsp;</span></span></span></span></p>
<p class="MsoNormal" style="text-align: left; line-height: 1;" align="center"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span lang="EN-US" style="font-size: 12.0pt; font-family: 'Times New Roman',serif;"><span style="font-size: 8pt;"><span style="font-size: 12pt;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;">Signature over Printed Name of the President&nbsp;</span></span></span></span></span></span></span></span></p>
<p><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif;"><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman',serif; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA;"><span style="font-family: 'times new roman', times, serif;">Approved:</span></span></span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
<div class="break"></div>`,
    },
    // summary of accomplisment report
    {
      title:'Summary of Accomplishment Report',
      image:`../../../../../assets/img/sum_accomp.png` ,
      code: `<div class="summary-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Summary of Accomplishments And Activities</span></p>
<p style="line-height: 1.1; text-align: center;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">For 1<sup>st</sup> Semester A.Y. 2023 - 2024</span></p>
</div>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;">&nbsp;</p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of Student Organization<span style="mso-tab-count: 1;">&nbsp; &nbsp;</span>:</span></strong></p>
<p style="line-height: 1.1; text-align: left; padding-left: 40px;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 11.0pt; line-height: 107%; font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma; mso-ansi-language: EN-PH; mso-fareast-language: EN-PH; mso-bidi-language: AR-SA;">Name of President<span style="mso-tab-count: 3;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>:&nbsp;</span></strong></p>
<table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 791.387px; width: 619px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 93px;">
<td style="width: 132.25px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activities Undertaken</span></strong></p>
</td>
<td style="width: 142.163px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Dates and Places / Platform</span></strong></p>
</td>
<td style="width: 159.425px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Activity Main Objective</span></strong></p>
</td>
<td style="width: 123.562px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">Remarks</span></strong></p>
</td>
</tr>
<tr style="height: 174px;">
<td style="width: 132.25px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 142.163px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 159.425px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 123.562px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 161px;">
<td style="width: 132.25px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 142.163px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 159.425px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 123.562px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 177px;">
<td style="width: 132.25px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 142.163px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 159.425px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 123.562px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
<tr style="height: 186.387px;">
<td style="width: 132.25px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 142.163px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="border: none; mso-padding-alt: 31.0pt 31.0pt 31.0pt 31.0pt; mso-border-shadow: yes;">&nbsp;</p>
</td>
<td style="width: 159.425px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: justify;">&nbsp;</p>
</td>
<td style="width: 123.562px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p class="MsoNormal" style="text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="font-family: 'Tahoma',sans-serif; mso-fareast-font-family: Tahoma;">What were the problems encountered by the officers of the Student Organization in conducting activities?</span></strong></p>
</div>
<table class="MsoNormalTable" style="border-collapse: collapse; border: none; height: 334.363px; width: 622px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 161.762px;">
<td style="width: 133.3px; border: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 142.8px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 159.35px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
<td style="width: 124.95px; border-top: 1pt solid black; border-right: 1pt solid black; border-bottom: 1pt solid black; border-image: initial; border-left: none; padding-top: 0cm; padding-right: 5.4pt; padding-bottom: 0cm;" valign="top">&nbsp;</td>
</tr>
<tr style="height: 172.6px;">
<td style="width: 133.3px; border-right: 1pt solid black; border-bottom: 1pt solid black; border-left: 1pt solid black; border-image: initial; border-top: none; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 142.8px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">&nbsp;</td>
<td style="width: 159.35px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal">&nbsp;</p>
</td>
<td style="width: 124.95px; border-top: none; border-left: none; border-bottom: 1pt solid black; border-right: 1pt solid black; padding: 0cm 5.4pt;" valign="top">
<p class="MsoNormal" style="text-align: center;" align="center">&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: left;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Prepared by:</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: left;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">_________________________________________</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Secretary</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">_________________________________________</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">President<br><br><br><br></span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 40px; text-align: left;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Noted by:</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 40px; text-align: left;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">_________________________________________</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Organization/Council Adviser</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">________________________</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; text-align: center;"><strong style="mso-bidi-font-weight: normal;"><span style="mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin; mso-bidi-font-family: Calibri; mso-bidi-theme-font: minor-latin;">Date</span></strong></p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px; text-align: center;">&nbsp;</p>
<p class="MsoNormal" style="line-height: normal; margin: 0cm 0cm 0.0001pt 36pt; padding-left: 160px;">&nbsp;</p>
<div class="break"></div>`,
    },
    // syllabus
    {
      title:'Syllabus',
      image:`../../../../../assets/img/syllab.png` ,
      code:  `<div class="syllabus-content-body">
<div class="teaching-header" style="width: 100%; margin: 0; padding: 0; border: 0; box-sizing: border-box; cursor: move;" draggable="true">
<div class="ccs-logo" style="float: right; margin-right: 10px; border-radius: 50px;"><img style="width: 105px; height: 117px;" draggable="true" src="assets/img/CCS.png"></div>
<p class="gc-logo"><img style="float: left; width: 96px; height: 96px;" draggable="true" src="assets/img/GC.png"></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><span style="font-size: 12pt;">Republic of the Philippines&nbsp;</span><br><span style="font-size: 12pt;">Office Of The Vice President For Academic Affairs<span style="font-weight: bold;"><br></span> City of Olongapo<span style="font-weight: bold;"><br></span>&nbsp;Gordon College</span></p>
<p style="line-height: 1.1; text-align: center; margin: 0;"><br><strong> <span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">&nbsp;</span></strong><span lang="EN-US" style="font-size: 12.0pt; line-height: 107%; font-family: 'Times New Roman', serif;">Syllabus</span></p>
</div>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;"><strong>COURSE NUMBER&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </strong>&nbsp; : CSP22112</span></span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE DESCRIPTION&nbsp; &nbsp;</strong>: COMPUTER PROGRAMMING</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE PROFESSOR&nbsp; &nbsp; &nbsp;: </strong>Name</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>COURSE CREDIT&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : </strong>4 units</span></h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;"><strong>TIME DURATION&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong> &nbsp;: 3 Hours a Day</span></h6>
<h6 style="text-align: left; line-height: 1;">&nbsp;</h6>
<h6 style="text-align: left; line-height: 1;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">A. COURSE DESCRIPTION:</span></strong></span></h6>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;scrambled it to make a type specimen book.</span></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">B. COURSE OBJECTIVES:</span></strong></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp; &nbsp; It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets&nbsp; containing Lorem Ipsum&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">C. LEARNING COMPETENCIES:</span></strong></span></p>
<ol>
<li style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span></span></span></li>
<li style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 10pt;"><span style="font-family: arial, helvetica, sans-serif; font-size: 8pt;"><span style="font-size: 10pt;">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like&nbsp; Aldus PageMaker including versions of Lorem Ipsum.</span></span></span></span></span></li>
</ol>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">D. COURSE MODULE</span></strong></span></p>
<p style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">&nbsp; &nbsp; &nbsp;Module 1: Introduction to Computer Programming</span></strong></span></p>
<ul>
<li style="font-family: arial, helvetica, sans-serif; text-align: left;"><span style="font-family: arial, helvetica, sans-serif;"><strong><span style="font-size: 10pt;">&nbsp;</span></strong><span style="font-size: 10pt;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></span></li>
</ul>
<p>&nbsp;</p>
</div>
<div class="break"></div>`,
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
