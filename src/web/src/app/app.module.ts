import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlyingPipe } from './flying.pipe';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
		FlyingPipe,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
