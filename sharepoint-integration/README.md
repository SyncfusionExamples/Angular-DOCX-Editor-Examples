# Getting Started with Integrating Syncfusion Angular DOCX Editor in SharePoint

## Description

This repository provides a complete example of how to integrate the Syncfusion [Angular DOCX Editor](https://www.syncfusion.com/docx-editor-sdk/angular-docx-editor?utm_source=github&utm_medium=listing&utm_campaign=angular-docx-editor-github-samples) component into a SharePoint Framework (SPFx) web part using the modern Heft-based build toolchain introduced in SPFx v1.22+. SharePoint Framework enables fully client‑side solutions that run seamlessly within SharePoint Online pages.

## Prerequisites

- Use Node Version 22 (supported by SPFx 1.22)
- A valid Microsoft 365 tenant

## Application Setup & Running the Project (Clone & Run)

1. **Clone the repository to your local machine and navigate to the project folder.**
   ```bash
   git clone <repo>
   cd <repo>
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Update Tenant Domain in `config/serve.json`:**
   ```json
   "initialPage": "https://<your-tenant>.sharepoint.com/_layouts/15/workbench.aspx"
   ```
   **Note:** Replace `<your-tenant>` with your actual SharePoint Online tenant name.

4. **Trust the SPFx Dev Certificate:**
   ```bash
   heft trust-dev-cert
   ```
   Or simply trust when prompted during first run.

5. **Start the application:**
   ```bash
   npm start
   ```

6. **Allow debug scripts?**  
   From the browser opened in step 5, allow debug scripts by clicking `Load debug scripts`.

7. **Viewing Syncfusion Schedule Component**
   - Click the + (Add a web part in column one) icon in the browser window (SharePoint).
   - Select 'App' from the options shown.
   - Finally, you can see the Syncfusion Document Editor rendered in SharePoint.

## Output Preview

**Syncfusion Angular DOCX Editor**

![Angular DOCX Editor in SharePoint](./angular-docx-editor-sharepoint.png)

*Image illustrating the Syncfusion Angular DOCX Editor in SharePoint*