/**
 * Seimeo Mobile Color System
 * Medical-grade design inspired by Cal AI's black-primary authority
 * with Olivia's functional color intelligence
 */

export const Colors = {
  // Foundation (90% of UI)
  black: '#000000',             // Primary CTAs, headers
  charcoal: '#1C1C1E',          // Secondary text
  gray: '#8E8E93',              // Tertiary text  
  slate: '#64748B',             // Subtle greyish-blue for secondary UI
  lightGray: '#F2F2F7',         // Backgrounds
  white: '#FFFFFF',             // Cards, surfaces

  // Text Hierarchy
  textPrimary: '#000000',       // Headers, primary text
  textSecondary: '#3A3A3C',     // Body text
  textTertiary: '#8E8E93',      // Secondary text
  textPlaceholder: '#C7C7CC',   // Placeholder text
  textInverse: '#FFFFFF',       // White on dark

  // Functional Colors (10% - Used with Purpose)
  health: '#34C759',            // Health scores, positive metrics
  coral: '#FF6B6B',             // Imaging, urgent items
  ocean: '#5E9FCD',             // Genetics, water intake
  lavender: '#9B89CE',          // Mental health, sleep
  mint: '#52D3AA',              // Vitals, breathing
  amber: '#FFB347',             // Medications, warnings

  // Semantic Colors
  success: '#34C759',           // Same as health
  error: '#FF3B30',             // System red for errors
  warning: '#FFB347',           // Same as amber
  info: '#5E9FCD',              // Same as ocean

  // Backgrounds
  background: '#FFFFFF',        // Main background
  backgroundSecondary: '#F2F2F7', // Secondary background
  surface: '#FFFFFF',           // Card surfaces
  elevated: '#FAFAFA',          // Elevated surfaces

  // Borders & Dividers
  border: '#E5E5E7',            // Standard borders
  borderLight: '#F2F2F7',       // Subtle borders
  borderMedium: '#64748B',      // Slate borders for disabled/secondary
  borderFocus: '#000000',       // Focus state borders

  // Special Moments (Use Sparingly)
  trustGradient: ['#F5F3FF', '#FFF5F8'], // Trust building moments only
  healthGradient: ['#34C759', '#52D3AA'], // Health score displays
  
  // Shadows (for depth)
  shadowLight: 'rgba(0, 0, 0, 0.04)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)', 
  shadowDark: 'rgba(0, 0, 0, 0.12)',
  shadowCard: 'rgba(0, 0, 0, 0.1)',
} as const;

export type ColorName = keyof typeof Colors;