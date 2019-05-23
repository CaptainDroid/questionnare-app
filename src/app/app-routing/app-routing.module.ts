import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SurveyComponent } from 'src/app/components/survey/survey.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'survey',
        component: SurveyComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
