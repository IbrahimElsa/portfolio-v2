import { NextResponse } from 'next/server';

// Bot detection identifiers
const BOT_IDENTIFIERS = [
  'bot', 'spider', 'crawl', 'crawler', 'prerender', 'headless', 
  'lighthouse', 'pingdom', 'pagespeed', 'googlebot', 
  'chrome-lighthouse', 'gtmetrix'
];

/**
 * Check if a user agent string belongs to a bot
 */
const isBot = (userAgent: string): boolean => {
  return BOT_IDENTIFIERS.some(identifier => 
    userAgent.toLowerCase().includes(identifier.toLowerCase())
  );
};

/**
 * Send email notification about a new visitor
 */
const sendEmailNotification = async (deviceType: string, userAgent: string): Promise<Response> => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Resend API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'your-verified-domain@resend.dev', 
        to: 'ibrahim.elsawalhi@outlook.com', 
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
};

export async function POST(request: Request) {
  try {
    const { deviceType, userAgent } = await request.json();

    // Additional server-side bot check
    if (isBot(userAgent)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Bot detected, notification skipped' 
      });
    }

    return sendEmailNotification(deviceType, userAgent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}