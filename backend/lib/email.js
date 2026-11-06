// Emails go out through Brevo. Without BREVO_API_KEY they print to the console, so local testing sends nothing.
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ROYAL = '#2B5B84';
const GOLD = '#D4A853';
const site = () => (process.env.CLIENT_URL || 'http://localhost:3020').split(',')[0];

function layout(heading, inner) {
  return `<!doctype html><html><body style="margin:0;background:#F9F9FB;font-family:Inter,Helvetica,Arial,sans-serif;color:#18222D">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" style="max-width:580px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #E4E8EE" cellpadding="0" cellspacing="0">
<tr><td style="background:${ROYAL};padding:26px 32px;border-bottom:4px solid ${GOLD}">
<table role="presentation"><tr><td><img src="${esc(site())}/crest.png" alt="" height="54" style="display:block"></td>
<td style="padding-left:14px;color:#fff;font-family:Georgia,serif"><div style="font-size:19px;font-weight:bold">Bethel House of God Academy</div><div style="font-size:13px;font-style:italic;color:${GOLD}">Real Christian Values, Real life Education</div></td></tr></table></td></tr>
<tr><td style="padding:28px 32px 8px;font-family:Georgia,serif;font-size:24px;color:${ROYAL}">${esc(heading)}</td></tr>
<tr><td style="padding:8px 32px 28px;font-size:15px;line-height:1.6">${inner}</td></tr>
<tr><td style="padding:16px 32px;border-top:1px solid #eee;font-size:12px;color:#7A8592">Bethel House of God Academy (BHGA) · ${esc(process.env.ADMISSIONS_EMAIL || '')}</td></tr>
</table></td></tr></table></body></html>`;
}

const rows = (pairs) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px">${pairs
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee;color:#7A8592;width:42%;vertical-align:top">${esc(k)}</td><td style="padding:8px 10px;border-bottom:1px solid #eee;font-weight:600">${esc(v)}</td></tr>`)
    .join('')}</table>`;

async function send({ to, subject, html, replyTo }) {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    console.log(`[email] (not sent: no BREVO_API_KEY) to=${to} subject="${subject}"`);
    return;
  }
  // Outside production only addresses in EMAIL_TEST_ALLOW get real email, so testing never writes to real parents.
  if (process.env.NODE_ENV !== 'production') {
    const allow = (process.env.EMAIL_TEST_ALLOW || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!allow.includes(String(to).toLowerCase())) {
      console.log(`[email] (not sent: ${to} is not in EMAIL_TEST_ALLOW) subject="${subject}"`);
      return;
    }
  }
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || 'Bethel House of God Academy' },
      to: [{ email: to }],
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

const { waitUntil } = require('@vercel/functions');

// Never let a failed email lose a submission: it's already saved, so log and carry on.
// Emails go out after the reply; waitUntil keeps a Vercel function alive until they're sent (elsewhere it does nothing).
function notify(staff, parent) {
  const job = sendAll(staff, parent);
  waitUntil(job);
  return job;
}

async function sendAll(staff, parent) {
  const admissions = process.env.ADMISSIONS_EMAIL;
  const jobs = [];
  if (admissions) jobs.push(send({ to: admissions, ...staff }));
  if (parent) jobs.push(send(parent));
  const results = await Promise.allSettled(jobs);
  results.filter((r) => r.status === 'rejected').forEach((r) => console.error('[email]', r.reason?.message || r.reason));
}

module.exports = { layout, rows, notify, esc };
