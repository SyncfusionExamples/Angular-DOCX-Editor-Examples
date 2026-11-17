import { Component } from '@angular/core';
import {
  DocumentEditorContainerModule,
  ToolbarService,
  RibbonService
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentEditorContainerModule],
  providers: [ToolbarService, RibbonService],
  template: `
    <!-- Use the following service URL only for demo purposes -->
    <ejs-documenteditorcontainer
      serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
      height="600px"
      style="display: block"
      [enableToolbar]="true"
      toolbarMode="Ribbon">
    </ejs-documenteditorcontainer>
  `
})
export class App {}
