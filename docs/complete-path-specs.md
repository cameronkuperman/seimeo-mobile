# Seimeo Mobile - Complete Onboarding Path Specification

## Overview
The Complete path is the most comprehensive onboarding experience, collecting detailed health data to enable advanced AI-powered health intelligence. This path takes approximately 8-10 minutes and is designed for users who want the most personalized and accurate health insights.

## Path Selection
- **Express Path**: 3-4 minutes - Essential data only
- **Regular Path**: 5-7 minutes - Balanced approach  
- **Complete Path**: 8-10 minutes - Full health profile

## Screen Flow Sequence

### 1. HeroWelcomeScreen
**Purpose**: Create strong first impression and establish trust
- **Visual**: Animated 3D iPhone rotation with health metrics
- **Headline**: "Health intelligence that understands you"
- **Subtext**: "Medical-grade AI. Personal insights."
- **CTA**: Black button "Get Started" with premium feel
- **Secondary**: "Already have an account? Sign in" link

### 2. SetupPathScreen
**Purpose**: Let users choose their onboarding depth
- **Three Cards**:
  - Express (Mint background): "Get started quickly"
  - Regular (Purple background): "Recommended balance" 
  - Complete (White background): "Most comprehensive"
- **Time Estimates**: Prominent display (3-4, 5-7, 8-10 min)
- **Visual Indicators**: Progress bars showing data collection depth

### 3. BirthdayScreen
**Purpose**: Collect age for health risk calculations
- **Date Picker**: Native platform date selector
- **Age Display**: Real-time calculation showing age
- **Generation Insight**: "Millennial", "Gen X", etc.
- **Why We Ask**: "Age helps us assess age-specific health risks"

### 4. GenderScreen
**Purpose**: Collect biological sex for medical accuracy
- **Options**: Male, Female, Prefer not to say
- **Visual**: Large selectable cards with icons
- **Medical Context**: "Biological sex affects health risks and medication dosing"
- **Inclusive Design**: "Prefer not to say" equally prominent

### 5. HeightWeightScreen
**Purpose**: Calculate BMI and medication dosing
- **Height Slider**: Visual ruler with feet/inches or cm toggle
- **Weight Slider**: Smooth selector with lbs/kg toggle
- **BMI Display**: Real-time calculation with health indicator
- **Visual Feedback**: Color-coded BMI ranges (green, yellow, orange, red)

### 6. MedicalHistoryScreen
**Purpose**: Track existing conditions for personalized care
- **Common Conditions Grid**: Quick-select frequent conditions
  - Hypertension, Diabetes, Asthma, etc.
- **Search Function**: Autocomplete for specific conditions
- **Custom Addition**: "Add other" for unlisted conditions
- **Visual Organization**: Grouped by system (Cardiovascular, Respiratory, etc.)

### 7. MedicationsScreen
**Purpose**: Track current medications for interaction checking
- **Medication Search**: Autocomplete with drug database
- **Dosage Entry**: Strength and frequency
- **Visual Pills**: Color-coded medication cards
- **Quick Add**: Common medications grid
- **No Medications**: Clear option for users not on meds

### 8. HospitalizationsScreen
**Purpose**: Track surgical and hospital history
- **Add Hospitalizations**: Modal for entry
  - Type: Surgery, Emergency, Planned Stay
  - Reason: Free text entry
  - Year: Quick year selector
  - Outcome: Recovered, Ongoing, Complications
- **Visual Timeline**: Shows history chronologically
- **Icons**: Surgery (scalpel), Emergency (ambulance), Hospital (building)

### 9. AllergiesScreen
**Purpose**: Critical safety information for treatment recommendations
- **Categories**: Food, Medication, Environmental
- **Quick Add Grids**:
  - Food: Nuts, Dairy, Gluten, Shellfish, Eggs
  - Medication: Penicillin, Aspirin, Ibuprofen, Sulfa
  - Environmental: Pollen, Dust, Pet Dander, Latex
- **Severity Levels**: Mild, Moderate, Severe
- **Reaction Types**: Rash, Breathing, Swelling, Other
- **No Allergies Option**: "No known allergies" checkbox

### 10. ExerciseScreen
**Purpose**: Assess physical activity level
- **Frequency Slider**: Days per week (0-7)
- **Activity Rings**: Visual representation
- **Exercise Types**: Cardio, Strength, Flexibility, Sports
- **Intensity Levels**: Light, Moderate, Vigorous
- **Sedentary Option**: "I don't exercise regularly"

### 11. SleepScreen
**Purpose**: Evaluate sleep quality impact on health
- **Hours Slider**: 5-6-7-8-9+ hours
- **Quality Rating**: Poor to Excellent scale
- **Sleep Issues**: Multi-select common problems
  - Insomnia, Snoring, Apnea, Restless legs
- **Visual**: Moon phases or sleep cycle visualization

### 12. DietScreen
**Purpose**: Understand nutritional habits
- **Diet Types**: Grid selection
  - Balanced, Vegetarian, Vegan, Keto, Mediterranean
- **Meal Frequency**: Regular, Irregular, Skipping meals
- **Water Intake**: Glasses per day slider
- **Special Considerations**: Gluten-free, Dairy-free, etc.

### 13. StressScreen
**Purpose**: Mental health baseline assessment
- **Stress Level**: Visual gradient scale (Green to Red)
- **Stress Sources**: Work, Family, Financial, Health
- **Coping Methods**: Exercise, Meditation, Therapy, None
- **Visual Feedback**: Calming animations and colors

### 14. SmokingScreen
**Purpose**: Major health risk factor assessment
- **Smoking Status**: Never, Former, Current
- **If Current**: Cigarettes per day, Years smoking
- **If Former**: Quit date, Previous amount
- **Vaping/E-cigarettes**: Separate section
- **Motivation**: "Ready to quit?" supportive messaging

### 15. AlcoholScreen
**Purpose**: Assess alcohol consumption health impact
- **Frequency**: Never to Daily scale
- **Amount**: Drinks per occasion
- **Visual Guide**: What counts as "one drink"
- **Health Context**: Safe consumption guidelines
- **Support**: Non-judgmental tone with resources

### 16. FamilyHistoryScreen
**Purpose**: Identify genetic risk factors
- **Condition Grid**: Major hereditary conditions
  - Heart Disease, Diabetes, Cancer, Alzheimer's
  - Hypertension, Depression, Stroke
- **Icons**: Medical condition visualization
- **Custom Addition**: Add unlisted conditions
- **Navigation**: Proceeds to details if conditions selected

### 17. FamilyHistoryDetailsScreen
**Purpose**: Detailed family member health data
- **For Each Condition**: Iterative detail collection
- **Family Members**: 
  - Relationship selector (Mother, Father, Grandparents, Siblings)
  - Can add multiple members per condition
- **Specific Details**:
  - Type specifics (e.g., "Breast cancer", "Type 2 diabetes")
  - Age at diagnosis
  - Additional notes
- **Progress**: Shows X of Y conditions being detailed

### 18. PersonalHealthContextScreen
**Purpose**: Capture unique health context in user's words
- **Text Input**: 500 character limit
- **Prompt**: "Tell us about your health journey..."
- **Examples**: Pre-filled chips for inspiration
  - "Managing chronic pain"
  - "Recovering from surgery"
  - "Pregnancy journey"
- **AI Analysis**: Processes for additional insights

### 19. HealthGoalsScreen
**Purpose**: Set personalized health objectives
- **Goal Categories**: 
  - Weight Management
  - Fitness Improvement
  - Better Sleep
  - Stress Reduction
  - Disease Prevention
  - Medication Management
- **Multi-Select**: Can choose multiple goals
- **Priority Setting**: Drag to reorder by importance

### 20. AuthenticationScreen
**Purpose**: Secure account creation
- **Email/Password**: Standard authentication
- **Social Auth**: Apple, Google sign-in options
- **Security**: Password strength indicator
- **Terms**: Consent checkboxes for terms and privacy
- **Trust Badges**: "HIPAA Compliant", "End-to-end encrypted"

### 21. CelebrationScreen
**Purpose**: Positive reinforcement and progress celebration
- **Animation**: Confetti or success animation
- **Progress Summary**: "Profile 100% complete!"
- **Personalized Message**: Based on health goals
- **Next Steps**: What happens now

### 22. PlanSelectionScreen
**Purpose**: Choose subscription tier
- **Free Plan**: 
  - 5 AI consultations/month
  - Basic symptom tracking
  - Health score dashboard
- **Premium Plan**:
  - Unlimited AI consultations
  - Advanced photo analysis
  - Predictive health insights
  - Priority support
- **Trial Offer**: "7-day free trial, no payment required"

### 23. AppleHealthSyncScreen (Premium only)
**Purpose**: Connect health data sources
- **Apple Health**: iOS integration
- **Google Fit**: Android integration
- **Wearables**: Fitbit, Garmin support
- **Data Types**: Steps, Heart Rate, Sleep, Workouts
- **Privacy**: Clear data usage explanation

### 24. WelcomeHomeScreen
**Purpose**: Successful onboarding completion
- **Personalized Greeting**: "Welcome, [Name]!"
- **Health Score**: Initial calculation with loading animation
- **Quick Actions**:
  - Ask AI a health question
  - Log today's vitals
  - Explore features
- **Tutorial**: Optional app tour

## Design System

### Colors
```scss
$primary: #5B4FCF;         // Confident purple-blue
$black: #000000;           // Premium CTAs
$health: #34C759;          // Success green
$coral: #FF6B6B;           // Warnings/urgent
$ocean: #5E9FCD;           // Calm blue
$lavender: #9B89CE;        // Soft purple
$mint: #52D3AA;            // Fresh mint
$amber: #FFB347;           // Warm amber
$background: #FAFAFA;      // Off-white
$surface: #FFFFFF;         // Pure white
```

### Typography
- **Headers**: SF Pro Display (iOS) / Roboto (Android)
- **Body**: System default with 17pt base size
- **Hierarchy**: Clear size and weight differentiation

### Components
- **Cards**: White with subtle shadows, 16px radius
- **Buttons**: 56px height, 28px radius, prominent shadows
- **Inputs**: 56px height, gray background, focus states
- **Progress Bar**: Top of screen, purple fill

### Animations
- **Screen Transitions**: Slide from right (iOS) / Fade (Android)
- **Button Press**: Scale 0.98 with haptic feedback
- **Card Entry**: Staggered fade-in from bottom
- **Loading States**: Skeleton screens or pulsing placeholders

## Data Collection Summary

### Essential (All Paths)
- Birthday, Gender, Height, Weight
- Medical History, Health Goals
- Authentication

### Lifestyle (Regular + Complete)
- Medications, Hospitalizations
- Exercise, Sleep, Diet
- Stress, Smoking, Alcohol
- Personal Health Context

### Comprehensive (Complete Only)
- Allergies (detailed with severity)
- Family History (with member details)
- All lifestyle factors with maximum detail

## Success Metrics
- **Completion Rate**: Target >80% for Complete path
- **Time to Complete**: 8-10 minutes average
- **Data Quality**: All fields validated and complete
- **User Satisfaction**: Post-onboarding NPS >50

## Error Handling
- **Validation**: Real-time with helpful messages
- **Network Errors**: Graceful offline support
- **Progress Saving**: Auto-save at each screen
- **Recovery**: Can resume from any point

## Accessibility
- **VoiceOver/TalkBack**: Full support
- **Dynamic Type**: Scales with system settings
- **Color Contrast**: WCAG AAA compliant
- **Touch Targets**: Minimum 44x44pt

## Privacy & Security
- **Data Encryption**: End-to-end encryption
- **HIPAA Compliance**: Medical data standards
- **Consent**: Clear opt-in for all data sharing
- **Data Deletion**: User can request deletion

## Next Steps After Completion
1. AI processes collected data
2. Generates initial health insights
3. Creates personalized dashboard
4. Schedules first AI consultation
5. Sends welcome email with tips

## Testing Checklist
- [ ] All screens render correctly
- [ ] Navigation flows work for all paths
- [ ] Data persists between screens
- [ ] Validation works properly
- [ ] Skip options function correctly
- [ ] Social auth integrates
- [ ] Premium features unlock properly
- [ ] Accessibility features work
- [ ] Performance targets met (<100ms transitions)
- [ ] Error states handle gracefully