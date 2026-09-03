# Project Enquiry → Google Sheets integration

Architecture:

```
Contact form (components/sections/Contact.tsx)
        │  POST JSON
        ▼
Next.js API route  (app/api/enquiry/route.ts)
        │  validates, sanitizes, then forwards
        ▼
Google Apps Script Web App  (apps-script/Code.gs)
        │  appendRow()
        ▼
Google Sheet
```

The Apps Script URL is never sent to the browser. The React form only ever
talks to `/api/enquiry` on your own domain; that server-side route is the
only thing that knows the Apps Script URL, read from
`process.env.GOOGLE_SHEETS_WEBHOOK_URL`.

## 1. Create the Google Sheet

1. Create a new Google Sheet.
2. Rename the tab (bottom-left) to `Enquiries` — or pick your own name, you'll
   just need to put it into `SHEET_NAME` in the script below.
3. You don't need to type the header row yourself — the script adds it
   automatically the first time it runs, as:

   `Timestamp | Name | Email | Phone | Company / Organization | Service | Budget | Project Description`

4. Copy the **Spreadsheet ID** from the sheet's URL:

   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_IS_HERE/edit
   ```

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `Code.gs` content and paste in the contents of
   [`apps-script/Code.gs`](./apps-script/Code.gs) from this project.
3. At the top of the script, set:

   ```js
   const SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";
   const SHEET_NAME = "Enquiries";
   ```

4. (Optional) Set `NOTIFY_EMAIL` to your business email to get an email for
   every new enquiry. Leave it as `""` to disable notifications — a failed
   notification email never blocks the Sheet row from being saved.

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Type: **Web app**.
3. Description: anything, e.g. "TechsBridge enquiry endpoint".
4. **Execute as:** Me.
5. **Who has access:** Anyone (this makes the *endpoint* reachable — it does
   **not** make the Sheet itself public; the Sheet stays private and is only
   ever read/written by the script running under your account).
6. Click **Deploy**, authorize the script when prompted, then copy the
   **Web app URL** — it looks like:

   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXX/exec
   ```

   You can sanity-check it by opening that URL directly in a browser — it
   should return `{"success":true,"message":"TechsBridge enquiry endpoint is live."}`.

## 4. Configure the Next.js project

`.env.local` has already been created in this project with:

```
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbyTbaMuD0ucG2YJCxq1UoiaIuZGkMXdqP3O9NzgzkRvpBhmLpI8TOdDflGfC5bkjcq4yg/exec"
```

If you ever redeploy the Apps Script and get a new URL, update that one
value and restart the dev server (`.env.local` is only read on start-up).

`.env.local` is already listed in `.gitignore` — it will never be committed.
For production (Vercel, etc.), set the same `GOOGLE_SHEETS_WEBHOOK_URL`
variable in your host's environment variable settings instead of committing
any file.

## 5. Restart and test

```
npm run dev
```

Then submit the form on the Contact section with real values and confirm:

- A new row appears in the `Enquiries` tab with a timestamp
- If `NOTIFY_EMAIL` is set, you receive an email
- The form shows "Thank you! Your project enquiry has been received.
  We'll get back to you shortly." and clears itself

## How validation works

**Client-side** (`components/sections/Contact.tsx`): required-field and
format checks run before anything is sent, so obviously-invalid submissions
never leave the browser. Errors show inline under each field.

**Server-side** (`app/api/enquiry/route.ts`): the API route re-validates
everything independently (name, email format, phone format, service must be
one of the known options, budget must be one of the known ranges, project
description required) and sanitizes every string field (trims whitespace,
strips `<`/`>` characters, caps length) before forwarding to Apps Script.
Company/Organization is the only optional field. The route never trusts the
client — this matters because the client check can always be bypassed by
calling the API directly.

**Apps Script side** (`apps-script/Code.gs`): re-checks required fields
again before writing a row, since this endpoint should never blindly trust
its caller either.

If `GOOGLE_SHEETS_WEBHOOK_URL` isn't set, the API returns a clear 503 error
rather than silently pretending the enquiry was saved. If the Apps Script
call times out (10s) or fails, the user sees the generic "Something went
wrong..." message — no stack traces or internal details are ever exposed to
the browser; the real error is only logged server-side via `console.error`.
