import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const AUDIENCE_NAME = 'Portfolio Subscribers'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
    }

    if (!resend) {
      return NextResponse.json({ success: true, demo: true })
    }

    const list = await resend.audiences.list()
    let segmentId = list.data?.data?.find((a) => a.name === AUDIENCE_NAME)?.id

    if (!segmentId) {
      const created = await resend.audiences.create({ name: AUDIENCE_NAME })
      segmentId = created.data?.id
    }

    if (!segmentId) {
      return NextResponse.json({ error: 'Failed to prepare audience' }, { status: 500 })
    }

    await resend.contacts.create({ email, segments: [{ id: segmentId }] })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}