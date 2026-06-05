import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }

    // Configure the transporter
    // SMTP credentials are read from environment variables.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587 or other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Send as authenticated SMTP user
      replyTo: email, // Reply to the sender's actual email
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="border-bottom: 2px solid #5a5a5a; padding-bottom: 10px; color: #111;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #5a5a5a; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 0.8em; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            This email was sent dynamically from your cinematic portfolio contact form.
          </footer>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('SMTP Email Send Error:', error);
    return NextResponse.json(
      { error: 'Failed to transmit message via SMTP. Please try again later.' },
      { status: 500 }
    );
  }
}
