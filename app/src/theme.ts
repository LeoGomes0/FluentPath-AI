export const theme = {
  colors: {
    bg: '#0E1116',
    surface: '#161B22',
    surfaceAlt: '#1F2630',
    border: '#2A313C',
    text: '#E6EDF3',
    textMuted: '#9BA7B4',
    primary: '#4F8CFF',
    primaryText: '#FFFFFF',
    success: '#3FB950',
    warning: '#D29922',
    danger: '#F85149',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  spacing: (n: number) => n * 8,
} as const;

export type Theme = typeof theme;
