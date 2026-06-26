import { cookies } from 'next/headers';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-12345';
const COOKIE_NAME = 'yuval_admin_session';

export function signToken(value: string): string {
  const hmac = crypto.createHmac('sha256', JWT_SECRET);
  hmac.update(value);
  const signature = hmac.digest('hex');
  return `${value}.${signature}`;
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [value, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(value)
    .digest('hex');
    
  if (signature !== expectedSignature) return false;
  
  const timestamp = parseInt(value, 10);
  if (isNaN(timestamp)) return false;
  
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return now - timestamp < sevenDaysMs;
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const timestamp = Date.now().toString();
  const token = signToken(timestamp);
  
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}
