class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,30}$/;

// Reads one text field: trimmed, length-checked, and required unless told otherwise.
function text(body, key, label, { max = 200, required = true, min = 1 } = {}) {
  const raw = body?.[key];
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) {
    if (required) throw new HttpError(400, `${label} is required.`);
    return null;
  }
  if (value.length < min || value.length > max) throw new HttpError(400, `${label} must be between ${min} and ${max} characters.`);
  return value;
}

const email = (body, key = 'email', label = 'Email address') => {
  const v = text(body, key, label, { max: 160 });
  if (!EMAIL.test(v)) throw new HttpError(400, 'Please enter a valid email address.');
  return v.toLowerCase();
};

const phone = (body, key = 'phone', label = 'Phone number') => {
  const v = text(body, key, label, { max: 30 });
  if (!PHONE.test(v)) throw new HttpError(400, 'Please enter a valid phone or WhatsApp number.');
  return v;
};

function oneOf(body, key, label, options) {
  const v = text(body, key, label, { max: 60 });
  if (!options.includes(v)) throw new HttpError(400, `Please choose a valid ${label.toLowerCase()}.`);
  return v;
}

function date(body, key, label, { min, max } = {}) {
  const v = text(body, key, label, { max: 10 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) throw new HttpError(400, `${label} must be a date.`);
  const d = new Date(`${v}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) throw new HttpError(400, `${label} must be a date.`);
  if (min && d < min) throw new HttpError(400, `${label} is too early.`);
  if (max && d > max) throw new HttpError(400, `${label} is too late.`);
  return d;
}

module.exports = { HttpError, text, email, phone, oneOf, date };
