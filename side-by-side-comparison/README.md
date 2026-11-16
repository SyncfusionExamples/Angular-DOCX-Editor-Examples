# Angular DOCX Editor – Side by Side Document Comparison

## Introduction

This sample demonstrates how to compare two Word documents side-by-side using the Syncfusion<sup style="font-size:70%">&reg;</sup> [Angular DOCX Editor](https://www.syncfusion.com/docx-editor-sdk/angular-docx-editor?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples) (Document Editor). It allows users to upload an original and a revised document, send them to the Document Editor web service for comparison, and view the comparison result with tracked revisions in a second editor next to the original.

### Features

- Upload an original Word document.
- Upload a revised Word document.
- Compare both documents via the hosted Document Editor web service.
- View tracked revisions in the comparison result.
- Toggle the revision review pane for the result.
- Switch between:
  - **Original vs Compared document** (with tracked changes)
  - **Original vs Revised document**
- Download the result as a `.docx` file.
- Synchronized scrolling between the two editors.

---

# How to Run the Application

## Prerequisites

Before running the sample, ensure the following software is installed:

- Node.js (LTS)
- npm

---

## Configuration

No additional configuration is required.

This sample is already configured to use the online Syncfusion Document Editor service:

```ts
const serviceUrl =
  "https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/"; // only for demo purpose.
```

Since the application consumes the hosted web service, you do **not** need to download, build, or run any ASP.NET Core Web API project.

> The Syncfusion<sup style="font-size:70%">&reg;</sup> packages are pinned with `*` in `package.json` so the sample always picks up the latest available version on `npm install`.

---

## Install Dependencies

Open the project folder in a terminal and install the required packages.

```bash
npm install
```

---

## Run the Application

Start the Angular development server.

```bash
npm start
```

The application will launch in your default browser.

If it does not open automatically, browse to:

```
http://localhost:4200
```

---

## Verify the Sample

1. Launch the application.
2. Click **Choose file** under **Original document** and select a DOCX (or SFDT) file.
3. Click **Choose file** under **Revised document** and select another version of the same document.
4. Click **Compare**.
5. The application sends both documents to the online Document Editor service.
6. The comparison result is displayed in the right-side editor with tracked revisions.
7. Toggle between:
   - **Original vs Compared**
   - **Original vs Revised**
8. Review insertions, deletions, and formatting changes using the Document Editor revision features.

---

## Demo

<p align="center">
  <img
    src="images/compare-documents-demo-angular-docx-editor.gif"
    alt="Angular DOCX Editor Compare Documents Demo"
    width="1000" />
</p>

---

# Project Workflow

The application follows the workflow below:

1. User uploads the original document.
2. User uploads the revised document.
3. Both documents are sent to the Syncfusion online Document Editor service.
4. The service:
   - Imports the DOCX files.
   - Compares both documents.
   - Generates a document with tracked revisions.
5. The comparison result is returned in SFDT format.
6. The Angular application loads the original document in the left editor.
7. The compared document (or revised document) is loaded in the right editor for side-by-side review.

```
Original DOCX
        │
        │
        ▼
Angular Application
        │
        │
        ▼
Syncfusion Online Document Editor Service
        │
        ├── Import Original
        ├── Import Revised
        └── Compare Documents
                │
                ▼
      Compared SFDT Document
                │
                ▼
Angular DOCX Editor
        │
        ├── Left Editor  → Original
        └── Right Editor → Compared / Revised
```

---

# Resources

- **Product page:** [Syncfusion® Angular DOCX Editor](https://www.syncfusion.com/docx-editor-sdk/angular-docx-editor?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples)
- **Documentation:** [Syncfusion® Angular DOCX Editor - Documentation](https://help.syncfusion.com/document-processing/word/word-processor/angular/overview?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples)
- **Online demo:** [Syncfusion® Angular DOCX Editor - Online demo](https://document.syncfusion.com/demos/docx-editor/angular/#/tailwind3/document-editor/default?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples)

# Support and feedback

For any other queries, reach our [Syncfusion® support team](https://support.syncfusion.com/?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples) or post the queries through the [community forums](https://www.syncfusion.com/forums?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples).

Request new feature through [Syncfusion® feedback portal](https://www.syncfusion.com/feedback?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples).

# License

This is a commercial product and requires a paid license for possession or use. Syncfusion's licensed software, including this component, is subject to the terms and conditions of [Syncfusion's EULA](https://www.syncfusion.com/license/studio/syncfusion_essential_studio_eula.pdf?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples). You can purchase a license [here](https://www.syncfusion.com/sales/products?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples) or start a free 30-day trial [here](https://www.syncfusion.com/account/manage-trials/start-trials?utm_source=github&utm_medium=listing&utm_campaign=github-angular-docx-editor-examples).
