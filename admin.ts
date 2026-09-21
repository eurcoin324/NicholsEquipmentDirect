import { cookies } from 'next/headers';
import { createHmac } from 'crypto';
export async function requireAdmin(){
 const c=await cookies(); const token=c.get('admin_session')?.value; const email=process.env.ADMIN_EMAIL||'';
 const expected=createHmac('sha256',process.env.ADMIN_COOKIE_SECRET||'dev-secret').update(email).digest('hex');
 if(!token || token!==expected) throw new Error('UNAUTHORIZED');
}