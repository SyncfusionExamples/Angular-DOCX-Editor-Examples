import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { DOCXEditorComponent } from './docxeditor.component';

export function bootstrapAngular(): void{
  bootstrapApplication(DOCXEditorComponent)
  .catch((err) => console.error(err));
}