import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/error/notfound/notfound.component';
import { UnauthorizedComponent } from './shared/error/unauthorized/unauthorized.component';
import { LoginComponent } from './core/layout/pages/authentication/login/login.component';
import { ParentComponent } from './core/layout/parent/parent.component';
import { RegisterComponent } from './core/layout/pages/authentication/register/register.component';
import { RegisterSuccessComponent } from './core/layout/pages/authentication/register-success/register-success.component';
import { WorkspacelistComponent } from './core/layout/pages/workspace/workspacelist/workspacelist.component';
import { authenticationGuard } from './shared/guards/authentication.guard';
import { ProfileComponent } from './core/layout/pages/profile/profile/profile.component';
import { EditprofileComponent } from './core/layout/pages/profile/editprofile/editprofile.component';
import { DeleteworkspaceComponent } from './core/layout/pages/workspace/deleteworkspace/deleteworkspace.component';
import { EditworkspaceComponent } from './core/layout/pages/workspace/editworkspace/editworkspace.component';
import { CreateworkspaceComponent } from './core/layout/pages/workspace/createworkspace/createworkspace.component';
import { DashboardComponent } from './core/layout/pages/dashboard/dashboard.component';
import { ReportlistComponent } from './core/layout/pages/report/reportlist/reportlist.component';
import { CreatereportComponent } from './core/layout/pages/report/createreport/createreport.component';
import { ReportitemComponent } from './core/layout/pages/report/reportitem/reportitem.component';
import { EditreportComponent } from './core/layout/pages/report/editreport/editreport.component';
import { DeletereportComponent } from './core/layout/pages/report/deletereport/deletereport.component';
import { CollagelistComponent } from './core/layout/pages/collage/collagelist/collagelist.component';
import { CreatecollageComponent } from './core/layout/pages/collage/createcollage/createcollage.component';
import { EditcollageComponent } from './core/layout/pages/collage/editcollage/editcollage.component';
import { DeletecollageComponent } from './core/layout/pages/collage/deletecollage/deletecollage.component';
import { CollageitemComponent } from './core/layout/pages/collage/collageitem/collageitem.component';
import { CreateannualreportComponent } from './core/layout/pages/annualreport/createannualreport/createannualreport.component';
import { ReportDesignComponent } from './core/layout/pages/report/report-design/report-design.component';
import { CreatefacultymatrixComponent } from './core/layout/pages/facultymatrix/createfacultymatrix/createfacultymatrix.component';
import { EditfacultymatrixComponent } from './core/layout/pages/facultymatrix/editfacultymatrix/editfacultymatrix.component';
import { DeletefacultymatrixComponent } from './core/layout/pages/facultymatrix/deletefacultymatrix/deletefacultymatrix.component';
import { ReportviewComponent } from './core/layout/pages/report/reportview/reportview.component';
import { AnnualreportlistComponent } from './core/layout/pages/annualreport/annualreportlist/annualreportlist.component';
import { EditannualreportComponent } from './core/layout/pages/annualreport/editannualreport/editannualreport.component';
import { DeleteannualreportComponent } from './core/layout/pages/annualreport/deleteannualreport/deleteannualreport.component';
import { ViewannualreportComponent } from './core/layout/pages/annualreport/viewannualreport/viewannualreport.component';
import { ChatwithaiComponent } from './core/layout/pages/chatwithai/chatwithai.component';
import { CreatereportselectionComponent } from './core/layout/pages/reportselection/createreportselection/createreportselection.component';
import { EditreportselectionComponent } from './core/layout/pages/reportselection/editreportselection/editreportselection.component';
import { DeletereportselectionComponent } from './core/layout/pages/reportselection/deletereportselection/deletereportselection.component';
import { JoinworkspaceComponent } from './core/layout/pages/workspace/joinworkspace/joinworkspace.component';
import { ViewaccomplishmentreportComponent } from './core/layout/pages/accomplishmentreport/viewaccomplishmentreport/viewaccomplishmentreport.component';
import { CreateaccomplishmentreportComponent } from './core/layout/pages/accomplishmentreport/createaccomplishmentreport/createaccomplishmentreport.component';
import { EditaccomplishmentreportComponent } from './core/layout/pages/accomplishmentreport/editaccomplishmentreport/editaccomplishmentreport.component';
import { DeleteaccomplishmentreportComponent } from './core/layout/pages/accomplishmentreport/deleteaccomplishmentreport/deleteaccomplishmentreport.component';
import { ViewannualreportAccomplishmentreportComponent } from './core/layout/pages/annualreport/viewannualreport-accomplishmentreport/viewannualreport-accomplishmentreport.component';
import { CreatereportselectionAccomplishmentComponent } from './core/layout/pages/reportselection/createreportselection-accomplishment/createreportselection-accomplishment.component';
import { AnnualreportitemFacultyMatrixComponent } from './core/layout/pages/annualreport/annualreportitem/annualreportitem-facultymatrix/annualreportitem-facultymatrix.component';
import { AnnualreportitemAccomplishmentreportComponent } from './core/layout/pages/annualreport/annualreportitem/annualreportitem-accomplishmentreport/annualreportitem-accomplishmentreport.component';
import { AccomplishmentreportitemComponent } from './core/layout/pages/accomplishmentreport/accomplishmentreportitem/accomplishmentreportitem.component';
import { LeaveworkspaceComponent } from './core/layout/pages/workspace/leaveworkspace/leaveworkspace.component';
import { TemplatelistComponent } from './core/layout/pages/templatelist/templatelist.component';
import { ContentComponent } from './core/layout/pages/content/content.component';
import { TemplatelistParentComponent } from './core/layout/pages/report/templatelist-parent/templatelist-parent.component';
import { ChartComponent } from './core/layout/pages/chart/chart.component';


export const routes: Routes = [
        {
            path: '404',
            component: NotfoundComponent
        },
        {
            path: '401',
            component: UnauthorizedComponent
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'chart',
            component: ChartComponent
        },
        {
            path:'',
            component: ParentComponent,
            children: [
                {
                    path: 'register',
                    component: RegisterComponent
                },
                {
                    path: 'register-success',
                    component: RegisterSuccessComponent
                },
                {
                    path: 'workspacelist',
                    component: WorkspacelistComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'profile',    
                    component: ProfileComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'editprofile',
                    component: EditprofileComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'createworkspace',
                    component: CreateworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'joinworkspace',
                    component: JoinworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'leaveworkspace/:workspace_id',
                    component: LeaveworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'deleteworkspace/:workspace_id',
                    component: DeleteworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {   
                    path: 'editworkspace/:workspace_id',
                    component: EditworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'workspace/:workspace_id',
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: DashboardComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'reportlist',
                        component: ReportlistComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createreport',
                        component: CreatereportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'report/:report_id',
                        component: TemplatelistParentComponent,
                        canActivate: [authenticationGuard],
                        children: [
                          {
                            path: '',
                            component: TemplatelistComponent,
                            canActivate: [authenticationGuard]
                          },
                          {
                            path: 'content/:content_id',
                            component: ContentComponent,
                            canActivate: [authenticationGuard]
                          }
                        ]
                      },
                    {
                        path: 'reportitem/:report_id',
                        component: ReportitemComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'reportview/:report_id',
                        component: ReportviewComponent,
                        canActivate: [authenticationGuard]  
                    },
                    {
                        path: 'editreport/:report_id',
                        component: EditreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletereport/:report_id',
                        component: DeletereportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createfacultymatrix/:report_id',
                        component: CreatefacultymatrixComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editfacultymatrix/:faculty_matrix_id',
                        component: EditfacultymatrixComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletefacultymatrix/:faculty_matrix_id',
                        component: DeletefacultymatrixComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'report-design/:report_id',
                        component: ReportDesignComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'collagelist',
                        component: CollagelistComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createcollage',
                        component: CreatecollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editcollage/:collage_id',
                        component: EditcollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletecollage/:collage_id',
                        component: DeletecollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'collageitem/:collage_id',
                        component: CollageitemComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'annualreportlist',
                        component: AnnualreportlistComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createannualreport/:workspace_id',
                        component: CreateannualreportComponent,
                        canActivate: [authenticationGuard]
                        
                    },
                    {
                        path: 'editannualreport/:annual_report_id',
                        component: EditannualreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deleteannualreport/:annual_report_id',
                        component: DeleteannualreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'viewannualreport/:annual_report_id',
                        component: ViewannualreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'chatwithai',
                        component: ChatwithaiComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createreportselection/:annual_report_id',
                        component: CreatereportselectionComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editreportselection/:annual_report_id',
                        component: EditreportselectionComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletereportselection/:annual_report_id',
                        component: DeletereportselectionComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'viewaccomplishmentreport/:report_id',
                        component: ViewaccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createaccomplishmentreport/:report_id',
                        component: CreateaccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editaccomplishmentreport/:accomplishment_report_id',
                        component: EditaccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deleteaccomplishmentreport/:accomplishment_report_id',
                        component: DeleteaccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'accomplishmentreportitem/:accomplishment_report_id',
                        component: AccomplishmentreportitemComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'viewannualreport-facultymatrix/:annual_report_id',
                        component: ViewannualreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'viewannualreport-accomplishmentreport/:annual_report_id',
                        component: ViewannualreportAccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createreportselection/:annual_report_id',
                        component: CreatereportselectionComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createreportselection-accomplishmentreport/:annual_report_id',
                        component: CreatereportselectionAccomplishmentComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'annualreportitem-facultymatrix/:annual_report_id',
                        component: AnnualreportitemFacultyMatrixComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'annualreportitem-accomplishmentreport/:annual_report_id',
                        component: AnnualreportitemAccomplishmentreportComponent,
                        canActivate: [authenticationGuard]
                    },
                ]
            },
            {
                path: '**',
                component: NotfoundComponent
            },
            
            ]
            
        }
];