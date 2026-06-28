import { client } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { FaCalendarAlt, FaClock, FaArrowLeft, FaTag } from 'react-icons/fa'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReadingProgress from '@/app/components/ReadingProgress'
import ShareButtons from '@/app/components/ShareButtons'
import TableOfContents from '@/app/components/TableOfContents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] { title, excerpt }`,
    { slug }
  )
  if (!blog) return { title: 'Blog not found' }
  return {
    title: `${blog.title} | Hollali`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      images: [{ url: `/api/og?title=${encodeURIComponent(blog.title)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [`/api/og?title=${encodeURIComponent(blog.title)}`],
    },
  }
}

function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractHeadingText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractHeadingText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractHeadingText((children as { props: { children: ReactNode } }).props.children)
  }
  return ''
}

const components = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => <p className="text-xs text-[#e0e0e0] leading-relaxed mb-4">{children}</p>,
    h1: ({ children }: { children?: ReactNode }) => {
      const id = headingId(extractHeadingText(children))
      return <h1 id={id} className="text-lg font-mono text-[#e0e0e0] mt-6 mb-3" style={{ color: 'var(--terminal-accent)' }}>{children}</h1>
    },
    h2: ({ children }: { children?: ReactNode }) => {
      const id = headingId(extractHeadingText(children))
      return <h2 id={id} className="text-base font-mono text-[#e0e0e0] mt-5 mb-2" style={{ color: 'var(--terminal-accent)' }}>{children}</h2>
    },
    h3: ({ children }: { children?: ReactNode }) => {
      const id = headingId(extractHeadingText(children))
      return <h3 id={id} className="text-sm font-mono text-[#e0e0e0] mt-4 mb-2" style={{ color: 'var(--terminal-accent)' }}>{children}</h3>
    },
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-2 px-4 py-2 my-4 text-xs text-[#666] italic" style={{ borderColor: 'var(--terminal-accent)' }}>
        {children}
      </blockquote>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="text-xs bg-[#1a1a1a] px-1.5 py-0.5 rounded" style={{ color: 'var(--terminal-accent)' }}>
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => <ul className="list-disc list-inside space-y-1 text-xs text-[#e0e0e0] mb-4">{children}</ul>,
    number: ({ children }: { children?: ReactNode }) => <ol className="list-decimal list-inside space-y-1 text-xs text-[#e0e0e0] mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => <li className="text-xs text-[#e0e0e0]">{children}</li>,
    number: ({ children }: { children?: ReactNode }) => <li className="text-xs text-[#e0e0e0]">{children}</li>,
  },
  marks: {
    link: ({ children, value }: { children?: ReactNode; value?: { href?: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="terminal-link text-xs">{children}</a>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="text-xs bg-[#1a1a1a] px-1.5 py-0.5" style={{ color: 'var(--terminal-accent)' }}>{children}</code>
    ),
    strong: ({ children }: { children?: ReactNode }) => <strong className="text-[#e0e0e0] font-bold">{children}</strong>,
    em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }: { value: { alt?: string } }) => {
      const src = urlFor(value).width(800).url()
      return (
        <div className="relative my-4 border border-[#2a2a2a] overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image src={src} alt={value?.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" unoptimized />
        </div>
      )
    },
  },
  hardBreak: () => <br />,
}

const tagColors: Record<string, string> = {
  'JavaScript': '#f7df1e',
  'TypeScript': '#3178c6',
  'React': '#61dafb',
  'Next.js': '#fff',
  'Node.js': '#339933',
  'Python': '#3776ab',
  'CSS': '#1572b6',
  'HTML': '#e34f26',
  'Docker': '#2496ed',
  'Git': '#f05032',
  'Tutorial': '#a855f7',
  'Guide': '#06b6d4',
  'DevOps': '#ff9900',
  'Performance': '#ef4444',
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const blog = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      title, excerpt, date, readTime, tags, "slug": slug.current, content
    }`,
    { slug }
  )

  if (!blog) notFound()

  const relatedPosts = blog.tags && blog.tags.length > 0
    ? await client.fetch(
        `*[_type == "blog" && slug.current != $slug && count(tags[@ in $tags]) > 0] | order(date desc) [0...3] {
          title, excerpt, date, readTime, tags, "slug": slug.current
        }`,
        { slug, tags: blog.tags }
      )
    : []

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hollali-portfolio.netlify.app'
  const postUrl = `${baseUrl}/blogs/${slug}`

  return (
    <>
      <ReadingProgress />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-xs text-[#666] mb-6">
          <Link href="/blogs" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--terminal-accent)' }}>
            <FaArrowLeft className="inline h-3 w-3 mr-1" />
            $ cd ../blogs
          </Link>
          <hr className="terminal-separator my-3" />
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              {blog.content && blog.content.length > 0 && (
                <TableOfContents content={blog.content as Record<string, unknown>[]} />
              )}
            </div>
          </aside>

          <article className="flex-1 min-w-0">
            <div className="terminal-card">
              <div className="text-xs text-[#666] mb-2 font-mono">
                <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ cat blogs/{blog.slug}.md
              </div>

              <h1 className="text-xl md:text-2xl font-mono text-[#e0e0e0] mb-3">{blog.title}</h1>

              <div className="flex items-center gap-4 text-[10px] text-[#555] mb-4 pb-4 border-b border-[#2a2a2a]">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="h-3 w-3" />
                  {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="h-3 w-3" />
                  {blog.readTime} min read
                </span>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-[#2a2a2a]">
                  {blog.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className="terminal-tag text-[10px] flex items-center gap-1"
                      style={{
                        borderColor: tagColors[tag] || '#666',
                        color: tagColors[tag] || '#666',
                      }}
                    >
                      <FaTag className="h-2 w-2" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {blog.content && blog.content.length > 0 ? (
                <div className="text-xs text-[#e0e0e0] leading-relaxed space-y-4">
                  <PortableText value={blog.content} components={components} />
                </div>
              ) : (
                <p className="text-xs text-[#666] italic">No content</p>
              )}

              <hr className="terminal-separator my-6" />
              <div className="text-[10px] text-[#555] text-center font-mono">--- EOF ---</div>
            </div>

            <ShareButtons title={blog.title} url={postUrl} />

            {relatedPosts.length > 0 && (
              <div className="terminal-card p-4 mt-6">
                <div className="text-[10px] text-[#555] font-mono mb-3">
                  <span style={{ color: 'var(--terminal-accent)' }}>$</span> ls -la related/
                </div>
                <div className="space-y-2">
                  {relatedPosts.map((rp: { slug: string; title: string; date: string; readTime: string; tags?: string[] }) => (
                    <Link
                      key={rp.slug}
                      href={`/blogs/${rp.slug}`}
                      className="block p-2 border border-[#2a2a2a] hover:border-opacity-60 transition-colors"
                    >
                      <div className="text-xs text-[#e0e0e0] font-mono">{rp.title}</div>
                      <div className="flex items-center gap-2 text-[10px] text-[#555] mt-1">
                        <span>{new Date(rp.date).toLocaleDateString()}</span>
                        <span>{rp.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
