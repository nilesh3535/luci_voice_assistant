# 🔗 Zoho Sheet API Integration

## Perfect! You Can Use API Directly

Zoho provides REST API for Zoho Sheet, so you can:

✅ Keep your beautiful Next.js form
✅ Send data directly to Zoho Sheet via API
✅ No extra tools needed
✅ Full control over the process
✅ Works with your zohomail.in account

---

## Architecture

```
Your Landing Page
    ↓ (form submission)
Next.js API Route
    ↓ (authenticates)
Zoho Sheet API
    ↓
Your Zoho Sheet
```

---

## Step 1: Get Zoho API Credentials

### Generate OAuth Token

1. Go to [Zoho API Console](https://api-console.zoho.com)
2. Login with **zohomail.in** account
3. Click **+ Add Client**
   - Client Name: "Luci Landing Page"
   - Client Type: **Web Application**
   - Authorized Redirect URIs: `http://localhost:3000`
4. Click **Create**
5. You'll get:
   - **Client ID**
   - **Client Secret**
   - **Redirect URI**

### Get Authorization Code

1. Go to:
```
https://accounts.zoho.in/oauth/v2/auth?
  scope=ZohoSheet.dataAPI.READ,ZohoSheet.dataAPI.CREATE,ZohoSheet.dataAPI.UPDATE
  &client_id=YOUR_CLIENT_ID
  &response_type=code
  &redirect_uri=http://localhost:3000
  &access_type=offline
```

2. You'll get a **code** parameter in the URL
3. Save it

### Generate Access Token

Exchange code for token:

```bash
curl -X POST https://accounts.zoho.in/oauth/v2/token \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:3000" \
  -d "code=YOUR_CODE"
```

You'll get:
```json
{
  "access_token": "1000.xxx",
  "refresh_token": "1000.yyy",
  "expires_in": 3600
}
```

---

## Step 2: Get Workbook & Sheet IDs

### List Your Workbooks

```bash
curl -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN" \
  https://sheet.zoho.in/api/v2/workbooks
```

### Response will show:

```json
{
  "workbooks": [
    {
      "workbookId": "ABC123",
      "workbookName": "Luci Waitlist",
      "sheets": [
        {
          "sheetId": "XYZ789",
          "sheetName": "Waitlist"
        }
      ]
    }
  ]
}
```

Save:
- **WORKBOOK_ID**: ABC123
- **SHEET_ID**: XYZ789

---

## Step 3: Create .env.local

Add to your project:

```env
NEXT_PUBLIC_ZOHO_WORKBOOK_ID=ABC123
NEXT_PUBLIC_ZOHO_SHEET_ID=XYZ789
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
ZOHO_ACCESS_TOKEN=your_access_token
```

---

## Step 4: Create API Route

Create file: `app/api/waitlist/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const WORKBOOK_ID = process.env.NEXT_PUBLIC_ZOHO_WORKBOOK_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_ZOHO_SHEET_ID;
const ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email' },
        { status: 400 }
      );
    }

    // Check for duplicates
    const isDuplicate = await checkDuplicate(email);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          message: 'This email is already on our waitlist! 🎉',
          isDuplicate: true,
        },
        { status: 400 }
      );
    }

    // Add to Zoho Sheet
    const result = await addToZohoSheet(email);

    if (result.success) {
      // Send confirmation email (optional - use Zoho Flow or Mail API)
      await sendConfirmationEmail(email);

      return NextResponse.json({
        success: true,
        message: 'Email added successfully',
        email: email,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

async function checkDuplicate(email: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://sheet.zoho.in/api/v2/workbooks/${WORKBOOK_ID}/sheets/${SHEET_ID}/rows`,
      {
        method: 'GET',
        headers: {
          Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    const rows = data.rows || [];

    for (const row of rows) {
      const rowEmail = row.cell.find(
        (cell: any) => cell.columnName === 'Email'
      )?.value;
      if (rowEmail && rowEmail.toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking duplicates:', error);
    return false;
  }
}

async function addToZohoSheet(email: string): Promise<any> {
  try {
    const timestamp = new Date().toISOString();

    const response = await fetch(
      `https://sheet.zoho.in/api/v2/workbooks/${WORKBOOK_ID}/sheets/${SHEET_ID}/rows`,
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          row: {
            Email: email,
            Timestamp: timestamp,
            Status: 'Active',
          },
        }),
      }
    );

    const data = await response.json();

    if (data.code === 0) {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error adding to sheet:', error);
    return { success: false, message: 'Failed to add to sheet' };
  }
}

async function sendConfirmationEmail(email: string) {
  // You can use Zoho Mail API or Zoho Flow for this
  // For now, just log it
  console.log('Sending confirmation email to:', email);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

---

## Step 5: Update Landing Page Form

Update `app/page.tsx` form handler:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formState.email) {
    setFormState((prev) => ({
      ...prev,
      status: 'error',
      message: 'Please enter your email',
    }));
    return;
  }

  setFormState((prev) => ({
    ...prev,
    status: 'loading',
  }));

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formState.email,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setFormState((prev) => ({
        ...prev,
        status: 'success',
        message: 'Thanks for joining! 🎉 Check your email for updates.',
        email: '',
      }));

      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          status: 'idle',
          message: '',
        }));
      }, 5000);
    } else if (result.isDuplicate) {
      setFormState((prev) => ({
        ...prev,
        status: 'error',
        message: result.message,
      }));
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
      message: 'Connection error. Please try again.',
    }));
    console.error('Error:', error);
  }
};
```

---

## Key Features

✅ **Direct Zoho Sheet Integration**
✅ **Duplicate Email Prevention**
✅ **Timestamp Recording**
✅ **Status Tracking**
✅ **Error Handling**
✅ **Your Form Design** (not Zoho Forms)
✅ **Backend Validation**
✅ **Secure** (API key in .env)

---

## API Endpoints

### Insert Row
```
POST /api/v2/workbooks/{WORKBOOK_ID}/sheets/{SHEET_ID}/rows
Body: { row: { Email: "...", Timestamp: "...", Status: "Active" } }
```

### Get Rows
```
GET /api/v2/workbooks/{WORKBOOK_ID}/sheets/{SHEET_ID}/rows
```

### Update Row
```
PUT /api/v2/workbooks/{WORKBOOK_ID}/sheets/{SHEET_ID}/rows/{ROW_ID}
```

### Delete Row
```
DELETE /api/v2/workbooks/{WORKBOOK_ID}/sheets/{SHEET_ID}/rows/{ROW_ID}
```

---

## Documentation

Full Zoho Sheet API docs:
https://www.zoho.com/sheet/help/api/v2/#workbook-list-all-workbooks

---

## Advantages Over Forms

| Feature | Zoho Forms | Zoho API |
|---------|-----------|----------|
| Form Design | Pre-styled | Your design ✓ |
| Control | Limited | Full control ✓ |
| Customization | Limited | Unlimited ✓ |
| Validation | Basic | Advanced ✓ |
| Integration | Simple | Flexible ✓ |
| Your branding | Some limits | Full ✓ |

---

## Next Steps

1. Get API credentials (10 mins)
2. Create .env.local with tokens
3. Create API route
4. Update form handler
5. Test!

This gives you **full control** while keeping your **beautiful landing page**! 🚀
