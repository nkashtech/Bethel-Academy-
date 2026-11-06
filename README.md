# Bethel House of God Academy website

The public website for **Bethel House of God Academy (BHGA)**, *Real Christian Values, Real life Education*. Built from `docs/website-structure.txt` (the "Bethel House of God Academy Website Structure" document) with the same stack and layout as NkashHeaven-HR:

- **frontend/**: React 18, Vite, Tailwind CSS, React Router
- **backend/**: Node/Express, Prisma, MySQL, Brevo for email

## Pages

| Page | Path |
|---|---|
| Home (hero, welcome, BHGA Advantage, learning pathways, 4 steps, enquiry form) | `/` |
| About Us (vision, mission, statement of faith, academic structure) | `/about` |
| Academics & Programs (four phases, IGCSE streams, USAf track) | `/academics` |
| Private Candidate & Exam Guide | `/exam-guide` |
| Tuition & Fees | `/fees` |
| Edubridge E-Learning | `/edubridge` |
| Admissions & Contact (application form, contact details, Zoom consultation booking) | `/admissions` |
| Admissions inbox for staff | `/admin` |

The header carries the crest, name, motto, the six menu links and the **Enroll Now** and **Book a Free Consultation** buttons. The footer carries the mandatory legal disclaimer on every page.

## Change the wording, fees or contact details

All text, fees, subjects and contact details live in one file: `frontend/src/content/site.js`. **Replace the placeholder phone number** (`phone` and `whatsapp`) before going live.

The photos are free Unsplash placeholders, listed under `photos` in the same file. Swap them for the school's own photos by putting the files in `frontend/public/photos/` and changing each entry to `'/photos/your-file.jpg'`.

The crest (`frontend/public/crest.png`), favicon and app icons were cut from the supplied logo (`docs/bhga-logo.jpg`).

Brand colours are in `frontend/tailwind.config.js`: Royal Blue `#2B5B84`, Warm Gold `#D4A853`, Soft White `#F9F9FB`. Headings use Cormorant Garamond (elegant serif, to match the crest), body text uses Inter.

## Run locally

Prerequisites: Node 18+ and MySQL 8+.

```bash
cd backend
cp .env.example .env        # then set ADMIN_API_KEY (openssl rand -hex 24)
npm install
npm run db:local            # leave running: a private MySQL on port 3318
```

In a second terminal:

```bash
cd backend
npx prisma migrate deploy
npm run dev                 # API on http://localhost:3021
```

In a third terminal:

```bash
cd frontend
npm install
npm run dev                 # website on http://localhost:3020 (proxies /api to :3021)
```

## Forms

| Form | Where | API |
|---|---|---|
| Admission enquiry | Home page | `POST /api/enquiries` |
| Enrollment application | `/admissions#apply` | `POST /api/applications` |
| 15-minute Zoom consultation | `/admissions#consultation` | `POST /api/consultations` |

Each submission is saved, emailed to `ADMISSIONS_EMAIL`, and confirmed to the parent by email. Without `BREVO_API_KEY` the emails print to the API console instead. Forms are rate-limited and have a hidden spam trap.

Staff read submissions at `/admin` with the `ADMIN_API_KEY`, and mark each one New, Contacted, Enrolled or Closed.

## Host it

You need a server with Docker, a domain and HTTPS. The API serves the built website, so it's one container on port 3021 behind an HTTPS proxy (Caddy, Nginx, or your host's load balancer).

```bash
cp .env.production.example .env.production   # fill in your domain, admin key and Brevo key
```

```bash
export MYSQL_ROOT_PASSWORD=choose-a-strong-password
```

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

The website can also be hosted on its own (Vercel, Netlify) from `frontend/` with `VITE_API_URL` pointing at the API.
