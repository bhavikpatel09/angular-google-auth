import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesListComponent } from './pages-list/pages-list.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', component: PagesListComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
