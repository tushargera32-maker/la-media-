import { Resend } from 'resend';

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'lamediacommunications@gmail.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'lamediacommunications@gmail.com';

// Send email to admin when new registration received
export async function sendAdminNotification(data: {
  type: 'registration' | 'contact' | 'newsletter' | 'architect' | 'sponsor';
  name?: string;
  email: string;
  details: string;
}) {
  try {
    const subject = `New ${data.type.charAt(0).toUpperCase() + data.type.slice(1)} - LA Media`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1f2e; color: #d4a574; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .detail { margin: 10px 0; padding: 10px; background: white; border-left: 3px solid #d4a574; }
            .label { font-weight: bold; color: #1a1f2e; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New ${data.type.toUpperCase()}</h1>
            </div>
            <div class="content">
              <h2>New Submission Received</h2>
              ${data.name ? `<div class="detail"><span class="label">Name:</span> ${data.name}</div>` : ''}
              <div class="detail"><span class="label">Email:</span> ${data.email}</div>
              <div class="detail"><span class="label">Details:</span><br/>${data.details}</div>
              <p style="margin-top: 30px;">
                <a href="http://localhost:3000/admin/dashboard"
                   style="background: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </p>
            </div>
            <div class="footer">
              LA Media & Communications | Design Dialect 2.0
            </div>
          </div>
        </body>
      </html>
    `;

    const client = getResend();
    if (!client) {
      console.warn('RESEND_API_KEY missing, skipping admin notification email');
      return { success: true };
    }
    await client.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

// Send confirmation email to user after registration
export async function sendUserConfirmation(data: {
  name: string;
  email: string;
  type: 'registration' | 'architect' | 'sponsor';
  details?: string;
}) {
  const COPY: Record<string, { subject: string; heading: string; intro: string; showEventBox: boolean; closing: string }> = {
    registration: {
      subject: 'Registration Confirmed - Design Dialect 2.0',
      heading: 'Registration Confirmed!',
      intro: 'Thank you for registering for <strong>Design Dialect 2.0</strong>.',
      showEventBox: true,
      closing: 'Looking forward to seeing you there!',
    },
    architect: {
      subject: 'Registration Confirmed - Design Dialect 2.0',
      heading: 'Registration Confirmed!',
      intro: 'Thank you for registering as an architect for <strong>Design Dialect 2.0</strong>.',
      showEventBox: true,
      closing: 'Looking forward to seeing you there!',
    },
    sponsor: {
      subject: 'Stall Booking Received - Design Dialect 2.0',
      heading: 'Your stall is reserved!',
      intro: 'Thank you for booking a stall at <strong>Design Dialect 2.0</strong>. Our team will reach out within 24 hours with payment details and setup information.',
      showEventBox: false,
      closing: 'Looking forward to exhibiting with you!',
    },
  };
  const copy = COPY[data.type] ?? COPY.registration;
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1f2e; color: #d4a574; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .checkmark { font-size: 48px; color: #4caf50; text-align: center; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { background: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>LA Media & Communications</h1>
              <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Design Dialect 2.0</p>
            </div>
            <div class="content">
              <div class="checkmark">✓</div>
              <h2 style="text-align: center; color: #1a1f2e;">${copy.heading}</h2>
              <p>Dear ${data.name},</p>
              <p>${copy.intro}</p>
              <p>We've received your details and you're now on the list. Here are the event details:</p>
              ${copy.showEventBox ? `
              <div style="background: white; padding: 20px; margin: 20px 0; border-left: 3px solid #d4a574;">
                <p style="margin: 5px 0;"><strong>Event:</strong> Design Dialect 2.0</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> February 6-7, 2027</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> Ludhiana, Punjab</p>
                <p style="margin: 5px 0;"><strong>Venue:</strong> To be announced</p>
              </div>
              ` : ''}
              ${data.details ? `
              <div style="background: white; padding: 20px; margin: 20px 0; border-left: 3px solid #d4a574;">
                <p style="margin: 5px 0;"><strong>Your booking:</strong></p>
                <p style="margin: 5px 0;">${data.details}</p>
              </div>
              ` : ''}
              <p>We'll send you more details closer to the event date.</p>
              <p>In the meantime, feel free to reach out if you have any questions.</p>
              <p style="text-align: center;">
                <a href="http://localhost:3000" class="button">Visit Our Website</a>
              </p>
              <p style="margin-top: 30px;">${copy.closing}</p>
              <p><strong>Team LA Media</strong></p>
            </div>
            <div class="footer">
              <p>LA Media & Communications</p>
              <p>12 A, Basant City, Sua Road, Ludhiana, Punjab – 142022</p>
              <p>+91 98151 00385 | lamediacommunications@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const client = getResend();
    if (!client) {
      console.warn('RESEND_API_KEY missing, skipping user confirmation email');
      return { success: true };
    }
    await client.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: copy.subject,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending user confirmation:', error);
    return { success: false, error };
  }
}

// Send welcome email for newsletter subscription
export async function sendNewsletterWelcome(email: string) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1f2e; color: #d4a574; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to LA Media Newsletter!</h1>
            </div>
            <div class="content">
              <h2>Thanks for subscribing! 🎉</h2>
              <p>You're now part of our community and will receive:</p>
              <ul style="margin: 20px 0;">
                <li>Latest updates about Design Dialect events</li>
                <li>Insights on architecture and design trends</li>
                <li>Exclusive content from industry leaders</li>
                <li>Early bird registration opportunities</li>
              </ul>
              <p>Stay tuned for our next newsletter!</p>
            </div>
            <div class="footer">
              LA Media & Communications | Design Dialect 2.0
            </div>
          </div>
        </body>
      </html>
    `;

    const client = getResend();
    if (!client) {
      console.warn('RESEND_API_KEY missing, skipping newsletter welcome email');
      return { success: true };
    }
    await client.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to LA Media Newsletter!',
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending newsletter welcome:', error);
    return { success: false, error };
  }
}
