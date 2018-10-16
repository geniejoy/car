import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: []
})
export class SharedModule {}
