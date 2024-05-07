import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
})
export class RegisterComponent {}
