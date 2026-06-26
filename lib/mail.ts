import nodemailer from 'nodemailer';

interface MailData {
  name: string;
  phone: string;
  location: string;
  product: string;
  details: string;
}

export async function sendLeadNotification(lead: MailData): Promise<boolean> {
  const { name, phone, location, product, details } = lead;
  
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'info@yuvalenterprise.com';
  
  const mailSubject = `New Lead Inquiry Received: ${name} (${product})`;
  
  const mailHtml = `
    <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333; border-bottom: 2px solid #C5A880; padding-bottom: 10px;">New Inquiry Received - Yuval Enterprise</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Name:</td>
          <td style="padding: 8px 0; color: #333;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td>
          <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Location:</td>
          <td style="padding: 8px 0; color: #333;">${location}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Product Interested:</td>
          <td style="padding: 8px 0; color: #333; font-weight: bold;">${product}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Project Details:</td>
          <td style="padding: 8px 0; color: #333; white-space: pre-line;">${details || 'No additional details provided.'}</td>
        </tr>
      </table>
      <div style="margin-top: 25px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
        This inquiry was captured on the Yuval Enterprise website and saved to the admin database.
        <br />
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/secure-admin" style="color: #C5A880; text-decoration: none; font-weight: bold;">View in Admin Dashboard</a>
      </div>
    </div>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Yuval Enterprise Website" <${smtpUser}>`,
        to: recipientEmail,
        subject: mailSubject,
        html: mailHtml,
      });

      console.log(`Email notification sent successfully to ${recipientEmail}`);
      return true;
    } catch (error) {
      console.error('Failed to send email via SMTP:', error);
    }
  }

  // Fallback: styled console logging during development
  console.log('\n==================================================');
  console.log('📬  [DEVELOPMENT FALLBACK] LEAD EMAIL NOTIFICATION');
  console.log('--------------------------------------------------');
  console.log(`To:      ${recipientEmail}`);
  console.log(`Subject: ${mailSubject}`);
  console.log('--------------------------------------------------');
  console.log(`Name:    ${name}`);
  console.log(`Phone:   ${phone}`);
  console.log(`Location: ${location}`);
  console.log(`Product: ${product}`);
  console.log(`Details: ${details || 'None'}`);
  console.log('==================================================\n');
  
  return false;
}
