# Seimeo Mobile UI Guidelines

## Important UI Standards

### No Emojis in Production UI
- **NEVER** use emojis in production UI components
- Always use proper icon libraries (react-native-vector-icons)
- Preferred icon sets: Ionicons, Feather, Material Icons

### Floating Action Button Positioning
- Floating buttons should be positioned close to bottom
- Standard position: `bottom: 45`
- Ensures button doesn't overlap with tab bar or system UI

### Icon Library Standards
- Use `react-native-vector-icons/Ionicons` for navigation icons
- Standard icon size: 24px for tab bar, 20px for inline
- Icon colors should follow Colors.ts theme system

### Timeline Design Principles
- Timestamps should be integrated INSIDE cards, not outside
- Format: "Nov 7, 2024 • 2:30 PM" or "Today • 2:30 PM"
- Use thin connector lines (1.5px width) between timeline items
- Cards should be self-contained with all relevant information

### Color System
- Primary actions: Colors.black (#000000)
- Functional colors: health, coral, ocean, lavender, mint, amber
- Never use raw hex colors - always reference Colors.ts

### Typography
- No emojis in text content
- Use proper font weights from the system
- Maintain consistent text hierarchy

### Component Standards
- Cards should have subtle shadows and borders
- Border radius: 16px for cards, 12px for buttons
- Consistent padding: 16px for card content

## File Organization
- Timeline components go in src/components/timeline/
- Navigation files in src/navigation/
- Screens in src/screens/[feature]/

## Testing Requirements
- Always test on both iOS and Android
- Verify icon rendering on both platforms
- Check floating button positions don't conflict with system UI

## Professional UI References
- Study apps like Cal AI for icon usage
- Medical-grade design with black primary authority
- Clean, minimal interfaces without decorative elements