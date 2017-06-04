import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule, PreloadAllModules, }     from '@angular/router';

import { ContextService } from './services/context.service';

import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ImportComponent } from './components/import/import.component';

const appRoutes: Routes = [{
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
		redirectTo: '/login',
		pathMatch: 'full',
	},];

@NgModule({
    declarations: [
        LoginComponent,
        TasksComponent,
        ImportComponent,
    ],
    imports: [
		BrowserModule,
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
