// Cloudflare Pages Function: handles enquiry form POSTs from /contact/.
//
// Required env vars (set in Pages dashboard → Settings → Environment variables):
//   RESEND_API_KEY      — API key from resend.com
//   CONTACT_TO_EMAIL    — recipient (Amy's address); defaults set in wrangler.toml
//   CONTACT_FROM_EMAIL  — verified sender on Resend; defaults set in wrangler.toml

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

const ENQUIRY_REDIRECT = '/thanks/';
const SPAM_REDIRECT = '/thanks/'; // silently succeed for spam — don't tell bots
const ERROR_REDIRECT = '/contact/?error=1';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.redirect(new URL(ERROR_REDIRECT, request.url).toString(), 303);
  }

  // Honeypot — real users leave this blank; bots fill every field.
  if ((form.get('website') as string | null)?.trim()) {
    return Response.redirect(new URL(SPAM_REDIRECT, request.url).toString(), 303);
  }

  const name = (form.get('name') as string | null)?.trim() ?? '';
  const email = (form.get('email') as string | null)?.trim() ?? '';
  const phone = (form.get('phone') as string | null)?.trim() ?? '';
  const childAge = (form.get('child_age') as string | null)?.trim() ?? '';
  const message = (form.get('message') as string | null)?.trim() ?? '';

  if (!name || !email || !phone || !message) {
    return Response.redirect(new URL(ERROR_REDIRECT, request.url).toString(), 303);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.redirect(new URL(ERROR_REDIRECT, request.url).toString(), 303);
  }

  const subject = `New enquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    childAge ? `Child's age: ${childAge}` : null,
    '',
    'Message:',
    message,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const html = `
    <h2>New enquiry — Blackfen Little Learners</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a></p>
    <p><strong>Phone:</strong> <a href="tel:${escape(phone)}">${escape(phone)}</a></p>
    ${childAge ? `<p><strong>Child's age:</strong> ${escape(childAge)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${escape(message).replace(/\n/g, '<br />')}</p>
  `;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '<unreadable>');
    console.log(`Resend error: ${resp.status} ${resp.statusText} — ${body}`);
    return Response.redirect(new URL(ERROR_REDIRECT, request.url).toString(), 303);
  }

  return Response.redirect(new URL(ENQUIRY_REDIRECT, request.url).toString(), 303);
};

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
