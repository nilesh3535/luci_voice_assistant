// Google Apps Script for Luci Landing Page Email Waitlist
// Copy this entire code into Google Apps Script Editor

// ⚙️ CONFIGURATION - UPDATE THESE
const ADMIN_EMAIL = "your-email@gmail.com"; // Change to your email for notifications
const SENDER_NAME = "Luci";
const SUBJECT_USER = "Welcome to Luci Waitlist! 🎤";
const SUBJECT_ADMIN = "New Luci Waitlist Signup";

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Invalid email" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Waitlist"); // Change to your sheet name if different

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Sheet not found" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Check for duplicate email
    const emailColumn = sheet.getRange("A:A").getValues();
    const emailLowercase = email.toLowerCase();

    for (let i = 1; i < emailColumn.length; i++) {
      const existingEmail = emailColumn[i][0];
      if (existingEmail && existingEmail.toString().toLowerCase() === emailLowercase) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "This email is already on our waitlist! 🎉",
            isDuplicate: true
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Get the last row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;

    // Insert data
    const timestamp = new Date();
    sheet.getRange(nextRow, 1).setValue(email); // Column A: Email
    sheet.getRange(nextRow, 2).setValue(timestamp); // Column B: Timestamp
    sheet.getRange(nextRow, 3).setValue("Active"); // Column C: Status

    // Send confirmation email to user
    sendConfirmationEmail(email);

    // Send notification email to admin
    sendAdminNotification(email, timestamp);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Email added successfully",
        email: email,
        timestamp: timestamp,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error: " + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send confirmation email to user
function sendConfirmationEmail(userEmail) {
  try {
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #0B0C10 100%); padding: 40px 20px; border-radius: 10px; color: #ffffff;">

      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #00D9FF; margin: 0; font-size: 32px;">Welcome to Luci!</h1>
        <p style="color: #00F0FF; font-size: 14px; margin: 10px 0 0 0;">🎤 Your AI Voice Assistant for Windows</p>
      </div>

      <div style="background: rgba(0, 217, 255, 0.1); border: 1px solid rgba(0, 217, 255, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h2 style="color: #00F0FF; margin-top: 0;">Hey Luci, bolo aur kaam ho jaaye</h2>
        <p style="color: #cccccc; line-height: 1.6;">
          You're now on the exclusive waitlist for Luci - the AI voice assistant built for Windows with native support for Hindi, English, and Hinglish.
        </p>
      </div>

      <div style="background: rgba(0, 217, 255, 0.05); border-left: 3px solid #00D9FF; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <h3 style="color: #00F0FF; margin-top: 0;">What to Expect:</h3>
        <ul style="color: #cccccc; line-height: 1.8;">
          <li>✨ Early access when Luci launches</li>
          <li>🎁 Exclusive features & updates</li>
          <li>💬 Direct access to our community</li>
          <li>🚀 Chance to shape the future of Luci</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://www.instagram.com/luci_voice_assistant" style="display: inline-block; background: linear-gradient(135deg, #00D9FF, #00F0FF); color: #000000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
          Follow on Instagram
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(0, 217, 255, 0.2); margin: 30px 0;">

      <div style="text-align: center; color: #888888; font-size: 12px;">
        <p style="margin: 5px 0;">© 2026 Luci. All rights reserved.</p>
        <p style="margin: 5px 0;">Hey Luci, bolo aur kaam ho jaaye.</p>
      </div>

    </div>
    `;

    GmailApp.sendEmail(
      userEmail,
      SUBJECT_USER,
      "You're on the Luci waitlist! Check your email client for the full message.",
      {
        htmlBody: htmlBody,
        from: SENDER_NAME,
        name: SENDER_NAME,
      }
    );

    console.log("Confirmation email sent to: " + userEmail);
  } catch (error) {
    console.error("Error sending confirmation email: " + error);
  }
}

// Send admin notification
function sendAdminNotification(userEmail, timestamp) {
  try {
    const totalCount = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Waitlist")
      .getLastRow() - 1;

    const textBody = `
New Luci Waitlist Signup!

Email: ${userEmail}
Time: ${timestamp}
Total Signups: ${totalCount}

View your waitlist: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `;

    GmailApp.sendEmail(
      ADMIN_EMAIL,
      SUBJECT_ADMIN,
      textBody
    );

    console.log("Admin notification sent to: " + ADMIN_EMAIL);
  } catch (error) {
    console.error("Error sending admin notification: " + error);
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Optional: Function to get waitlist count
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Waitlist");

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, count: 0 })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Count emails (excluding header)
    const count = sheet.getLastRow() - 1;

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        count: count,
        message: "Total waitlist emails: " + count,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error: " + error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
