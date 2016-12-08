import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSemanticModule } from 'ng-semantic';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSemanticModule,
    InfiniteScrollModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSemanticModule,
    InfiniteScrollModule
  ]
})

export class BaseSharedModule { }
