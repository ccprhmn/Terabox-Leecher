import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) return new NextResponse('URL Parameter tidak valid', { status: 400 });
  return NextResponse.redirect(targetUrl, 302);
}
