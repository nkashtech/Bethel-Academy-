require('dotenv').config();

// Fail at start-up, not on the first form a parent sends.
const missing = ['DATABASE_URL', 'CLIENT_URL'].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  process.exit(1);
}
if ((process.env.ADMIN_API_KEY || '').length < 16) console.warn('ADMIN_API_KEY is missing or shorter than 16 characters: the /admin inbox is locked.');
if (!process.env.BREVO_API_KEY) console.warn('BREVO_API_KEY is not set: emails print to this console instead of being sent.');

const app = require('./index');

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => console.log(`BHGA website API listening on port ${PORT}`));
