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
    <div style="display:flex; width:100%; gap:10px;">

        <ejs-documenteditorcontainer
            serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
            height="590px"
            width="50%"
            [enableToolbar]="true"
            [toolbarMode]="'Ribbon'"
            [enableWebMcp]="true"
            [webMcpSettings]="webMcpSettings1">
        </ejs-documenteditorcontainer>

        <ejs-documenteditorcontainer
            serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
            height="590px"
            width="50%"
            [enableToolbar]="true"
            [toolbarMode]="'Ribbon'"
            [enableWebMcp]="true"
            [webMcpSettings]="webMcpSettings2">
        </ejs-documenteditorcontainer>

    </div>
    `,
    providers: [ToolbarService, RibbonService]
})
export class App {

    public webMcpSettings1 = {
        name: 'documentEditor1'
    };

    public webMcpSettings2 = {
        name: 'documentEditor2'
    };
}