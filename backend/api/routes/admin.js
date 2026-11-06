const crypto = require('crypto');
const express = require('express');
const prisma = require('../../lib/prisma');
const { HttpError } = require('../middleware/validation');

const router = express.Router();

const MODELS = { enquiries: 'enquiry', applications: 'application', consultations: 'consultation' };
const STATUSES = ['NEW', 'CONTACTED', 'ENROLLED', 'CLOSED'];

// One shared key from ADMIN_API_KEY, compared in constant time.
router.use((req, res, next) => {
  const expected = process.env.ADMIN_API_KEY || '';
  const given = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (expected.length < 16 || a.length !== b.length || !crypto.timingSafeEqual(a, b)) return next(new HttpError(401, 'Not authorised.'));
  next();
});

router.get('/:type', async (req, res, next) => {
  try {
    const model = MODELS[req.params.type];
    if (!model) throw new HttpError(404, 'Not found.');
    res.json(await prisma[model].findMany({ orderBy: { createdAt: 'desc' }, take: 500 }));
  } catch (err) { next(err); }
});

router.patch('/:type/:id', async (req, res, next) => {
  try {
    const model = MODELS[req.params.type];
    const id = Number(req.params.id);
    if (!model || !Number.isInteger(id)) throw new HttpError(404, 'Not found.');
    if (!STATUSES.includes(req.body?.status)) throw new HttpError(400, 'Unknown status.');
    res.json(await prisma[model].update({ where: { id }, data: { status: req.body.status } }));
  } catch (err) {
    if (err.code === 'P2025') return next(new HttpError(404, 'Not found.'));
    next(err);
  }
});

module.exports = router;
