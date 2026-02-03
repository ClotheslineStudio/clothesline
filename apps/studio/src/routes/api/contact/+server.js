
import { sendContactEmail } from '$lib/server/email';

export async function POST({ request }) {
  console.log('Contact endpoint hit');
  const data = await request.json();
  console.log('Received data:', data);
  const { name, email, message, hidden_field } = data;

  // Honeypot anti-spam
  if (hidden_field) {
    return new Response(JSON.stringify({ error: 'Spam detected.' }), { status: 400 });
  }

  // Basic input validation
  if (
    typeof name !== 'string' || name.length < 2 ||
    typeof email !== 'string' || !email.includes('@') ||
    typeof message !== 'string' || message.length < 5
  ) {
    return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote_addr') || 'unknown';
  const timestamp = new Date().toISOString();

  try {
    await sendContactEmail({ name, email, message, ip, timestamp });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email.' }), { status: 500 });
  }
}
