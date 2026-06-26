import { NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '../../../../lib/db';
import { checkAdminAuth } from '../../../../lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const body = await request.json();
    const { status } = body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed', 'Archived'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, message: 'Status updated successfully' });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error in PATCH /api/leads/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deleted = await deleteLead(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error in DELETE /api/leads/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
