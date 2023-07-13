import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    HighchartsChartModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    

  ]
})
export class ComponentsModule { }
