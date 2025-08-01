"use server";
import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = 'joeysalakha81@gmail.com';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name, email, message} = body;

    if (!name || !email || !message) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Verdant Scribe Contact Form <onboarding@resend.dev>',
      to: [toEmail],
      subject: `New Message from ${name} via Verdant Scribe`,
      reply_to: email,
      react: ContactFormEmail({ name, email, message }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
    }

    return NextResponse.json({message: 'Form submitted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({message: 'Error submitting form'}, {status: 500});
  }
}