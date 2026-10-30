import { Component, ViewChild } from '@angular/core';
import {
    DocumentEditorContainerModule,
    ToolbarService,
    RibbonService,
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DocumentEditorContainerModule],
    template: `
    <!-- Use the following service URL only for demo purposes -->
    <ejs-documenteditorcontainer        
        #document_editor
        id="container"
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
export class App { @ViewChild('document_editor')
    public webMcpSettings: any = {
        name: 'container',
        tools: [ 'getDocumentBookmarks', 'getSelectionText', 'find', 'findAll', 'goToPage' ] //Register only with needed tools
    };
}
