import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { deviceType, userAgent } = await request.json();

    // Ensure your Resend API key is stored in the environment variable RESEND_API_KEY
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    // Send the email via Resend's API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'nosend@resend.com', // Replace with your sender email
        to: 'ibrahimelsawalhi0@gmail.com', // Replace with your receiving email
        subject: `New Visitor: ${deviceType}`,
        html: `<p>A new visitor has visited your website.</p>
               <p><strong>Device Type:</strong> ${deviceType}</p>
               <p><strong>User Agent:</strong> ${userAgent}</p>`
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to send email', details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
