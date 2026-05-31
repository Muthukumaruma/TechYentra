import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
// reCAPTCHA Enterprise — needs Google Cloud API key + project ID
const RECAPTCHA_API_KEY    = process.env.RECAPTCHA_API_KEY;      // Google Cloud API key
const RECAPTCHA_PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID;   // GCP project ID
const RECAPTCHA_SITE_KEY   = '6Le2ogUtAAAAACHvmBZxPp72hah9Chsp8qvWu0r6';
const RECAPTCHA_MIN_SCORE  = 0.5;

const TO_EMAIL = 'info@techyenthra.com';
const FROM_NAME = 'TechYenthra Website';
// Use Resend's shared domain for testing; swap to 'noreply@techyenthra.com'
// once you verify your domain in the Resend dashboard.
const FROM_EMAIL = 'onboarding@resend.dev';

async function verifyRecaptcha(token) {
  // Enterprise uses a different REST endpoint than standard v3
  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: {
        token,
        siteKey: RECAPTCHA_SITE_KEY,
        expectedAction: 'contact_form',
      },
    }),
  });
  return r.json();
  // Returns: { tokenProperties: { valid, action }, riskAnalysis: { score, reasons } }
}

export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, company, phone, service, budget, message, captchaToken } = req.body || {};

  // ── reCAPTCHA verification ──────────────────────────────────────────────
  if (!captchaToken) {
    return res.status(400).json({ error: 'Missing security token. Please refresh and try again.' });
  }

  try {
    const captcha = await verifyRecaptcha(captchaToken);
    const valid = captcha?.tokenProperties?.valid;
    const score = captcha?.riskAnalysis?.score ?? 0;
    if (!valid || score < RECAPTCHA_MIN_SCORE) {
      console.warn('reCAPTCHA Enterprise failed:', JSON.stringify(captcha));
      return res.status(403).json({ error: 'Security check failed. Please try again or call us directly.' });
    }
  } catch (captchaErr) {
    console.error('reCAPTCHA verify error:', captchaErr);
    return res.status(500).json({ error: 'Could not verify security token.' });
  }

  // ── Field validation ────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    // ── 1. Notify TechYenthra team ──────────────────────────────────────────
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry from ${name}${service ? ` – ${service}` : ''}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px;">
          <div style="background:linear-gradient(135deg,#1d4ed8,#06b6d4);padding:24px 28px;border-radius:10px;margin-bottom:24px;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">New Contact Form Submission</h1>
            <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">TechYenthra Technologies Website</p>
          </div>

          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
            ${row('Name', name)}
            ${row('Email', `<a href="mailto:${email}" style="color:#1d4ed8;">${email}</a>`)}
            ${company ? row('Company', company) : ''}
            ${phone ? row('Phone', `<a href="tel:${phone}" style="color:#1d4ed8;">${phone}</a>`) : ''}
            ${service ? row('Service Interested', service) : ''}
            ${budget ? row('Budget', budget) : ''}
          </table>

          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;margin-top:16px;">
            <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
            <p style="margin:0;font-size:15px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;text-align:center;">
            Sent from techyenthra.com contact form · Reply directly to respond to ${escapeHtml(name)}
          </p>
        </div>
      `,
    });

    // ── 2. Auto-reply to the enquirer ───────────────────────────────────────
    await resend.emails.send({
      from: `TechYenthra Technologies <${FROM_EMAIL}>`,
      to: email,
      subject: `We received your enquiry, ${name.split(' ')[0]}! – TechYenthra Technologies`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px;">
          <div style="background:linear-gradient(135deg,#0a0f1e,#1e3a8a);padding:28px;border-radius:10px;margin-bottom:24px;text-align:center;">
            <h1 style="color:#fff;margin:0 0 8px;font-size:24px;font-weight:800;">Thank You, ${escapeHtml(name.split(' ')[0])}!</h1>
            <p style="color:rgba(255,255,255,0.6);margin:0;font-size:14px;">We've received your enquiry and will be in touch shortly.</p>
          </div>

          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:24px 28px;margin-bottom:16px;">
            <p style="margin:0 0 12px;font-size:15px;color:#0f172a;line-height:1.7;">
              Hi ${escapeHtml(name.split(' ')[0])},<br/><br/>
              Thank you for contacting <strong>TechYenthra Technologies</strong>. We've received your message and one of our team members will get back to you within <strong>24 hours</strong>.
            </p>
            ${service ? `<p style="margin:0;font-size:14px;color:#64748b;">You enquired about: <strong style="color:#1d4ed8;">${escapeHtml(service)}</strong></p>` : ''}
          </div>

          <div style="background:linear-gradient(135deg,rgba(29,78,216,0.04),rgba(6,182,212,0.04));border:1px solid rgba(29,78,216,0.1);border-radius:10px;padding:20px 24px;margin-bottom:16px;">
            <p style="margin:0 0 10px;font-weight:700;font-size:13px;color:#1d4ed8;">Need to reach us faster?</p>
            <p style="margin:0;font-size:14px;color:#475569;">
              📞 Call us: <a href="tel:+918105177337" style="color:#1d4ed8;font-weight:600;">+91 81051 77337</a><br/>
              📧 Email: <a href="mailto:info@techyenthra.com" style="color:#1d4ed8;">info@techyenthra.com</a>
            </p>
          </div>

          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;text-align:center;">
            TechYenthra Technologies Private Limited · Bengaluru, Karnataka, India<br/>
            <a href="https://www.techyenthra.com" style="color:#94a3b8;">www.techyenthra.com</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again or call us directly.' });
  }
}

function row(label, value) {
  return `
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:12px 20px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;width:130px;white-space:nowrap;">${label}</td>
      <td style="padding:12px 20px;font-size:15px;color:#0f172a;font-weight:500;">${value}</td>
    </tr>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
