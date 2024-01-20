import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-container-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './container-layout.component.html',
  styleUrls: ['./container-layout.component.scss'],
})
export class ContainerLayoutComponent {}
