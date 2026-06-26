import { NextResponse } from 'next/server';
import { createLead, getLeads } from '../../../lib/db';
import { sendLeadNotification } from '../../../lib/mail';
import { checkAdminAuth } from '../../../lib/auth';

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error('API Error in GET /api/leads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, location, product, details } = body;

    if (!name || !phone || !location || !product) {
      return NextResponse.json(
        { error: 'Missing required fields. Name, phone, location, and product are required.' },
        { status: 400 }
      );
    }

    const savedLead = await createLead({
      name,
      phone,
      location,
      product,
      details: details || '',
    });

    try {
      await sendLeadNotification(savedLead);
    } catch (mailError) {
      console.error('Failed to send email notification:', mailError);
    }

    return NextResponse.json(savedLead, { status: 201 });
  } catch (error) {
    console.error('API Error in POST /api/leads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
