const express = require('express');
const prisma = require('../../lib/prisma');
const { layout, rows, notify, esc } = require('../../lib/email');
const { PATHWAYS, GRADES, CURRICULA, START_DATES, TIMES } = require('../../lib/options');
const v = require('../middleware/validation');

const router = express.Router();

// Bots fill the hidden "website" field. Pretend it worked and save nothing.
const isBot = (req) => typeof req.body?.website === 'string' && req.body.website.trim() !== '';

const DAY = 86400000;

router.post('/enquiries', async (req, res, next) => {
  try {
    if (isBot(req)) return res.status(201).json({ ok: true });
    const b = req.body;
    const data = {
      parentName: v.text(b, 'parentName', 'Parent / Guardian Full Name', { max: 120 }),
      email: v.email(b),
      phone: v.phone(b, 'phone', 'WhatsApp / Phone Number'),
      grade: v.oneOf(b, 'grade', "Learner's Target Grade", GRADES),
      curriculum: v.oneOf(b, 'curriculum', 'Current Curriculum', CURRICULA),
    };
    const saved = await prisma.enquiry.create({ data });
    res.status(201).json({ ok: true, id: saved.id });

    notify(
      {
        subject: `New admission enquiry: ${data.parentName} (${data.grade})`,
        replyTo: data.email,
        html: layout('New admission enquiry', rows([
          ['Parent / Guardian', data.parentName], ['Email', data.email], ['WhatsApp / Phone', data.phone],
          ['Target grade', data.grade], ['Current curriculum', data.curriculum],
        ])),
      },
      {
        to: data.email,
        subject: 'We received your enquiry | Bethel House of God Academy',
        html: layout(`Thank you, ${data.parentName}`, `<p>Thank you for your interest in Bethel House of God Academy. Our admissions coordinator will get in touch with you shortly about ${esc(data.grade)}.</p>`),
      },
    );
  } catch (err) { next(err); }
});

router.post('/applications', async (req, res, next) => {
  try {
    if (isBot(req)) return res.status(201).json({ ok: true });
    const b = req.body;
    const now = Date.now();
    const pathway = v.text(b, 'pathway', 'Target Grade for Enrollment', { max: 30 });
    if (!PATHWAYS[pathway]) throw new v.HttpError(400, 'Please select the target grade for enrollment.');
    const data = {
      parentName: v.text(b, 'parentName', 'Parent / Guardian Full Name', { max: 120 }),
      email: v.email(b, 'email', 'Parent Email Address'),
      phone: v.phone(b, 'phone', 'Parent Phone / WhatsApp Number'),
      address: v.text(b, 'address', 'Physical Address / Location', { max: 250 }),
      studentName: v.text(b, 'studentName', 'Student Name & Surname', { max: 120 }),
      studentDob: v.date(b, 'studentDob', 'Student Date of Birth', { min: new Date('1995-01-01'), max: new Date(now) }),
      pathway,
      previousSchooling: v.text(b, 'previousSchooling', 'Current Curriculum / Previous Schooling', { max: 200 }),
      startDate: v.oneOf(b, 'startDate', 'Intended Start Date', START_DATES),
      comments: v.text(b, 'comments', 'Additional Comments', { max: 2000, required: false }),
    };
    const saved = await prisma.application.create({ data });
    res.status(201).json({ ok: true, id: saved.id });

    const summary = rows([
      ['Parent / Guardian', data.parentName], ['Email', data.email], ['Phone / WhatsApp', data.phone], ['Address / Location', data.address],
      ['Student', data.studentName], ['Date of birth', data.studentDob.toISOString().slice(0, 10)], ['Target grade', PATHWAYS[pathway]],
      ['Previous schooling', data.previousSchooling], ['Intended start', data.startDate], ['Comments', data.comments],
    ]);
    notify(
      { subject: `New enrollment application #${saved.id}: ${data.studentName}`, replyTo: data.email, html: layout('New enrollment application', summary) },
      {
        to: data.email,
        subject: 'Your application to Bethel House of God Academy',
        html: layout(
          'Application received',
          `<p>Dear ${esc(data.parentName)},</p><p>Thank you for applying to Bethel House of God Academy for ${esc(data.studentName)}. Our admissions coordinator will contact you about the next steps, including the once-off R1,000 registration fee.</p><p>Here is a copy of your application (reference #${saved.id}):</p>${summary}`,
        ),
      },
    );
  } catch (err) { next(err); }
});

router.post('/consultations', async (req, res, next) => {
  try {
    if (isBot(req)) return res.status(201).json({ ok: true });
    const b = req.body;
    const now = Date.now();
    const data = {
      name: v.text(b, 'name', 'Your Name', { max: 120 }),
      email: v.email(b),
      phone: v.phone(b, 'phone', 'Phone / WhatsApp'),
      preferredDate: v.date(b, 'preferredDate', 'Preferred Date', { min: new Date(now - DAY), max: new Date(now + 180 * DAY) }),
      preferredTime: v.oneOf(b, 'preferredTime', 'Preferred Time', TIMES),
      topic: v.text(b, 'topic', 'Topic', { max: 1000, required: false }),
    };
    const day = data.preferredDate.getUTCDay();
    if (day === 0 || day === 6) throw new v.HttpError(400, 'Consultations run Monday to Friday. Please choose a weekday.');
    const saved = await prisma.consultation.create({ data });
    res.status(201).json({ ok: true, id: saved.id });

    const when = `${data.preferredDate.toISOString().slice(0, 10)}, ${data.preferredTime}`;
    notify(
      {
        subject: `Zoom consultation request: ${data.name} (${when})`,
        replyTo: data.email,
        html: layout('New consultation request', rows([['Name', data.name], ['Email', data.email], ['Phone / WhatsApp', data.phone], ['Preferred', when], ['Topic', data.topic]])),
      },
      {
        to: data.email,
        subject: 'Your consultation request | Bethel House of God Academy',
        html: layout('Consultation requested', `<p>Dear ${esc(data.name)},</p><p>Thank you for booking a 15-minute Zoom consultation for <b>${esc(when)}</b> (SAST). We'll email you the Zoom link and confirm the time within one working day.</p>`),
      },
    );
  } catch (err) { next(err); }
});

module.exports = router;
