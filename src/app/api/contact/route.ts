import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const ipHits = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const hit = ipHits.get(ip)
  if (!hit || hit.resetAt <= now) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  hit.count += 1
  return hit.count > MAX_PER_WINDOW
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: 'Too many messages — try again later.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if ((body as { company?: string }).company) {
    return NextResponse.json({ success: true })
  }

  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Name must be between 2 and 80 characters' }, { status: 400 })
  }
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Message must be between 10 and 5000 characters' }, { status: 400 })
  }
  if (subject && (typeof subject !== 'string' || subject.length > 200)) {
    return NextResponse.json({ error: 'Subject too long' }, { status: 400 })
  }

  if (!resend) {
    return NextResponse.json({ success: true, demo: true })
  }

  const clean = {
    name: name.trim(),
    email: email.trim(),
    subject: typeof subject === 'string' ? subject.trim() : '',
    message: message.trim(),
  }

  try {
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'dheztinykartel@gmail.com',
      replyTo: clean.email,
      subject: clean.subject ? `${clean.subject} — ${clean.name}` : `Portfolio Contact from ${clean.name}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}${clean.subject ? `\nSubject: ${clean.subject}` : ''}\n\nMessage:\n${clean.message}`,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact send failed:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}