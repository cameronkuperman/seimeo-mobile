# Seimeo Mobile - Onboarding UI/UX Specifications

## Design Philosophy
Medical-grade precision meets approachable wellness. Inspired by Cal AI's trust-building flow and Oliva's calming aesthetics, creating a unique health intelligence experience.

## Color System

### Primary Palette
```scss
// Backgrounds
$background: #FAFAFA;        // Off-white main background
$surface: #FFFFFF;           // Pure white cards
$elevated: #F7F7F8;          // Elevated surfaces
$overlay: rgba(255, 255, 255, 0.95); // Modal overlays

// Primary Brand Colors (Purple-Blue Spectrum)
$primary: #5B4FCF;           // Confident purple-blue
$primaryLight: #7B6FEF;      // Hover states
$primaryDark: #4039B0;       // Active/pressed states
$primaryMuted: #F0EDFF;      // Soft purple backgrounds

// Accent Colors
$mint: #E7F5F2;              // Soft mint backgrounds
$mintActive: #A8DADC;        // Active mint
$coral: #FF6B6B;             // Urgent/important
$coralMuted: #FFE5E5;        // Soft coral backgrounds
$success: #4CAF50;           // Health green
$warning: #FFA726;           // Warning orange

// Black Accents (Premium Feel)
$black: #000000;             // Pure black for premium CTAs
$blackSoft: #0A0A0A;         // Softer black
$charcoal: #1F1F1F;          // Dark gray for headers
$slate: #2D2D2D;             // Medium dark

// Text Hierarchy
$textPrimary: #0A0A0A;       // Soft black (more readable)
$textSecondary: #6B7280;     // Gray
$textTertiary: #9CA3AF;      // Light gray
$textInverse: #FFFFFF;       // White on dark

// Borders & Dividers
$border: #E5E5E7;            // Subtle borders
$divider: #F0F0F2;           // Even subtler
$borderFocus: #5B4FCF;       // Focus state
```

## Typography System

```tsx
const Typography = {
  // Display
  hero: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  
  // Headers
  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  
  // Body
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 24,
  },
  
  callout: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  
  footnote: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  
  // Controls
  button: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
};
```

## Component Specifications

### Primary Button
```tsx
{
  height: 56,
  borderRadius: 28,
  backgroundColor: '#5B4FCF',
  paddingHorizontal: 32,
  
  // iOS Shadow
  shadowColor: '#5B4FCF',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  
  // Android Elevation
  elevation: 8,
  
  // States
  hover: { backgroundColor: '#7B6FEF' },
  pressed: { backgroundColor: '#4039B0', scale: 0.98 },
  disabled: { backgroundColor: '#E5E5E7', opacity: 0.5 },
}
```

### Secondary Button
```tsx
{
  height: 56,
  borderRadius: 28,
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: '#5B4FCF',
  
  // States
  hover: { backgroundColor: '#F0EDFF' },
  pressed: { backgroundColor: '#E0D9FF' },
}
```

### Card Component
```tsx
{
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  borderWidth: 1,
  borderColor: '#F0F0F2',
  
  // Shadow
  shadowColor: '#1A1A1A',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,
  shadowRadius: 8,
  elevation: 2,
  
  // Variants
  mint: { backgroundColor: '#E7F5F2', borderColor: '#A8DADC' },
  coral: { backgroundColor: '#FFE5E5', borderColor: '#FF6B6B' },
  purple: { backgroundColor: '#F0EDFF', borderColor: '#7B6FEF' },
}
```

### Input Field
```tsx
{
  container: {
    marginBottom: 16,
  },
  
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  
  input: {
    height: 56,
    backgroundColor: '#F7F7F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#1A1A1A',
  },
  
  focused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#5B4FCF',
    borderWidth: 2,
  },
  
  error: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFE5E5',
  },
}
```

## Onboarding Flow Structure

### Screen 1: Hero Welcome
- **Background**: Gradient (#FAFAFA → #F0EDFF with subtle mint overlay)
- **Animation**: 3D iPhone rotation placeholder
- **Headline**: "Health intelligence that understands you" (in #0A0A0A soft black)
- **Subtext**: "Medical-grade AI. Personal insights." (in #6B7280 gray)
- **CTA Options**:
  - Primary: Black button with white text "Get Started" (premium feel)
  - Alternative: Purple gradient button (#5B4FCF → #7B6FEF)
- **Secondary**: "Already have an account? Sign in" (purple text link)

### Screen 2: Smart Authentication
- **Layout**: Card-based with mint accents
- **Fields**: Name, Email (floating labels)
- **Social Auth**: Apple/Google buttons with exact native styling
- **Trust Badge**: "End-to-end encrypted" with lock icon

### Screen 3: Setup Path Selection
- **Three Cards**: Each with different background
  - Quick (2 min) - Mint background
  - Standard (5 min) - Purple background (recommended)
  - Complete (10 min) - White background
- **Progress indication**: Time estimates prominent

### Screen 4: Core Vitals
- **Age**: Decade selector with generation insights
- **Sex**: Binary toggle with "Prefer not to say" option
- **Height/Weight**: Beautiful sliders with unit toggle
- **Each input**: In separate white card on #FAFAFA background

### Screen 5: Medical History
- **Medications**: Searchable with autocomplete
- **Conditions**: Multi-select chips
- **Allergies**: Quick-add tags with coral highlights for severity
- **Layout**: Sectioned cards with mint headers

### Screen 6: Family History
- **Visual**: Interactive family tree
- **Conditions**: Quick-select common conditions
- **Risk Indicators**: Coral highlights for high-risk conditions
- **Optional**: But emphasized importance with mint info box

### Screen 7: Lifestyle Factors
- **Grid Layout**: 2x3 quick-tap cards
- **Visual Indicators**: Icons with color coding
  - Healthy choices: Mint highlights
  - Risk factors: Coral highlights
  - Neutral: White
- **Animations**: Subtle scale on selection

### Screen 8: Mental Health Baseline
- **Approach**: Soft, supportive tone
- **Mood Scale**: 5 custom-designed emojis
- **Stress Visual**: Gradient bar (mint to coral)
- **Card Background**: Soft mint for comfort

### Screen 9: Health Goals
- **Multi-select**: Cards with icons
- **Visual Hierarchy**: Most common goals larger
- **Selection Feedback**: Purple checkmarks
- **Minimum**: Encourage at least one selection

### Screen 10: AI Demo
- **Live Analysis**: Animated processing
- **3 Insight Cards**: 
  - Risk Assessment (coral accent if issues)
  - Personalized Tip (mint accent)
  - Prediction (purple accent)
- **Trust Building**: "Based on your specific profile..."

### Screen 11: Premium Decision
```
Two-path design:

FREE PATH (Mint Card):
✓ 5 AI consultations/month
✓ Basic symptom tracking
✓ Health score dashboard
[Continue with Free]

PREMIUM PATH (Purple Card):
✨ Unlimited AI consultations
✨ Advanced photo analysis
✨ Predictive health insights
✨ Priority support
[Start 7-Day Free Trial]
"No payment required now"
```

### Screen 12: Permissions
- **Contextual Cards**: Each permission separate
- **Benefits Clear**: Why each permission helps
- **Optional**: Can skip all and enable later
- **Visual**: Icons with mint checkmarks when enabled

### Screen 13: Welcome Home
- **Personalized**: "Welcome, [Name]"
- **Health Score**: Calculating animation
- **Quick Actions**: 3 cards with different colors
  - Ask AI (Purple)
  - Quick Check-in (Mint)
  - Explore Features (Coral)

## Animation Specifications

### Screen Transitions
```tsx
{
  type: 'slide-left',
  duration: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  useNativeDriver: true,
}
```

### Button Interactions
```tsx
{
  onPressIn: {
    scale: 0.98,
    duration: 100,
  },
  onPressOut: {
    scale: 1,
    duration: 100,
  },
  hapticFeedback: 'impactLight', // iOS only
}
```

### Card Entrance
```tsx
{
  from: {
    opacity: 0,
    translateY: 20,
  },
  to: {
    opacity: 1,
    translateY: 0,
  },
  duration: 400,
  delay: index * 50, // Stagger effect
}
```

## Progress Indicator
```tsx
{
  position: 'top',
  height: 4,
  backgroundColor: '#F0F0F2',
  fillColor: '#5B4FCF',
  animated: true,
  showPercentage: false,
  segments: 13, // Total screens
}
```

## Spacing System
```tsx
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Consistent screen padding
  screenPadding: 16,
  cardPadding: 20,
  sectionGap: 24,
};
```

## Shadow System
```tsx
const Shadows = {
  sm: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  md: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  xl: {
    shadowColor: '#5B4FCF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
};
```

## Accessibility
- Minimum touch target: 44x44pt
- Color contrast: WCAG AAA compliant
- Font scaling: Support Dynamic Type
- VoiceOver/TalkBack: Full support
- Haptic feedback: Contextual on iOS

## Platform Differences
```tsx
Platform.select({
  ios: {
    // Use SF Pro Display/Text
    // Haptic feedback enabled
    // Blur effects for overlays
    // Spring animations
  },
  android: {
    // Use Roboto
    // Material ripple effects
    // Elevation for depth
    // Material transitions
  },
});
```

## Error States
- Input errors: Coral border with message below
- Network errors: Toast notification with retry
- Validation: Real-time with success indicators (mint checkmark)

## Loading States
- Screen transitions: Activity indicator
- Data fetching: Skeleton screens
- AI processing: Animated pulse with messages

## Empty States
- Friendly illustrations
- Clear call-to-action
- Helpful messaging

## Success States
- Mint colored checkmarks
- Subtle confetti for completion
- Haptic feedback (success pattern)

## Implementation Priority
1. **Phase 1**: Core screens (1-4) - Authentication flow
2. **Phase 2**: Data collection (5-9) - Profile building
3. **Phase 3**: Conversion (10-11) - Premium upsell
4. **Phase 4**: Activation (12-13) - Permissions and home

## Testing Checklist
- [ ] All buttons have proper touch feedback
- [ ] Animations run at 60fps
- [ ] Colors match exact hex values
- [ ] Shadows render correctly on both platforms
- [ ] Text remains readable at all system font sizes
- [ ] Navigation can go backward at any point
- [ ] Skip options work correctly
- [ ] Form validation provides helpful feedback
- [ ] Social auth integrates properly
- [ ] Progress bar updates accurately

## Notes
- Purple-blue (#5B4FCF) creates trust while being unique
- Mint accents (#E7F5F2) soften medical feel
- Coral (#FF6B6B) draws attention without alarming
- Card-based design provides clear information hierarchy
- Consistent spacing creates rhythm and flow
- Native patterns ensure familiarity