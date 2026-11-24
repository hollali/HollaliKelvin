# 🚀 Hollali Portfolio

A modern, responsive portfolio website built with Next.js, showcasing projects, skills, and blogs with stunning animations and a sleek design.

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Latest-FF0055?style=flat-square&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🎨 **Design & UI**

- **Fully Responsive** - Seamlessly adapts to all screen sizes
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Modern Design** - Clean, minimalist interface with attention to detail
- **Accessibility First** - WCAG compliant with keyboard navigation support

### ⚡ **Performance & Tech**

- **Next.js 13+** - Latest features with App Router
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth, performant animations
- **Sanity CMS** - Projects and blogs managed in Sanity, with 60-second ISR and webhook-triggered revalidation
- **SEO Optimized** - Meta tags, structured data, and sitemap generation

### 🔧 **Developer Experience**

- **Component-Based** - Modular and reusable architecture
- **Easy Customization** - Well-documented configuration options
- **Hot Reload** - Instant development feedback
- **Type Safety** - Full TypeScript integration

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hollali/HollaliKelvin.git
   cd HollaliKelvin
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio in action! 🎉

---

## 📁 Project Structure

```
hollalikelvin/
├── src/
│   ├── app/             # App Router pages, layouts, and API routes
│   │   ├── api/         # Contact, newsletter, Sanity data, revalidation
│   │   └── components/  # Shared UI components
│   ├── contents/        # Client-side data helpers (call the API routes)
│   ├── lib/             # Image URL and small helpers
│   ├── sanity/          # Sanity client, GROQ queries, and schemas
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── sanity.config.ts     # Studio configuration (/studio basePath)
└── netlify.toml         # Netlify build command and cache headers
```

---

## 🎭 Animations

Hollali leverages **Framer Motion** for smooth, engaging animations:

### Available Animation Types

- **Page Transitions** - Smooth navigation between pages
- **Scroll Animations** - Elements animate as they enter viewport
- **Hover Effects** - Interactive micro-animations
- **Loading States** - Skeleton loaders and spinners
- **Gesture Recognition** - Swipe and drag interactions

### Example Animation Usage

```tsx
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

<motion.div variants={fadeInUp}>
  Your content here
</motion.div>
```

---

## 🧩 Key Components

### Core Components

- **`Header`** - Navigation with theme toggle
- **`Hero`** - Landing section with animated introduction
- **`About`** - Personal information and skills showcase
- **`Projects`** - Portfolio projects with filtering
- **`Blog`** - Article listings and individual post pages
- **`Contact`** - Contact form with validation
- **`Footer`** - Social links and additional navigation

### UI Components

- **`Button`** - Customizable button variations
- **`Card`** - Flexible content containers
- **`Modal`** - Overlay dialogs and popups
- **`Form`** - Input fields with validation
- **`ThemeToggle`** - Dark/light mode switcher

---

## 🔧 Configuration

### Customizing Content

Projects and blog posts are Sanity documents, not local files. Add or edit them in Sanity Studio and publish; the document schemas live in `src/sanity/schemas/`. Published content appears within 60 seconds (or instantly when the webhook below is configured).

Projects are fetched via `fetchProjects()` in `src/sanity/data.ts` and exposed to client components through `/api/sanity/projects`. Blogs use `/api/sanity/blogs`.

### Sanity Webhook (instant updates)

Create a webhook in Sanity (**API → Webhooks**) that fires on create, update, and delete of `project` and `blog` documents:

- **URL**: `https://<your-domain>/api/revalidate`
- **HTTP headers**: `x-webhook-secret: <SANITY_REVALIDATE_SECRET>`

The endpoint calls `revalidatePath('/', 'layout')`, so the next request serves fresh content. Requests without a matching secret are rejected with `401`.

### Styling

- **Colors** - Tailwind v4 theme variables live in `src/app/globals.css`
- **Fonts** - Update font imports in `src/app/globals.css`
- **Components** - Customize in `src/app/components/`

### SEO & Meta

Page metadata is defined with Next.js `metadata` exports in `src/app/layout.tsx` and each page. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, the sitemap, and the RSS feed.

---

## 🔌 API Routes

| Route                    | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `/api/sanity/projects`   | Published Sanity projects (`?featured=true` supported) |
| `/api/sanity/blogs`      | Published Sanity blogs (`?slug` / `?tag` supported) |
| `/api/revalidate`        | Webhook endpoint for on-demand revalidation  |
| `/api/contact`           | Contact form delivery via Resend             |
| `/api/newsletter`        | Newsletter signup                            |

Sanity API routes send `Cache-Control: no-store`, so client-side refreshes always see published changes.

---

## 📦 Available Scripts

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run dev`        | Start development server  |
| `npm run build`      | Build for production      |
| `npm start`          | Start production server   |
| `npm run lint`       | Run ESLint                |
| `npm run type-check` | Run TypeScript checks     |
| `npm test`           | Run Playwright smoke tests |

---

## 🌐 Deployment

### Netlify (this project)

Pushes to `main` trigger a Netlify production build through the Netlify API in `.github/workflows/deploy.yml`. Netlify runs `npm run build` from `netlify.toml` with its Next.js runtime, which is required for API routes, ISR, and webhook revalidation. Do **not** upload `.next/` as a static publish directory — that breaks those features.

One-time setup:

1. Connect the GitHub repository to the Netlify site so API-triggered builds have a Git source.
2. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as GitHub repository secrets.
3. Set these environment variables in Netlify (**Site configuration → Environment variables**):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SITE_URL`
   - `SANITY_REVALIDATE_SECRET` (must match the Sanity webhook header)
   - `RESEND_API_KEY` and `CONTACT_EMAIL` (optional, for the contact form)

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure the same environment variables
4. Add the Sanity webhook pointing to `https://<your-domain>/api/revalidate`

---

## 🎨 Customization Guide

### Adding New Sections

1. Create component in `src/app/components/`
2. Add it to the relevant page under `src/app/`
3. Configure routing if needed
4. Add animations and styling

### Theme Customization

```css
/* src/app/globals.css */
:root {
  --terminal-accent: #00ff41;
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support & Contact

- **GitHub Issues** - [Report bugs or request features](https://github.com/hollali/hollali.dev/issues)
- **Email** - [dheztinykartel@gmail.com](mailto:dheztinykartel@gmail.com)
- **Website** - [https://hollali.dev](https://hollali.dev)
- **Twitter** - [@hollali](https://twitter.com/h_ollali)

---

## 🌟 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Vercel** - For seamless deployment platform

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by [Hollali](https://github.com/hollali)

</div>
