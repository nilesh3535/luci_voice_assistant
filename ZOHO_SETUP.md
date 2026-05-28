# 🔧 Zoho Sheet + Deluge Setup Guide

## Zoho Tools (Alternatives to Google)

| Google | Zoho |
|--------|------|
| Google Sheets | **Zoho Sheet** |
| Google Apps Script | **Zoho Deluge** (scripting) or **Zoho Flows** (automation) |
| Gmail | **Zoho Mail** |

## Option 1: Zoho Deluge (Recommended - Like Google Apps Script)

### Step 1: Create Zoho Sheet

1. Go to [zoho.com](https://www.zoho.com)
2. Create **Zoho Sheet** (login with your zohomail.in account)
3. Create spreadsheet named "Luci Waitlist"
4. Create headers:
   - Column A: `Email`
   - Column B: `Timestamp`
   - Column C: `Status`

### Step 2: Create Zoho Deluge Script

1. In your Zoho Sheet, click **Tools** → **Deluge Script**
2. Copy the code from `ZOHO_DELUGE_SCRIPT.zg` file (see below)
3. Paste into Deluge editor
4. Update your email address
5. Save and test

## Option 2: Zoho Flows (Easier - No Coding)

**If you prefer NO CODING:**

1. Go to **Zoho Flows**
2. Create new workflow:
   - **Trigger**: Webhook (for form submissions)
   - **Action 1**: Add to Zoho Sheet
   - **Action 2**: Send email to user
   - **Action 3**: Send email to admin
3. No coding required!

## Option 3: Zoho Forms (Simplest)

**EASIEST OPTION:**

Zoho has built-in **Zoho Forms** that:
- ✅ Captures emails automatically
- ✅ Saves to Zoho Sheet instantly
- ✅ Sends auto-reply emails
- ✅ No coding needed
- ✅ No custom webhook needed

Just embed the form on your landing page!

---

## Which Should You Use?

| Option | Best For | Ease |
|--------|----------|------|
| **Zoho Deluge** | Full control, custom logic | Medium |
| **Zoho Flows** | No-code automation | Easy |
| **Zoho Forms** | Simple form capture | Very Easy |

---

## Recommended: Use Zoho Forms

1. Create Zoho Form with email field
2. Embed on landing page (simple iframe)
3. Auto-saves to Zoho Sheet
4. Auto-sends emails
5. Done!

## Compare: Zoho vs Google

### Google Apps Script Advantages:
- ✅ Free (up to 100 emails/day)
- ✅ Very flexible
- ✅ Gmail integration

### Zoho Deluge Advantages:
- ✅ Works with Zoho Mail (your current email)
- ✅ Zoho Sheet native integration
- ✅ Better Zoho ecosystem support
- ✅ Zoho Mail branding

### Zoho Flows Advantages:
- ✅ No coding required
- ✅ Visual workflow builder
- ✅ Easy to modify
- ✅ Easy to understand

---

## Next Steps

Choose one option above and let me know which one you prefer:

**Option 1:** Use Zoho Deluge (I'll provide full code)
**Option 2:** Use Zoho Flows (I'll create step-by-step guide)
**Option 3:** Use Zoho Forms (Simplest - I'll show how to embed)

Which would you like?
