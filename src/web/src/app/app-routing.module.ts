import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule, PreloadAllModules, }     from '@angular/router';

import { ContextService } from './services/context.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ImportComponent } from './components/import/import.component';

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
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},];

@NgModule({
    declarations: [
		HomeComponent,
        LoginComponent,
        TasksComponent,
        ImportComponent,
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
	],
})
export class AppRoutingModule { }
