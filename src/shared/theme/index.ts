export const theme = {
  colors: {
    background: '#0F1112',
    cardBackground: '#2C2622',
    primary: '#EF921E',
    accent: '#FFBD32',
    text: '#FFFFFF',
    textMuted: '#919493',
    cardBorder: '#474747',
    inputBorder: '#474747',
    statusAberto: '#4CAF50',
    statusFechado: '#919493',
    bonusRibbon: '#EF921E',
    bonusAccent: '#8A23CE',
    error: '#EF4444',
  },
  typography: {
    fontRegular: 'Poppins_400Regular',
    fontSemiBold: 'Poppins_600SemiBold',
    fontInter: 'Inter_400Regular',
    size: {
      xxs: 8,
      xs: 9,
      sm: 10,
      base: 12,
      md: 14,
      lg: 16,
      xl: 18,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 40,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 14,
    full: 999,
  },
} as const

export type AppTheme = typeof theme
