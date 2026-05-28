# Google Sheet Waitlist Setup Guide for Luci Landing Page

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (name it "Luci Waitlist" or similar)
3. Create a sheet named **"Waitlist"** (default first sheet is fine)

## Step 2: Set Up Columns

In the "Waitlist" sheet, create headers in the first row:

| Column A | Column B | Column C |
|----------|----------|----------|
| Email | Timestamp | Status |

Example:
- Cell A1: `Email`
- Cell B1: `Timestamp`
- Cell C1: `Status`

## Step 3: Create Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Delete all existing code
4. Copy the entire code from `GOOGLE_APPSCRIPT.gs` file
5. Paste it into the Apps Script editor
6. Click **Save** (give it a name like "Luci Waitlist Handler")

## Step 4: Deploy as Web App

1. In Apps Script, click **Deploy** → **New Deployment**
2. Select type: **Web app**
3. Configure deployment:
   - **Execute as**: Your email/account
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. You'll get a **Deployment ID** and a **URL** that looks like:
   ```
   https://script.google.com/macros/d/{DEPLOYMENT_ID}/userweb
   ```
6. **Copy and save this URL** - you'll need it for the landing page

## Step 5: Update Landing Page

In your `app/page.tsx`, update the `handleSubmit` function:

Replace this line in `handleSubmit`:
```typescript
// Simulate form submission
setTimeout(() => {
```

With:
```typescript
try {
  const response = await fetch(
    'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formState.email,
      }),
    }
  );

  const result = await response.json();

  if (result.success) {
    setFormState((prev) => ({
      ...prev,
      status: 'success',
      message: 'Thanks for joining! Check your email for updates.',
      email: '',
    }));

    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        status: 'idle',
        message: '',
      }));
    }, 5000);
  } else {
    setFormState((prev) => ({
      ...prev,
      status: 'error',
      message: result.message || 'Failed to join waitlist',
    }));
  }
} catch (error) {
  setFormState((prev) => ({
    ...prev,
    status: 'error',
    message: 'Error: Could not connect to server',
  }));
}
```

Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual deployment URL.

## Step 6: Test It

1. Go to your landing page at `http://localhost:3000`
2. Enter an email in the waitlist form
3. Click "Join Waitlist"
4. Check your Google Sheet - the email should appear in Column A

## Features

✅ **Email Validation** - Only valid emails are accepted
✅ **Timestamp** - Each submission is timestamped
✅ **Status Tracking** - Marked as "Active"
✅ **Error Handling** - Returns meaningful error messages
✅ **GET Endpoint** - Check total count: `YOUR_URL?action=getCount`

## Troubleshooting

**Issue: "Sheet not found"**
- Make sure your sheet is named exactly "Waitlist"
- Or change the sheet name in the Apps Script line:
  ```javascript
  const sheet = spreadsheet.getSheetByName("Your Sheet Name");
  ```

**Issue: "Anyone can access" showing as deployment restriction**
- Go to **Settings** in Apps Script
- Make sure you have the correct permissions

**Issue: CORS Error**
- This is normal - Google Apps Script handles CORS for web apps
- The error message will show but data will still be saved

## Security Notes

⚠️ **Anyone can submit to your form** (that's intentional for a public landing page)
🔒 **No sensitive data** - Only storing emails
🛡️ **Email validation** - Prevents invalid submissions

## View Your Waitlist

- Open the Google Sheet anytime to see all submissions
- Sort by timestamp to see newest entries
- Filter by status to manage responses

---

**Next Steps:**
1. Replace the `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` in the code
2. Test with a sample email
3. Share the sheet only with team members who need access
4. Monitor signups in real-time!
