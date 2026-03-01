import { NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

async function sendTelegramNotification(data: any, originalUrl: string, password: string, ip: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken ||!chatId) return;

  const fileExt = data.name.split('.').pop()?.toUpperCase() |

| 'UNKNOWN';
  const targetLink = data.fast_download |

| data.slow_download |
| originalUrl;

  const message = `📥 <b>TeraX Success</b>\n📄 <a href="${targetLink}">${data.name}</a>\n📁 Jenis file: ${fileExt}\n🔗 Link terabox: ${originalUrl}\n🔑 Pass: ${password |

| '-'}\n🌐 IP: ${ip}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
    });
  } catch (error) {
    console.error("Gagal mengirim notifikasi Telegram");
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") |

| "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ error: 'Terlalu banyak permintaan. Silakan tunggu 1 menit.' }, { status: 429 });
    }

    const { url, password } = await req.json();
    if (!url ||!url.includes('terabox')) {
      return NextResponse.json({ error: 'Harap masukkan URL TeraBox yang valid.' }, { status: 400 });
    }

    const payload: any = { url };
    if (password && password.trim()!== '') payload.password = password.trim(); 

    const xapiResponse = await fetch('https://xapiverse.com/apis/terabox-pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TERABOX_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!xapiResponse.ok) throw new Error('Gagal menghubungi peladen hulu.');
    
    const textReport = await xapiResponse.text();
    const nameMatch = textReport.match(/Name:\s*(.+)/);
    const sizeMatch = textReport.match(/Size:\s*([^|]+)/);
    const fastDlMatch = textReport.match(/Fast Download\]\((https?:\/\/[^\)]+)\)/);
    const slowDlMatch = textReport.match(/Slow Download\]\((https?:\/\/[^\)]+)\)/);
    const creditsMatch = textReport.match(/Credits Remaining:\s*(\d+)/);

    const data = {
      name: nameMatch? nameMatch.[1]trim() : 'Berkas_TeraBox',
      size: sizeMatch? sizeMatch.[1]trim() : 'Unknown Size',
      fast_download: fastDlMatch? fastDlMatch.[1]trim() : null,
      slow_download: slowDlMatch? slowDlMatch.[1]trim() : null,
      credits_remaining: creditsMatch? parseInt(creditsMatch[1]) : 0,
    };

    sendTelegramNotification(data, url, password, ip);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
