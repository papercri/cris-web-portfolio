import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// ── Rate limit: 2 requests / 60s por IP ────────────────────────────────────
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 60_000 }); return false; }
  if (entry.count >= 2) return true;
  entry.count++;
  return false;
}

// ── Sanitize: elimina etiquetas HTML y caracteres peligrosos ───────────────
function sanitize(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, '')      // strip HTML tags
    .replace(/&[a-z#0-9]+;/gi, ' ') // decode HTML entities
    .replace(/[<>"'`]/g, '')      // remove remaining dangerous chars
    .trim();
}

// ── Escape para el HTML del email ─────────────────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting por IP
  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ??
    req.socket.remoteAddress ??
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // Extraer y limitar longitud antes de sanitizar
  const name    = sanitize(String(req.body?.name    ?? '').slice(0, 100));
  const email   = String(req.body?.email ?? '').trim().toLowerCase().slice(0, 200);
  const message = sanitize(String(req.body?.message ?? '').slice(0, 2000));

  // Validar
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (name.length < 2 || message.length < 5) {
    return res.status(400).json({ error: 'Fields too short' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Mensaje desde tu Web: ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #2563eb;">Nuevo mensaje de contacto</h2>
          <p><strong>De:</strong> ${esc(name)} (${esc(email)})</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="white-space: pre-wrap;">${esc(message)}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">Enviado desde https://frontend-ux.website/</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}