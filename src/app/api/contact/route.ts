import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // In a real application, you would handle the form data here,
    // for example, by sending an email.
    console.log('Contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // For now, we'll just return a success response.
    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
  }
}
