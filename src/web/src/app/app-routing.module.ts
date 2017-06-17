import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule, PreloadAllModules, }     from '@angular/router';

import {ContextService}  from './services/context.service';
import {UserService}  from './services/user.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ImportComponent } from './components/import/import.component';
import { ValidateComponent } from './components/validate/validate.component';

const appRoutes: Routes = [{
	path: 'home',
	component: HomeComponent,
}, {
		path: 'login',
		component: LoginComponent,
	}, {
		path: 'tasks',
		component: TasksComponent,
	}, {
		path: 'import',
		component: ImportComponent,
	}, {
		path: 'validate',
		component: ValidateComponent,
	}, {
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},];

@NgModule({
    declarations: [
		HomeComponent,
        LoginComponent,
        TasksComponent,
        ImportComponent,
		ValidateComponent,
    ],
    imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
        RouterModule.forRoot(appRoutes, {}),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
		ContextService,
		UserService,
	],
})
export class AppRoutingModule { }
