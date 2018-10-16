import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';

// for Apollo
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

// for testing dashboard
import { ApolloService } from './_apollo/apollo.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: [],
  providers: [ApolloService]
})
export class CoreModule {}
