// ============================================================
// FreshLux Laundry – Google Apps Script Web App
// ------------------------------------------------------------
// HOW TO DEPLOY:
// 1. Open your Google Sheet:
//    https://docs.google.com/spreadsheets/d/18mc4zfBx7pjrSE-g9hNaWqwPjnPap60egk1W7Kfz_Rs/edit
// 2. Click Extensions → Apps Script
// 3. Delete any existing code and paste ALL of this file
// 4. Click Save (Ctrl+S)
// 5. Click Deploy → New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy → copy the Web App URL
// 7. Paste that URL into script.js as the value of APPS_SCRIPT_URL
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Nama', 'WhatsApp', 'Area', 'Parfum']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
      data.name   || '',
      data.phone  || '',
      data.area   || '',
      data.perfume || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test via browser GET (returns a simple confirmation)
function doGet() {
  return ContentService
    .createTextOutput('FreshLux Apps Script is running ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}
