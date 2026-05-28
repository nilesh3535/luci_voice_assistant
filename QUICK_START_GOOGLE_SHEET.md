# ⚡ Quick Start: Google Sheet Email Capture

## 3 Simple Steps

### Step 1️⃣: Set Up Google Sheet (2 mins)

1. Create new Google Sheet: [sheets.google.com](https://sheets.google.com)
2. First row headers:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Status`
3. Done! ✅

### Step 2️⃣: Deploy Google Apps Script (5 mins)

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Copy ALL code from `GOOGLE_APPSCRIPT.gs` file in your project
4. Paste into Apps Script editor
5. Click **Save**
6. Click **Deploy** → **New Deployment**
7. Type: **Web app**
   - Execute as: Your email
   - Access: **Anyone**
8. Click **Deploy** ✅
9. **Copy the URL** that appears (looks like: `https://script.google.com/macros/d/xxxxx/userweb`)

### Step 3️⃣: Update Landing Page (3 mins)

In your `app/page.tsx`, find the `handleSubmit` function and replace it with the code from `FORM_INTEGRATION.tsx`.

**Important:** Replace this line:
```
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb';
```

With your actual URL from Step 2.

---

## Test It ✅

1. Go to `http://localhost:3000`
2. Enter your email in "Join Waitlist"
3. Click button
4. Check your Google Sheet - email should appear! 🎉

---

## File References

- **Google Apps Script Code**: `GOOGLE_APPSCRIPT.gs` ← Copy this to Apps Script
- **Form Code**: `FORM_INTEGRATION.tsx` ← Copy this to app/page.tsx
- **Detailed Setup**: `GOOGLE_SHEET_SETUP.md` ← Full documentation
