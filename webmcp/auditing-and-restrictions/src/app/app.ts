import { Component } from '@angular/core';
import {
    DocumentEditorContainerModule,
    ToolbarService,
    RibbonService,
    WebMcpToolExecuteEventArgs
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DocumentEditorContainerModule],
    template: `
    <ejs-documenteditorcontainer
        serviceUrl="https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"
        height="590px"
        style="width:100%;display:block"
        [enableToolbar]="true"
        [toolbarMode]="'Ribbon'"
        [enableWebMcp]="true"
        [webMcpSettings]="webMcpSettings"
        (beforeWebMcpToolExecute)="beforeWebMcpToolExecute($event)">
    </ejs-documenteditorcontainer>
`,
    providers: [ToolbarService, RibbonService]
})
export class App {
    public webMcpSettings: any = {
        name: 'container'
    };

    public beforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
        const { toolName, toolArgs } = args;

        // Audit all WebMCP tool invocations
        console.log(`[WebMCP] Executing: ${toolName}`, toolArgs);

        const commandName = toolName?.includes('_')
            ? toolName.substring(toolName.indexOf('_') + 1)
            : toolName;

        // Restrict a specific tool
        if (commandName === 'saveDocument') {
            args.cancel = true;
            args.cancellationResponse = 'The saveDocument operation has been restricted.';
        }
    }
}