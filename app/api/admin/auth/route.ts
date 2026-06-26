import { NextResponse } from 'next/server';
import { checkAdminAuth, setAdminSession, clearAdminSession } from '../../../../lib/auth';

export async function GET() {
  try {
    const isAuthenticated = await checkAdminAuth();
    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json({ authenticated: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const expectedPasscode = process.env.ADMIN_PASSCODE || 'Yuval2026';

    if (passcode === expectedPasscode) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid passcode' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error during admin auth:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
