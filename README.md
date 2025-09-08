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

- **Node.js** (v16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hollali/hollalkelvin.git
   cd hollali.dev
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
hollali.dev/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── sections/        # Page sections
│   └── layout/          # Layout components
├── pages/               # Next.js pages
├── public/              # Static assets
├── styles/              # Global styles and Tailwind config
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── content/             # Blog posts and project data
├── hooks/               # Custom React hooks
└── lib/                 # External library configurations
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

1. **Personal Information** - Edit `config/personal.ts`
2. **Projects** - Add to `content/projects/`
3. **Blog Posts** - Create MDX files in `content/blog/`
4. **Skills & Technologies** - Update `data/skills.ts`

### Styling

- **Colors** - Modify `tailwind.config.js` theme
- **Fonts** - Update font imports in `styles/globals.css`
- **Components** - Customize in respective component files

### SEO & Meta

```ts
// next-seo.config.js
export default {
  title: "Your Name - Portfolio",
  description: "Your portfolio description",
  canonical: "https://yourportfolio.dev",
  // ... more SEO configuration
};
```

---

## 📦 Available Scripts

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run dev`        | Start development server  |
| `npm run build`      | Build for production      |
| `npm start`          | Start production server   |
| `npm run lint`       | Run ESLint                |
| `npm run type-check` | Run TypeScript checks     |
| `npm run format`     | Format code with Prettier |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy! 🚀

### Other Platforms

- **Netlify** - Connect your GitHub repository
- **Railway** - Deploy with `railway up`
- **Docker** - Use the included `Dockerfile`

---

## 🎨 Customization Guide

### Adding New Sections

1. Create component in `components/sections/`
2. Add to page in `pages/` or `app/`
3. Configure routing if needed
4. Add animations and styling

### Theme Customization

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
};
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
- **Email** - [dheztinykartel@gmail.com.com](mailto:your.email@domain.com)
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
