import { NgModule }                 from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, }     from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [{
                            path: 'login',
                            component: LoginComponent,
                        }, {
                            path: '',
                            redirectTo: '/login',
                            pathMatch: 'full',
                        }, ];

@NgModule({
    declarations: [
        LoginComponent,
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