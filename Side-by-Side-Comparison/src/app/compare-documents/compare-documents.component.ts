import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  DocumentEditorContainerComponent,
  DocumentEditorContainerModule,
  ToolbarService,
} from '@syncfusion/ej2-angular-documenteditor';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { originalDocument, revisedDocument } from '../../data';

@Component({
  selector: 'app-compare-documents',
  standalone: true,
  imports: [DocumentEditorContainerModule, ButtonModule],
  providers: [ToolbarService],
  templateUrl: './compare-documents.component.html',
  styleUrls: ['./compare-documents.component.css'],
})
export class CompareDocumentsComponent implements AfterViewInit {
  @ViewChild('editor1') public editor1!: DocumentEditorContainerComponent;
  @ViewChild('editor2') public editor2!: DocumentEditorContainerComponent;

  // Utilise the correct Service URL where the Import and CompareDocument Web APIs are hosted.
  // If you choose to use localhost, please update the URL below to 'http://localhost:62870/api/DocumentEditor/';
  public serviceUrl: string =
    'https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/';

  public originalFile: File | null = null;
  public revisedFile: File | null = null;
  public showResult: boolean = true;
  public compareClicked: boolean = false;
  public showRevisions: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef
  ) {}

  public ngAfterViewInit(): void {
    // Defer until the editor instances are ready in the DOM.
    setTimeout(() => this.initEditors(), 0);
  }

  private initEditors(): void {
    const ed1 = this.editor1?.documentEditor;
    const ed2 = this.editor2?.documentEditor;
    if (!ed1 || !ed2) {
      return;
    }

    ed1.open(JSON.stringify(originalDocument));
    ed2.showRevisions = false;
    ed2.open(JSON.stringify(revisedDocument));

    // Keep both editors scrolling in sync.
    ed1.viewChange = () =>
      this.syncScroll(this.editor1, this.editor2);
    ed2.viewChange = () =>
      this.syncScroll(this.editor2, this.editor1);
  }

  private isSyncing: boolean = false;
  private syncScroll(
    source: DocumentEditorContainerComponent,
    target: DocumentEditorContainerComponent
  ): void {
    if (this.isSyncing) {
      return;
    }
    const src = source?.documentEditor;
    const tgt = target?.documentEditor;
    if (!src || !tgt) {
      return;
    }
    this.isSyncing = true;
    try {
      tgt.selection.setScrollPosition(src.selection.getScrollPosition());
    } finally {
      // Release the lock on the next microtask so the destination editor's
      // own viewChange can fire before we re-arm.
      setTimeout(() => (this.isSyncing = false), 0);
    }
  }

  public formatFileSize(file: File): string {
    return (file.size / 1024).toFixed(0);
  }

  public onOriginalFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.originalFile = input.files[0];
    }
  }

  public onRevisedFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.revisedFile = input.files[0];
    }
  }

  public removeOriginalFile(event: MouseEvent): void {
    event.preventDefault();
    this.originalFile = null;
  }

  public removeRevisedFile(event: MouseEvent): void {
    event.preventDefault();
    this.revisedFile = null;
  }

  private openFileInEditor = async (
    file: File,
    editor: DocumentEditorContainerComponent | undefined
  ): Promise<void> => {
    if (!editor?.documentEditor) {
      return;
    }
    if (file.name.endsWith('.sfdt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const docData = e.target?.result as string | undefined;
        if (docData && editor.documentEditor) {
          editor.documentEditor.showRevisions = false;
          editor.documentEditor.open(docData);
        }
      };
      reader.readAsText(file);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(this.serviceUrl + 'Import', {
        method: 'POST',
        body: formData,
      });
      const sfdtString = await response.text();
      let sfdtObject: any = null;
      try {
        sfdtObject = JSON.parse(sfdtString);
      } catch {
        alert(
          'Failed to process the compared document due to no valid JSON. Please try again.'
        );
        return;
      }
      if (sfdtObject && editor.documentEditor) {
        editor.documentEditor.showRevisions = false;
        editor.documentEditor.open(sfdtObject);
      } else {
        alert('Unable to display the compared document. Please try again.');
      }
    } catch {
      alert(
        'This Compare Documents demo supports only DOCX and SFDT file formats. Please select a valid DOCX or SFDT document and try again.'
      );
    }
  };

  public onCompare = async (): Promise<void> => {
    if (this.originalFile == null || this.revisedFile == null) {
      return;
    }

    const isOriginalSupported =
      this.originalFile.name.endsWith('.sfdt') ||
      this.originalFile.name.endsWith('.docx');
    const isRevisedSupported =
      this.revisedFile.name.endsWith('.sfdt') ||
      this.revisedFile.name.endsWith('.docx');

    if (!isOriginalSupported || !isRevisedSupported) {
      alert(
        'This Compare Documents demo supports only DOCX and SFDT file formats. Please select a valid DOCX or SFDT document and try again.'
      );
      return;
    }

    this.compareClicked = true;
    this.showRevisions = false;
    this.showHideWaitingIndicator(true);
    try {
      if (this.showResult) {
        await this.openFileInEditor(this.originalFile, this.editor1);
        if (this.originalFile && this.revisedFile) {
          await this.loadComparedDocumentAndOpen(
            this.editor2,
            this.originalFile,
            this.revisedFile
          );
        }
      } else {
        await this.openFileInEditor(this.originalFile, this.editor1);
        await this.openFileInEditor(this.revisedFile, this.editor2);
      }
    } finally {
      this.showHideWaitingIndicator(false);
    }
  };

  private async loadComparedDocumentAndOpen(
    editor: DocumentEditorContainerComponent | undefined,
    originalFile: File,
    revisedFile: File
  ): Promise<void> {
    if (!editor?.documentEditor) {
      return;
    }
    const formData = new FormData();
    formData.append('originalFile', originalFile);
    formData.append('revisedFile', revisedFile);
    formData.append('author', 'Author');
    formData.append('dateTime', new Date().toISOString());
    const response = await fetch(this.serviceUrl + 'CompareDocuments', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      alert('Failed to compare the selected documents. Please try again.');
      return;
    }
    const sfdtString = await response.text();
    let sfdtObject: any = null;
    try {
      sfdtObject = JSON.parse(sfdtString);
    } catch {
      alert(
        'The comparison could not be completed due to no valid JSON. Please try again.'
      );
      return;
    }
    if (sfdtObject && editor.documentEditor) {
      editor.documentEditor.showRevisions = false;
      editor.documentEditor.open(sfdtObject);
    } else {
      alert('Unable to display the comparison result. Please try again.');
    }
  }

  public onShowResultChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.showResult = input.checked;
  }

  public onDownload(): void {
    if (this.editor2?.documentEditor) {
      this.editor2.documentEditor.save('Result', 'Docx');
    }
  }

  public toggleRevisionPane(): void {
    this.showRevisions = !this.showRevisions;
  }

  private showHideWaitingIndicator(show: boolean): void {
    const waitingPopUp: HTMLElement | null =
      this.elRef.nativeElement.querySelector('#waiting-popup');
    const inActiveDiv: HTMLElement | null =
      this.elRef.nativeElement.querySelector('#popup-overlay');
    if (waitingPopUp && inActiveDiv) {
      inActiveDiv.style.display = show ? 'block' : 'none';
      waitingPopUp.style.display = show ? 'block' : 'none';
    }
  }
}
