/**
 * TechsBridge — Project Enquiry → Google Sheets
 *
 * Deploy this as a Web App (Extensions → Apps Script → Deploy → New deployment).
 * See README-enquiry-integration.md in the project root for full step-by-step
 * setup instructions.
 *
 * ── CONFIGURE THESE TWO VALUES ──────────────────────────────────────────
 */
const SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";
const SHEET_NAME = "Enquiries";

/**
 * Optional: set a business email here to get notified on every new enquiry.
 * Leave as an empty string "" to disable notifications entirely. A failed
 * notification email never blocks the Sheet row from being saved.
 */
const NOTIFY_EMAIL = ""; // e.g. "nishantali777@gmail.com"

/** Column order written to the sheet — keep in sync with the header row. */
const COLUMNS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Company / Organization",
  "Service",
  "Budget",
  "Project Description",
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "No data received." });
    }

    const data = JSON.parse(e.postData.contents);

    // Server-side validation, independent of whatever the Next.js API already did —
    // this endpoint should never trust its caller blindly.
    const required = ["name", "email", "phone", "service", "budget", "details"];
    for (const field of required) {
      if (!data[field] || String(data[field]).trim() === "") {
        return jsonResponse({ success: false, error: `Missing required field: ${field}` });
      }
    }

    const sheet = getOrCreateSheet();
    ensureHeaderRow(sheet);

    const row = [
      new Date(),
      String(data.name).trim(),
      String(data.email).trim(),
      String(data.phone).trim(),
      data.company ? String(data.company).trim() : "",
      String(data.service).trim(),
      String(data.budget).trim(),
      String(data.details).trim(),
    ];

    sheet.appendRow(row);

    maybeSendNotification(data);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err && err.message ? err.message : err) });
  }
}

/** Simple health check — visiting the deployed URL in a browser should show this. */
function doGet() {
  return jsonResponse({ success: true, message: "TechsBridge enquiry endpoint is live." });
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
}

function maybeSendNotification(data) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: `New project enquiry — ${data.name}`,
      body:
        `New enquiry received:\n\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Company: ${data.company || "—"}\n` +
        `Service: ${data.service}\n` +
        `Budget: ${data.budget}\n\n` +
        `Project Description:\n${data.details}\n`,
    });
  } catch (err) {
    // Never let a failed notification email break the Sheet write — it has
    // already succeeded by the time this runs.
    console.error("Notification email failed:", err);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
