# 📧 Email Automation Setup Guide

## What It Does

The updated Google Apps Script **automatically sends 2 emails**:

1. **Confirmation Email to User** - Beautiful HTML email welcoming them to the waitlist
2. **Admin Notification** - Quick notification to you when someone signs up

## Setup (2 Steps)

### Step 1: Update Configuration

In the Google Apps Script, find this section at the top:

```javascript
// ⚙️ CONFIGURATION - UPDATE THESE
const ADMIN_EMAIL = "your-email@gmail.com"; // ← CHANGE THIS TO YOUR EMAIL
const SENDER_NAME = "Luci";
const SUBJECT_USER = "Welcome to Luci Waitlist! 🎤";
const SUBJECT_ADMIN = "New Luci Waitlist Signup";
```

Replace `"your-email@gmail.com"` with **your actual Gmail address** (must be the same account running the Apps Script).

### Step 2: Deploy & Test

1. Save the Apps Script
2. Go back to your landing page
3. Enter an email in the waitlist form
4. Click "Join Waitlist"
5. Check both inboxes:
   - User email should receive the welcome email
   - Your email should receive a notification

## Email Templates

### User Confirmation Email

Dark-themed professional email with:
- ✨ Cyan gradient design
- 🎤 Luci branding
- 📌 Call-to-action (Follow on Instagram)
- 🎁 What to expect (early access, features, community)

### Admin Notification Email

Simple text notification with:
- 📧 User email
- ⏰ Signup timestamp
- 📊 Total waitlist count
- 🔗 Direct link to your Google Sheet

## Advanced Customization

### Customize User Email Content

Find this section:

```javascript
function sendConfirmationEmail(userEmail) {
  const htmlBody = `
    <!-- Edit the HTML here -->
  `;
}
```

You can change:
- Colors (hex codes like `#00D9FF`)
- Text content
- Links
- Styling

### Customize Admin Email

Find this section:

```javascript
function sendAdminNotification(userEmail, timestamp) {
  const textBody = `
    <!-- Edit the text here -->
  `;
}
```

## Email Limits

⚠️ **Google Apps Script Email Limits:**
- 100 emails per day (free account)
- If you exceed, emails won't send until next day
- Upgrade to Google Workspace for higher limits

## Troubleshooting

**Problem: "No emails being sent"**
- Check that `ADMIN_EMAIL` is correct
- Make sure it's the same Gmail account that deployed the script
- Check Apps Script Logs: **View** → **Logs**

**Problem: "Email goes to spam"**
- Check spam folder
- Gmail marks automated emails differently
- Add your own email to contacts
- Use Workspace for better deliverability

**Problem: "Want to send more emails per day"**
- Upgrade to Google Workspace
- Or use SendGrid/Mailgun integration (advanced)

## Email Customization Examples

### Change Welcome Email Subject

```javascript
const SUBJECT_USER = "🎉 You're In! Join the Luci Movement";
```

### Add More Details to Admin Email

```javascript
const textBody = `
New Signup!
Email: ${userEmail}
Time: ${timestamp}
Total: ${totalCount}
Sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}

Instagram: @luci_voice_assistant
`;
```

## Testing Checklist

- [ ] Updated ADMIN_EMAIL with your Gmail
- [ ] Saved Apps Script
- [ ] Deployed as Web App
- [ ] Tested signup with real email
- [ ] User received welcome email
- [ ] Admin received notification
- [ ] Emails have correct branding

## Files Updated

- ✅ `GOOGLE_APPSCRIPT.gs` - Email sending functions added
- ✅ `FORM_INTEGRATION.tsx` - No changes needed (still works)

---

**Pro Tips:**

💡 Check your logs: **Apps Script** → **View** → **Logs** to debug
💡 Test with your own email first
💡 The HTML email looks best in Gmail, Outlook, Apple Mail
💡 You can customize the colors, text, and links
