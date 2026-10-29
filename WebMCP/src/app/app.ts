import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    DocumentEditorContainerModule,
    DocumentEditorContainerComponent,
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
        #documenteditor_default
        serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
        height="590px"
        style="width:100%;display:block"
        [enableToolbar]="true"
        [enableWebMcp]="true"
        toolbarMode="Ribbon"
        [webMcpSettings]="webMcpSettings"
        (created)="created()">
    </ejs-documenteditorcontainer>
`,
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, RibbonService]
})
export class App {

    @ViewChild('documenteditor_default')
    public container!: DocumentEditorContainerComponent;

    public webMcpTools: any[] = [];

    public documentEditorSettings: any = {
        showRuler: true,
        showBookmarks: true,
        showHiddenMarks: true
    };

    public webMcpSettings: any = {
        name: 'container'
    };
}
