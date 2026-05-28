# ⚡ Email Quick Setup (2 Minutes)

## ONE THING TO CHANGE

In your Google Apps Script, find line 8:

```javascript
const ADMIN_EMAIL = "your-email@gmail.com";
```

Change it to YOUR EMAIL:

```javascript
const ADMIN_EMAIL = "your-real-email@gmail.com";
```

**That's it!** ✅

## What Happens Now

When someone joins:
1. ✉️ They get a beautiful welcome email
2. 📬 You get a notification email
3. 📊 Email count shows in your notification

## Test It

1. Save the script
2. Go to landing page
3. Sign up with a test email
4. Check inbox (both mailboxes)

## Customize Later (Optional)

Want to change the email design? Edit the HTML in:
```javascript
function sendConfirmationEmail(userEmail) {
  const htmlBody = `
    <!-- Your HTML here -->
  `;
}
```

See `EMAIL_EXAMPLES.md` for customization ideas.

## Troubleshooting

❌ "No email received"
- Did you update ADMIN_EMAIL? 
- Is it the same Gmail account as Apps Script?
- Check spam folder

❌ "Wrong email is admin"
- Update ADMIN_EMAIL in the script
- Save and redeploy

✅ Everything working? Great! You're done! 🎉

---

**Full docs**: See `EMAIL_AUTOMATION_SETUP.md`
