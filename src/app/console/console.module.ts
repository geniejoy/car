import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConsoleComponent } from '@console/console.component';
import { ConsoleRoutingModule } from '@console/console-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LogoutIconComponent } from './header/logout-icon/logout-icon.component';
import { SidenavService } from '@console/sidenav/sidenav.service';
import { SidenavTranslateComponent } from './sidenav/sidenav-translate/sidenav-translate.component';

@NgModule({
  imports: [FlexLayoutModule, SharedModule, ConsoleRoutingModule],
  declarations: [ConsoleComponent, HeaderComponent, SidenavComponent, LogoutIconComponent, SidenavTranslateComponent],
  providers: [SidenavService]
})
export class ConsoleModule {}
