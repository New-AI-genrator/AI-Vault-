import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    
    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // In a real app, you would save this to your database
    // For now, we'll just log it and send a welcome email
    console.log('New newsletter subscriber:', { email, name });
    
    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: 'AI Tools Directory <newsletter@aitools.directory>',
      to: email,
      subject: 'Welcome to AI Tools Directory Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to AI Tools Directory!</h1>
          <p>Hello${name ? ` ${name}` : ''},</p>
          <p>Thank you for subscribing to our newsletter. You'll now receive the latest updates on AI tools, industry news, and exclusive content.</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Weekly roundup of new AI tools</li>
            <li>In-depth tool reviews and comparisons</li>
            <li>Exclusive discounts and early access</li>
            <li>AI industry insights and trends</li>
          </ul>
          <p>If you have any questions or suggestions, feel free to reply to this email.</p>
          <p>Best regards,<br>The AI Tools Directory Team</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="font-size: 12px; color: #6B7280;">
            You received this email because you subscribed to our newsletter. 
            If you wish to unsubscribe, <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #4F46E5;">click here</a>.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for subscribing! Please check your email to confirm your subscription.'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
