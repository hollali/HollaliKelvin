import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'hollali@portfolio:~$'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontFamily: '"Geist Mono", monospace',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#eab308' }} />
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div
            style={{
              marginLeft: '24px',
              fontSize: 20,
              color: '#666',
              letterSpacing: '0.1em',
            }}
          >
            hollali@portfolio:~$
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            color: '#22c55e',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '90%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: '40px',
            fontSize: 20,
            color: '#555',
            display: 'flex',
            gap: '32px',
          }}
        >
          <span>ls -la ./</span>
          <span>cat about.md</span>
          <span>./contact</span>
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 16,
            color: '#333',
          }}
        >
          Hollali &copy; {new Date().getFullYear()}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
