import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DocumentEditorContainerComponent,
  DocumentEditorContainerModule,
  ToolbarService,
  RibbonService
} from '@syncfusion/ej2-angular-documenteditor';
import { ProtectionType } from '@syncfusion/ej2-documenteditor';
import documentProtectionData from '../assets/data-document-protection.json';

interface UserPermission {
  name: string;
  email: string;
  role: string;
  protectionType: ProtectionType;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentEditorContainerModule],
  providers: [ToolbarService, RibbonService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('documentEditorContainer')
  public container!: DocumentEditorContainerComponent;

  public users: UserPermission[] = [
    {
      name: 'Nancy',
      email: 'nancy@example.com',
      role: 'Price Editor',
      protectionType: 'ReadOnly',
      description: 'Can edit only the price values (editable ranges marked in the document)'
    },
    {
      name: 'Andrew',
      email: 'andrew@example.com',
      role: 'Reviewer',
      protectionType: 'RevisionsOnly',
      description: 'All edits are tracked as revisions; cannot accept or reject revisions'
    },
    {
      name: 'Steven',
      email: 'steven@example.com',
      role: 'Commenter',
      protectionType: 'CommentsOnly',
      description: 'Can insert comments only; cannot edit document content'
    },
    {
      name: 'Michael',
      email: 'michael@example.com',
      role: 'Editor',
      protectionType: 'NoProtection',
      description: 'Full editing access on the entire document'
    },
    {
      name: 'Laura',
      email: 'laura@example.com',
      role: 'Viewer',
      protectionType: 'ReadOnly',
      description: 'Read-only access to the document'
    }
  ];

  public selectedUserEmail: string = this.users[0].email;
  public currentUser: UserPermission = this.users[0];

  public onCreated(): void {
    const documentEditor = this.container.documentEditor;
    documentEditor.open(JSON.stringify(documentProtectionData));
    this.applyUserPermissions(this.currentUser);

    documentEditor.beforeAcceptRejectChanges = (args: any): void => {
      if (this.currentUser.email === 'andrew@example.com') {
        args.cancel = true;
      }
    };
  }

  public onUserChange(): void {
    const selected = this.users.find(
      (user) => user.email === this.selectedUserEmail
    );
    if (selected) {
      this.currentUser = selected;
      this.applyUserPermissions(this.currentUser);
    }
  }

  public applyUserPermissions(user: UserPermission): void {
    const documentEditor = this.container.documentEditor;
    if (!documentEditor) {
      return;
    }

    if (documentEditor.documentHelper.isDocumentProtected) {
      documentEditor.editorModule.unProtectDocument();
    }

    documentEditor.isReadOnly = false;
    documentEditor.currentUser = user.email;

    if (user.protectionType !== 'NoProtection') {
      documentEditor.editorModule.enforceProtection('', user.protectionType);
    }

    if (user.email === 'laura@example.com') {
      documentEditor.isReadOnly = true;
    }

    documentEditor.documentHelper.restrictEditingPane.showHideRestrictPane(false);
  }
}
