import { NgModule }                 from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, }     from '@angular/router';

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
                        }, ];

@NgModule({
    declarations: [
        LoginComponent,
        TasksComponent,
        ImportComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoutes, { }),
    ],
    exports: [
        RouterModule,
    ],
    providers: [ ],
})
export class AppRoutingModule { }