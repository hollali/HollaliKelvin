export const techColors: Record<string, string> = {
  'React': '#61dafb',
  'Next.js': '#fff',
  'TypeScript': '#3178c6',
  'JavaScript': '#f7df1e',
  'Tailwind': '#06b6d4',
  'Node.js': '#339933',
  'Express': '#fff',
  'MongoDB': '#47a248',
  'PostgreSQL': '#336791',
  'Docker': '#2496ed',
  'AWS': '#ff9900',
  'Python': '#3776ab',
  'HTML': '#e34f26',
  'CSS': '#1572b6',
  'Git': '#f05032',
  'React Native': '#61dafb',
  'Flutter': '#02569B',
  'Dart': '#00B4AB',
  'Swift': '#F05138',
  'Kotlin': '#7F52FF',
  'Java': '#ED8B00',
  'Objective-C': '#438eff',
  'Xcode': '#147EFB',
  'Android': '#3DDC84',
  'iOS': '#000000',
}

const MOBILE_TECHS = new Set([
  'React Native', 'Flutter', 'Dart', 'Swift', 'Kotlin',
  'Java', 'Objective-C', 'Xcode', 'Android', 'iOS',
])

export function isMobileProject(technologies: string[]): boolean {
  return technologies.some((t) => MOBILE_TECHS.has(t))
}

export const tagColors: Record<string, string> = {
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
