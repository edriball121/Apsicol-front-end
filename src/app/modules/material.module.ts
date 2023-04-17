import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogContent,
    MatDialogActions
  ],
})
export class MaterialModule {}
