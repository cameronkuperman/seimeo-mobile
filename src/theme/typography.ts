import { TextStyle } from 'react-native';
import { Colors } from './colors';

interface TypographyStyles {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body: TextStyle;
  bodyBold: TextStyle;
  caption: TextStyle;
  metadata: TextStyle;
  label: TextStyle;
  button: TextStyle;
}

export const Typography: TypographyStyles = {
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
    lineHeight: 38,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  metadata: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textTertiary,
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 20,
  },
};

// Header specific styles for gradient backgrounds
export const HeaderTypography = {
  score: {
    fontSize: 82,
    fontWeight: '900' as TextStyle['fontWeight'],
    color: Colors.white,
    letterSpacing: -3,
    lineHeight: 80,
  },
  scoreLabel: {
    fontSize: 19,
    fontWeight: '500' as TextStyle['fontWeight'],
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  date: {
    fontSize: 13,
    fontWeight: '700' as TextStyle['fontWeight'],
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: 0.8,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
};