import { Theme } from './tokens';

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    surface: '#F7F7F8',
    primary: '#0B84FF',
    primaryVariant: '#075FA8',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    success: '#16A34A',
    danger: '#DC2626',
    shadow: 'rgba(16,24,40,0.08)',
    disabledBackground: '#E5E7EB',
    disabledText: '#9CA3AF',
    disabledBorder: '#D1D5DB',
  },
  typography: { h1: 24, h2: 18, body: 16, small: 12 },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
  rounded: 12,
  elevation: 4,
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#0B0F13',
    surface: '#0F1720',
    primary: '#3EA6FF',
    primaryVariant: '#2B86D6',
    text: '#F8FAFC',
    mutedText: '#9CA3AF',
    border: '#172031',
    success: '#34D399',
    danger: '#FB7185',
    shadow: 'rgba(0,0,0,0.6)',
    disabledBackground: '#1F2937',
    disabledText: '#6B7280',
    disabledBorder: '#2D3748',
  },
  typography: { h1: 24, h2: 18, body: 16, small: 12 },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
  rounded: 12,
  elevation: 6,
};
