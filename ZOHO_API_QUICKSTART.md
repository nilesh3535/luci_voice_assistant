# ⚡ Zoho Sheet API Quick Start

## Best Option Yet! Direct Zoho API Integration

You can send data **directly** from your Next.js app to Zoho Sheet!

✅ Keep your beautiful form
✅ Send to Zoho Sheet via API
✅ Full control
✅ No extra tools
✅ Works with zohomail.in

---

## 5-Step Setup

### Step 1: Get Credentials (5 mins)

1. Go to [api-console.zoho.com](https://api-console.zoho.com)
2. Login with **zohomail.in**
3. Click **+ Add Client**
4. Name: "Luci Landing"
5. Type: "Web Application"
6. Save your:
   - **Client ID**
   - **Client Secret**

### Step 2: Get Access Token (3 mins)

1. Visit this URL (replace YOUR_CLIENT_ID):
```
https://accounts.zoho.in/oauth/v2/auth?
scope=ZohoSheet.dataAPI.CREATE
&client_id=YOUR_CLIENT_ID
&response_type=code
&redirect_uri=http://localhost:3000
&access_type=offline
```

2. You'll get a **code** in the URL
3. Exchange it for **access_token** (see full guide)

### Step 3: Get Sheet IDs (2 mins)

1. Open your Zoho Sheet
2. Get from URL or API:
   - **Workbook ID**
   - **Sheet ID**

### Step 4: Create API Key File (2 mins)

Create `.env.local`:
```
ZOHO_ACCESS_TOKEN=your_token_here
ZOHO_WORKBOOK_ID=your_workbook_id
ZOHO_SHEET_ID=your_sheet_id
```

### Step 5: Create API Route (3 mins)

Create `app/api/waitlist/route.ts` with code from `ZOHO_SHEET_API.md`

---

## Update Your Form

Change form handler to call your API:

```typescript
const response = await fetch('/api/waitlist', {
  method: 'POST',
  body: JSON.stringify({ email: formState.email })
});
```

That's it!

---

## Test It

1. Go to landing page
2. Submit email
3. Check your Zoho Sheet
4. Email should appear! ✅

---

## Advantages

✅ Keep your beautiful form design
✅ Keep your animations
✅ Direct Zoho integration
✅ Full control
✅ No extra forms
✅ Your branding 100%

---

## Files You Need

- Full guide: `ZOHO_SHEET_API.md`
- API code: See `app/api/waitlist/route.ts` example

---

## Support

For full setup details, see:
👉 `ZOHO_SHEET_API.md`

Want emails too?
👉 Use Zoho Flows to auto-send emails on new row

Start with API, add emails later! 🚀
