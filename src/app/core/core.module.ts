import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  MessagesComponent, ToolbarComponent,
]

const MODULES = [MaterialModule, RouterModule]

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [ COMPONENTS, MODULES]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule){
    if (parentModule) {
throw new Error("CoreModule has been loaded. Import this module in the AppModule");

    }
  }
 }
