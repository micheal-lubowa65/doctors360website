import nodemailer from 'nodemailer';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, services, date, message } = req.body;

  if (!name || !email || !phone || !services || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const recipient = process.env.SMTP_RECIPIENT || 'info@doctors360.org';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: (process.env.SMTP_PROTOCOL || 'SSL').toUpperCase() === 'SSL',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message);
  const servicesList = Array.isArray(services) ? services : [services];
  const servicesFormatted = servicesList.map(s => escapeHtml(s)).join(', ');

  const servicesHtml = servicesList
    .map(s => `<span style="display: inline-block; background: #e0f7f4; color: #0d4f4f; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; margin: 2px 4px 2px 0;">${escapeHtml(s)}</span>`)
    .join('');

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e0f2f1;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0d4f4f 0%, #0a7e7e 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
          &#128203; New Appointment Request
        </h1>
        <p style="color: #b2dfdb; margin: 8px 0 0; font-size: 14px;">
          Submitted on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 28px 24px;">

        <!-- Patient Details Card -->
        <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e0f2f1;">
          <h2 style="color: #0d4f4f; font-size: 16px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #b2dfdb;">
            &#128100; Patient Information
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #607d8b; font-size: 13px; width: 120px; vertical-align: top;">Full Name</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #607d8b; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">
                <a href="mailto:${safeEmail}" style="color: #0a7e7e; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #607d8b; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">
                <a href="tel:${safePhone}" style="color: #0a7e7e; text-decoration: none;">${safePhone}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Appointment Details Card -->
        <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e0f2f1;">
          <h2 style="color: #0d4f4f; font-size: 16px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #b2dfdb;">
            &#128197; Appointment Details
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #607d8b; font-size: 13px; width: 120px; vertical-align: top;">Preferred Date</td>
              <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">
                ${new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #607d8b; font-size: 13px; vertical-align: top;">Services</td>
              <td style="padding: 8px 0;">
                ${servicesHtml}
              </td>
            </tr>
          </table>
        </div>

        ${safeMessage ? `
        <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e0f2f1;">
          <h2 style="color: #0d4f4f; font-size: 16px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 2px solid #b2dfdb;">
            &#128172; Patient Message
          </h2>
          <p style="color: #37474f; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        ` : ''}

        <!-- Action Note -->
        <div style="background: #fff8e1; border-radius: 12px; padding: 16px 20px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #795548; font-size: 13px; line-height: 1.5;">
            &#9889; <strong>Action Required:</strong> Please confirm this appointment within 2 hours during business hours. 
            Reply to the patient at <a href="mailto:${safeEmail}" style="color: #0a7e7e;">${safeEmail}</a> or call <a href="tel:${safePhone}" style="color: #0a7e7e;">${safePhone}</a>.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #0d4f4f; padding: 20px 24px; text-align: center;">
        <p style="color: #b2dfdb; font-size: 12px; margin: 0;">
          This is an automated notification from <strong style="color: #ffffff;">Doctors360</strong> Appointment System
        </p>
        <p style="color: #80cbc4; font-size: 11px; margin: 6px 0 0;">
          &copy; ${new Date().getFullYear()} Doctors360 &mdash; Juba, South Sudan
        </p>
      </div>
    </div>
  `;

  const textContent = `
NEW APPOINTMENT REQUEST
=======================

Patient: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${date}
Services: ${servicesFormatted}
${message ? `Message: ${message}` : ''}

---
Please confirm this appointment within 2 hours during business hours.
Doctors360 Appointment System
  `.trim();

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_NAME || 'Doctors360'}" <${process.env.SMTP_EMAIL || process.env.SMTP_USERNAME}>`,
      to: recipient,
      replyTo: email,
      subject: `New Appointment Request — ${name} (${servicesFormatted})`,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Appointment email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
}
