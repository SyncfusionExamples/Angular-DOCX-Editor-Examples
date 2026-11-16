import { Component } from '@angular/core';
import { CompareDocumentsComponent } from './compare-documents/compare-documents.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CompareDocumentsComponent],
  template: `<app-compare-documents></app-compare-documents>`,
})
export class App {}
