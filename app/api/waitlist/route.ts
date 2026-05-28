import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    message: 'Form is now handled by Zoho. No API needed.',
  });
}
