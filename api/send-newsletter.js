import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const SOUTH_SUDAN_TIME_ZONE = 'Africa/Juba';

function loadDotEnv() {
  try {
    const envPath = join(process.cwd(), '.env');
    if (!existsSync(envPath)) return {};
    const env = {};
    readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      env[key] = value;
    });
    return env;
  } catch {
    return {};
  }
}

const dotEnv = loadDotEnv();

function getEnv(key, fallback) {
  return process.env[key] || dotEnv[key] || fallback;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const MIME_MAP = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

async function fetchImageAttachment(imageUrl, cid) {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) return null;
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const buffer = Buffer.from(await response.arrayBuffer());
      return { filename: cid, content: buffer, contentType, cid };
    } catch {
      return null;
    }
  }

  const publicDir = join(process.cwd(), 'public');
  const filePath = join(publicDir, imageUrl);
  if (existsSync(filePath)) {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'image/jpeg';
    const buffer = readFileSync(filePath);
    return { filename: cid, content: buffer, contentType, cid };
  }
  return null;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: getEnv('SMTP_SERVER'),
    port: parseInt(getEnv('SMTP_PORT', '465'), 10),
    secure: (getEnv('SMTP_PROTOCOL', 'SSL')).toUpperCase() === 'SSL',
    auth: {
      user: getEnv('SMTP_USERNAME'),
      pass: getEnv('SMTP_PASSWORD'),
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function getSupabaseAdmin() {
  const url = getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL');
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!url || !serviceKey) {
    throw new Error('Missing VITE_SUPABASE_URL/SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, serviceKey);
}

function buildNewsletterHtml(article, siteUrl, unsubscribeToken, hasImage, hasLogo) {
  const safeTitle = escapeHtml(article.title);
  const safeCategory = escapeHtml(article.category);
  const safeExcerpt = escapeHtml(article.excerpt);
  const safeAuthor = escapeHtml(article.author);
  const safeDate = escapeHtml(article.date);
  const safeReadTime = escapeHtml(article.read_time);
  const articleUrl = `${siteUrl}/news/${encodeURIComponent(article.slug)}`;
  const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const year = new Date().toLocaleDateString('en-US', {
    timeZone: SOUTH_SUDAN_TIME_ZONE,
    year: 'numeric',
  });

  const imageBlock = hasImage
    ? `<img src="cid:article-image" alt="${safeTitle}" style="width: 100%; max-height: 280px; object-fit: cover; display: block;" />`
    : '';

  const logoBlock = hasLogo
    ? `<img src="cid:logo-image" alt="Doctors360" style="height: 60px; margin-bottom: 16px;" />`
    : '';

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e0f2f1;">
      <div style="background: linear-gradient(135deg, #0d4f4f 0%, #0a7e7e 100%); padding: 32px 24px; text-align: center;">
        ${logoBlock}
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
          New Story from Doctors360
        </h1>
        <p style="color: #b2dfdb; margin: 8px 0 0; font-size: 14px;">
          ${safeCategory} &mdash; ${safeDate}
        </p>
      </div>

      ${imageBlock}

      <div style="padding: 28px 24px;">
        <h2 style="color: #0d4f4f; font-size: 22px; margin: 0 0 12px; line-height: 1.3;">${safeTitle}</h2>
        <p style="color: #607d8b; font-size: 13px; margin: 0 0 16px;">
          By ${safeAuthor} &bull; ${safeReadTime}
        </p>
        <p style="color: #37474f; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${safeExcerpt}</p>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${articleUrl}" style="display: inline-block; background: #0a7e7e; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: 600; font-size: 14px;">
            Read Full Story
          </a>
        </div>
      </div>

      <div style="background: #0d4f4f; padding: 20px 24px; text-align: center;">
        <p style="color: #b2dfdb; font-size: 12px; margin: 0;">
          You received this email because you subscribed to Doctors360 updates.
        </p>
        <p style="color: #80cbc4; font-size: 11px; margin: 8px 0 0;">
          <a href="${unsubscribeUrl}" style="color: #b2dfdb; text-decoration: underline;">Unsubscribe</a>
          &nbsp;&bull;&nbsp; &copy; ${year} Doctors360
        </p>
      </div>
    </div>
  `;
}

function buildNewsletterText(article, siteUrl, unsubscribeToken) {
  const articleUrl = `${siteUrl}/news/${article.slug}`;
  const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${unsubscribeToken}`;

  return `
NEW FROM DOCTORS360: ${article.title}

${article.category} | ${article.date}
By ${article.author} | ${article.read_time}

${article.excerpt}

Read the full story: ${articleUrl}

---
You received this because you subscribed to Doctors360 updates.
Unsubscribe: ${unsubscribeUrl}
  `.trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleId } = req.body;

  if (!articleId) {
    return res.status(400).json({ error: 'Missing articleId' });
  }

  const siteUrl = (getEnv('SITE_URL', 'http://localhost:5173')).replace(/\/$/, '');

  try {
    const supabase = getSupabaseAdmin();

    const { data: article, error: articleError } = await supabase
      .from('news_blogs')
      .select('id, slug, title, excerpt, category, author, date, read_time, image_url, is_visible')
      .eq('id', articleId)
      .single();

    if (articleError || !article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.is_visible === false) {
      return res.status(400).json({ error: 'Cannot send newsletter for a hidden article' });
    }

    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email, unsubscribe_token')
      .eq('unsubscribed', false);

    if (subscribersError) {
      return res.status(500).json({ error: 'Failed to fetch subscribers', details: subscribersError.message });
    }

    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ success: true, sent: 0, failed: 0, total: 0, message: 'No active subscribers' });
    }

    const [imageAttachment, logoAttachment] = await Promise.all([
      fetchImageAttachment(article.image_url, 'article-image'),
      fetchImageAttachment('/doctors360logo1nobg.png', 'logo-image'),
    ]);

    const attachments = [imageAttachment, logoAttachment].filter(Boolean);

    const transporter = createTransporter();
    const fromAddress = `"${getEnv('SMTP_NAME', 'Doctors360')}" <${getEnv('SMTP_EMAIL') || getEnv('SMTP_USERNAME')}>`;
    const subject = `New from Doctors360: ${article.title}`;

    let sent = 0;
    let failed = 0;

    const results = await Promise.allSettled(
      subscribers.map((subscriber) =>
        transporter.sendMail({
          from: fromAddress,
          to: subscriber.email,
          subject,
          text: buildNewsletterText(article, siteUrl, subscriber.unsubscribe_token),
          html: buildNewsletterHtml(article, siteUrl, subscriber.unsubscribe_token, !!imageAttachment, !!logoAttachment),
          attachments,
          list: {
            unsubscribe: { url: `${siteUrl}/unsubscribe?token=${encodeURIComponent(subscriber.unsubscribe_token)}` },
          },
        })
      )
    );

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        sent += 1;
      } else {
        failed += 1;
        console.error(`Failed to send to ${subscribers[index].email}:`, result.reason);
      }
    });

    return res.status(200).json({
      success: true,
      sent,
      failed,
      total: subscribers.length,
      message: `Newsletter sent to ${sent} of ${subscribers.length} subscribers`,
    });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return res.status(500).json({
      error: 'Failed to send newsletter',
      details: error.message,
    });
  }
}
