# 📧 Email Examples

## Email 1: User Confirmation Email

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│          Welcome to Luci!                               │
│          🎤 Your AI Voice Assistant for Windows          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Hey Luci, bolo aur kaam ho jaaye                       │
│                                                         │
│  You're now on the exclusive waitlist for Luci - the   │
│  AI voice assistant built for Windows with native      │
│  support for Hindi, English, and Hinglish.             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  What to Expect:                                        │
│  ✨ Early access when Luci launches                     │
│  🎁 Exclusive features & updates                        │
│  💬 Direct access to our community                      │
│  🚀 Chance to shape the future of Luci                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│          [ Follow on Instagram ]                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  © 2026 Luci. All rights reserved.                      │
│  Hey Luci, bolo aur kaam ho jaaye.                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Email 2: Admin Notification Email

```
Subject: New Luci Waitlist Signup

---

New Luci Waitlist Signup!

Email: user@example.com
Time: 2026-01-15T10:30:00.000Z
Total Signups: 42

View your waitlist: https://docs.google.com/spreadsheets/d/xxxxx
```

## Configuration Steps

1. **Find the ADMIN_EMAIL setting:**
   ```javascript
   const ADMIN_EMAIL = "your-email@gmail.com"; // ← Change this
   ```

2. **Replace with your Gmail address:**
   ```javascript
   const ADMIN_EMAIL = "you@gmail.com"; // ✅ Now it's your email
   ```

3. **Save and test!**

## Customization Options

### Change User Email Subject
```javascript
const SUBJECT_USER = "🎉 You're In! Join the Luci Movement";
```

### Change Admin Email Subject
```javascript
const SUBJECT_ADMIN = "New Person Joined Luci! 🚀";
```

### Change Sender Name
```javascript
const SENDER_NAME = "Luci Team"; // Shows as "From: Luci Team"
```

### Add Custom Text to User Email

Find this line in `sendConfirmationEmail`:
```html
<h2 style="color: #00F0FF; margin-top: 0;">Hey Luci, bolo aur kaam ho jaaye</h2>
```

Edit the HTML between the tags to add your own text.

## HTML Email Styling Reference

```css
/* Colors */
#00D9FF  = Cyan/Turquoise
#00F0FF  = Lighter Cyan
#9D00FF  = Violet/Purple

/* Backgrounds */
rgba(0, 217, 255, 0.1)  = Very light cyan
rgba(0, 217, 255, 0.3)  = Light cyan border
rgba(0, 217, 255, 0.05) = Subtle cyan

/* Text Colors */
#ffffff  = White
#cccccc  = Light gray
#888888  = Medium gray
```

## Email Preview

When someone joins, they'll see:

**In their inbox:**
- From: "Luci" <your-email@gmail.com>
- Subject: "Welcome to Luci Waitlist! 🎤"
- Dark-themed HTML email with cyan/purple gradient

**In your inbox:**
- From: Google Apps Script <noreply@script.google.com>
- Subject: "New Luci Waitlist Signup"
- Plain text notification with counts and stats

## Testing Tips

1. **Use a test email** (not your main one)
2. **Check all folders**: Primary, Promotions, Updates, Spam
3. **Look at the HTML**: Right-click → "Show original" to see email source
4. **Test variations**: Try different email providers (Gmail, Outlook, etc.)

---

**Need help customizing?** Edit the HTML in the `sendConfirmationEmail` function!
