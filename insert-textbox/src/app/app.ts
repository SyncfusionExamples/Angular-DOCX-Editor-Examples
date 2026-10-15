import { Component, ViewChild } from '@angular/core';
import {
  DocumentEditorContainerComponent,
  DocumentEditorContainerModule,
  ToolbarService, RibbonService
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentEditorContainerModule],
  providers: [ToolbarService, RibbonService],
  template: `
  <div style="display:flex; justify-content:flex-end; padding:12px;">
    <button
      (click)="insertText()"
      style="
        background-color: #ffffff;
        color: #374151;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      ">
      Insert Text Box
    </button>
  </div>

    <ejs-documenteditorcontainer
      #container
      serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
      height="600px"
      style="display:block"
      [enableToolbar]="true" [toolbarMode]="'Ribbon'">
    </ejs-documenteditorcontainer>
  `
})
export class App {

  @ViewChild('container')
  public container!: DocumentEditorContainerComponent;

  public insertText(): void {
    this.container.documentEditor.showDialog('TextBox');
  }
}