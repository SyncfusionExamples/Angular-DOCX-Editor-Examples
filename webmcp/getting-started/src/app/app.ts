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
    template: `
    <!-- Use the following service URL only for demo purposes -->
    <ejs-documenteditorcontainer
        serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
        height="590px"
        style="width:100%;display:block"
        [enableToolbar]="true"
        [toolbarMode]="'Ribbon'" 
        [enableWebMcp]="true"
        [webMcpSettings]="webMcpSettings">
    </ejs-documenteditorcontainer>
`,
    providers: [ToolbarService, RibbonService]
})
export class App {
    public webMcpSettings: any = {
        name: 'container'
    };
}
