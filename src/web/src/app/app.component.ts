import { Component } from '@angular/core';

import {run} from './run';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'app works!';

    run() {
		run();
    }
}
