import nodemailer from 'nodemailer';

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: parseInt(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@greenfco.com';
const BASE_URL = process.env.APP_URL || 'https://greenfco.com';

export async function sendPasswordResetEmail(email, token, type = 'user') {
  const path   = type === 'admin' ? '/admin/reset-password' : '/reset-password';
  const link   = `${BASE_URL}${path}?token=${token}`;
  const fr = {
    subject: 'Réinitialisation de votre mot de passe GreenFCO',
    body: `
      <p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe GreenFCO.</p>
      <p><a href="${link}" style="background:#1B4332;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;margin:16px 0">Réinitialiser mon mot de passe</a></p>
      <p>Ce lien expire dans <strong>1 heure</strong>.</p>
      <p>Si vous n'avez pas fait cette demande, ignorez cet e-mail.</p>
      <hr/>
      <p style="color:#666;font-size:12px">GreenFCO — Cultiver un avenir durable, ensemble.</p>
    `,
  };

  const transporter = getTransporter();

  if (!transporter) {
    // No email configured — log the link so admin can share it manually
    console.log(`[Email] No SMTP configured. Password reset link for ${email}:\n  ${link}`);
    return { sent: false, link };
  }

  await transporter.sendMail({
    from: `"GreenFCO" <${FROM}>`,
    to: email,
    subject: fr.subject,
    html: fr.body,
  });

  return { sent: true };
}
