# Seimeo Mobile - Onboarding Medical Data Schema

## Overview
This document defines the complete medical data collection schema for each onboarding screen, ensuring we gather comprehensive health information for personalized AI insights while maintaining user engagement.

## Screen-by-Screen Data Collection

### Screen 1: Hero Welcome
**Data Collected**: None
**Purpose**: Engagement and trust building
**Notes**: Pure marketing/engagement screen

### Screen 2: Setup Path Selection
**Data Collected**: 
- `onboardingDepth`: 'quick' | 'standard' | 'complete'
- `estimatedCompletionTime`: number (minutes)

**Purpose**: User segmentation and expectation setting
**Medical Relevance**: Determines data collection depth

### Screen 3: Birthday (Age)
**Data Collected**:
- `dateOfBirth`: Date
- `age`: number (calculated)
- `ageGroup`: string (e.g., '18-24', '25-34', '35-44', '45-54', '55-64', '65+')
- `generation`: string (e.g., 'Gen Z', 'Millennial', 'Gen X', 'Boomer')

**Medical Relevance**:
- Age-specific health risk calculations
- Medication dosing considerations
- Age-appropriate screening recommendations
- Life stage health concerns

### Screen 4: Gender & Biological Sex
**Data Collected**:
```typescript
{
  biologicalSex: 'male' | 'female' | 'intersex',
  genderIdentity: 'man' | 'woman' | 'non-binary' | 'transgender' | 'other' | 'prefer-not-to-say',
  pronouns?: 'he/him' | 'she/her' | 'they/them' | 'other',
  assignedAtBirth?: 'male' | 'female', // For trans individuals
  menstrualStatus?: 'regular' | 'irregular' | 'postmenopausal' | 'none' | 'pregnant' | 'breastfeeding',
  hormoneTherapy?: boolean,
  lastMenstrualPeriod?: Date, // If applicable
}
```

**Medical Relevance**:
- Sex-specific health risks (heart disease, osteoporosis)
- Reproductive health tracking
- Hormone-related conditions
- Medication interactions
- Cancer screening guidelines

### Screen 5: Height & Weight (Biometrics)
**Data Collected**:
```typescript
{
  height: {
    value: number,
    unit: 'cm' | 'ft/in',
    feet?: number,
    inches?: number,
  },
  weight: {
    value: number,
    unit: 'kg' | 'lbs',
  },
  bmi: number, // Calculated
  bmiCategory: string, // 'Underweight', 'Healthy', 'Overweight', etc.
  targetWeight?: number, // Optional goal
  waistCircumference?: number, // Optional for metabolic risk
  bodyFatPercentage?: number, // If known
  muscleMass?: number, // If known
}
```

**Medical Relevance**:
- BMI for health risk assessment
- Medication dosing (weight-based)
- Metabolic syndrome screening
- Nutritional status
- Exercise recommendations

### Screen 6: Health Goals
**Data Collected** (Multi-select):
```typescript
{
  primaryGoals: string[], // Top 3
  allGoals: [
    'weight_loss',
    'weight_gain',
    'muscle_building',
    'improve_sleep',
    'reduce_stress',
    'manage_chronic_condition',
    'preventive_health',
    'improve_energy',
    'better_nutrition',
    'mental_wellness',
    'heart_health',
    'diabetes_prevention',
    'pain_management',
    'fertility_pregnancy',
    'athletic_performance',
    'healthy_aging',
    'quit_smoking',
    'reduce_alcohol',
  ],
  timeframe?: '1_month' | '3_months' | '6_months' | '1_year',
  motivationLevel: 1-10,
}
```

### Screen 7: Medical History
**Data Collected**:

#### Current Conditions (Multi-select with severity):
```typescript
{
  conditions: [
    // Cardiovascular
    { name: 'hypertension', severity: 'mild' | 'moderate' | 'severe', controlled: boolean },
    { name: 'coronary_artery_disease', yearDiagnosed: number },
    { name: 'atrial_fibrillation', onAnticoagulation: boolean },
    { name: 'heart_failure', ejectionFraction?: number },
    { name: 'peripheral_artery_disease' },
    
    // Metabolic
    { name: 'type_2_diabetes', hba1c?: number, onInsulin: boolean },
    { name: 'type_1_diabetes', pumpUser: boolean, cgmUser: boolean },
    { name: 'prediabetes' },
    { name: 'metabolic_syndrome' },
    { name: 'obesity', bmi: number },
    
    // Respiratory
    { name: 'asthma', controlLevel: 'well' | 'partial' | 'poor' },
    { name: 'copd', goldStage?: 1-4 },
    { name: 'sleep_apnea', cpapUser: boolean },
    
    // Mental Health
    { name: 'depression', currentlyTreated: boolean },
    { name: 'anxiety', type: 'generalized' | 'panic' | 'social' },
    { name: 'bipolar_disorder' },
    { name: 'adhd' },
    { name: 'ptsd' },
    
    // Neurological
    { name: 'migraine', frequency: 'daily' | 'weekly' | 'monthly' },
    { name: 'epilepsy', lastSeizure?: Date },
    { name: 'parkinsons' },
    { name: 'multiple_sclerosis' },
    
    // Autoimmune
    { name: 'rheumatoid_arthritis' },
    { name: 'lupus' },
    { name: 'psoriasis' },
    { name: 'inflammatory_bowel_disease', type: 'crohns' | 'ulcerative_colitis' },
    { name: 'celiac_disease' },
    
    // Endocrine
    { name: 'hypothyroidism', tshLevel?: number },
    { name: 'hyperthyroidism' },
    { name: 'pcos' },
    
    // Other
    { name: 'chronic_kidney_disease', stage?: 1-5 },
    { name: 'liver_disease' },
    { name: 'cancer', type: string, inRemission: boolean },
    { name: 'osteoporosis', tScore?: number },
    { name: 'chronic_pain', location: string },
  ],
  
  surgicalHistory: [
    { procedure: string, year: number, complications: boolean }
  ],
  
  hospitalizations: [
    { reason: string, year: number, duration: number }
  ],
}
```

#### Medications:
```typescript
{
  currentMedications: [
    {
      name: string,
      genericName: string,
      dose: string,
      frequency: string,
      startDate: Date,
      prescribedFor: string,
      sideEffects?: string[],
    }
  ],
  
  // Common medication categories to prompt:
  medicationCategories: {
    bloodPressure: boolean,
    cholesterol: boolean,
    diabetes: boolean,
    bloodThinners: boolean,
    antidepressants: boolean,
    painMedications: boolean,
    sleepAids: boolean,
    hormones: boolean,
    vitamins: boolean,
    supplements: boolean,
  },
  
  adherence: 'always' | 'usually' | 'sometimes' | 'rarely',
  pharmacyPreference?: string,
}
```

#### Allergies:
```typescript
{
  drugAllergies: [
    {
      drug: string,
      reaction: 'anaphylaxis' | 'rash' | 'gi_upset' | 'other',
      severity: 'mild' | 'moderate' | 'severe',
    }
  ],
  
  foodAllergies: [
    {
      food: string,
      reaction: string,
      epinephrine: boolean,
    }
  ],
  
  environmentalAllergies: string[], // Pollen, dust, pet dander, etc.
  
  latexAllergy: boolean,
  contrastDyeReaction: boolean,
}
```

### Screen 8: Family History
**Data Collected**:
```typescript
{
  familyMembers: [
    {
      relationship: 'mother' | 'father' | 'maternal_grandmother' | 'maternal_grandfather' | 
                   'paternal_grandmother' | 'paternal_grandfather' | 'sibling' | 'child',
      livingStatus: 'alive' | 'deceased',
      ageAtDeath?: number,
      causeOfDeath?: string,
      
      conditions: [
        // High-risk hereditary conditions
        { name: 'heart_disease', ageAtDiagnosis?: number },
        { name: 'stroke', ageAtDiagnosis?: number },
        { name: 'diabetes_type2', ageAtDiagnosis?: number },
        { name: 'diabetes_type1', ageAtDiagnosis?: number },
        
        // Cancers (with specific types)
        { name: 'breast_cancer', ageAtDiagnosis?: number, brca?: boolean },
        { name: 'colon_cancer', ageAtDiagnosis?: number, lynchSyndrome?: boolean },
        { name: 'prostate_cancer', ageAtDiagnosis?: number },
        { name: 'ovarian_cancer', ageAtDiagnosis?: number },
        { name: 'lung_cancer', ageAtDiagnosis?: number, smoker?: boolean },
        { name: 'pancreatic_cancer', ageAtDiagnosis?: number },
        { name: 'melanoma', ageAtDiagnosis?: number },
        
        // Mental Health
        { name: 'depression' },
        { name: 'bipolar_disorder' },
        { name: 'schizophrenia' },
        { name: 'addiction', type?: 'alcohol' | 'drugs' | 'gambling' },
        
        // Neurological
        { name: 'alzheimers', ageAtOnset?: number },
        { name: 'parkinsons', ageAtOnset?: number },
        { name: 'huntingtons' },
        { name: 'als' },
        
        // Other hereditary
        { name: 'high_cholesterol' },
        { name: 'blood_clots' },
        { name: 'kidney_disease' },
        { name: 'glaucoma' },
        { name: 'osteoporosis' },
      ]
    }
  ],
  
  // Genetic testing
  geneticTesting: {
    completed: boolean,
    tests?: ['23andMe' | 'AncestryDNA' | 'clinical_genetic_testing'],
    knownMutations?: string[], // BRCA1, BRCA2, Lynch, etc.
  },
  
  ethnicity: string[], // For ethnicity-specific risks
  ashkenaziJewish: boolean, // Specific genetic risks
}
```

### Screen 9: Lifestyle Factors
**Data Collected**:
```typescript
{
  // Physical Activity
  exercise: {
    frequency: 'daily' | '3-5x_week' | '1-2x_week' | 'rarely' | 'never',
    primaryType: 'cardio' | 'strength' | 'flexibility' | 'mixed' | 'none',
    minutesPerWeek: number,
    intensity: 'light' | 'moderate' | 'vigorous',
    steps: number, // Average daily
    sedentaryHours: number, // Per day
  },
  
  // Nutrition
  diet: {
    type: 'standard' | 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'mediterranean' | 'low_carb',
    mealsPerDay: number,
    fruitsVegetablesServings: number,
    waterIntake: number, // glasses per day
    caffeine: 'none' | '1-2_cups' | '3-4_cups' | '5+_cups',
    alcohol: {
      frequency: 'never' | 'occasionally' | 'weekly' | 'daily',
      drinksPerWeek: number,
      bingeEpisodes: boolean, // 5+ drinks in one sitting
    },
    fastFood: 'never' | 'monthly' | 'weekly' | 'multiple_weekly' | 'daily',
    sodaIntake: 'never' | 'occasionally' | 'daily',
  },
  
  // Sleep
  sleep: {
    averageHours: number,
    bedtime: string, // HH:MM format
    wakeTime: string,
    quality: 'excellent' | 'good' | 'fair' | 'poor',
    snoring: boolean,
    sleepAids: boolean,
    screenTimeBeforeBed: boolean,
  },
  
  // Substance Use
  tobacco: {
    status: 'never' | 'former' | 'current',
    type?: 'cigarettes' | 'vaping' | 'cigars' | 'chewing',
    packYears?: number, // For smokers
    quitDate?: Date, // For former smokers
    quitAttempts?: number,
  },
  
  drugUse: {
    prescription_misuse: boolean,
    recreational: 'never' | 'past' | 'current',
    types?: string[],
  },
  
  // Occupational/Environmental
  occupation: {
    type: string,
    physicalDemands: 'sedentary' | 'light' | 'moderate' | 'heavy',
    stressLevel: 'low' | 'moderate' | 'high' | 'extreme',
    shiftWork: boolean,
    hazardExposure: string[], // Chemicals, radiation, etc.
  },
  
  // Social Health
  social: {
    relationshipStatus: 'single' | 'partnered' | 'married' | 'divorced' | 'widowed',
    livingArrangement: 'alone' | 'with_family' | 'with_roommates',
    socialSupport: 'strong' | 'moderate' | 'limited' | 'none',
    caregiverRole: boolean,
  },
}
```

### Screen 10: Mental Health Baseline
**Data Collected**:
```typescript
{
  // Validated screening tools
  phq9Score?: number, // Depression screening (0-27)
  gad7Score?: number, // Anxiety screening (0-21)
  
  // Quick assessments
  currentMood: 1-5, // Visual scale with emojis
  stressLevel: 1-10, // Visual gradient bar
  
  mentalHealthHistory: {
    previousDiagnoses: string[],
    currentTherapy: boolean,
    therapyType?: 'individual' | 'group' | 'couples' | 'family',
    psychiatrist: boolean,
    
    // Specific symptoms (last 2 weeks)
    symptoms: {
      lowMood: 'never' | 'several_days' | 'more_than_half' | 'nearly_every_day',
      anxiety: 'never' | 'several_days' | 'more_than_half' | 'nearly_every_day',
      sleepIssues: boolean,
      appetiteChanges: boolean,
      concentrationIssues: boolean,
      suicidalThoughts: boolean, // Triggers crisis resources
    },
    
    copingStrategies: string[], // Exercise, meditation, journaling, etc.
    triggers: string[], // Work, relationships, health, finances
  },
  
  // Wellness practices
  wellness: {
    meditation: boolean,
    mindfulness: boolean,
    yoga: boolean,
    journaling: boolean,
    breathingExercises: boolean,
  },
}
```

### Screen 11: AI Demo & Insights
**Data Collected**: None (Analysis screen)
**Generated Insights**:
- Risk assessment based on collected data
- Personalized health tip
- Prediction or trend identification
- Recommended next steps

### Screen 12: Premium Decision
**Data Collected**:
```typescript
{
  planSelection: 'free' | 'premium_trial' | 'premium_paid',
  interestedFeatures: string[], // What premium features appeal most
  pricePoint?: number, // Willingness to pay
  declineReason?: string, // If choosing free
}
```

### Screen 13: Authentication
**Data Collected**:
```typescript
{
  name: string,
  email: string,
  authMethod: 'email' | 'apple' | 'google',
  marketingConsent: boolean,
  termsAccepted: boolean,
  privacyAccepted: boolean,
}
```

### Screen 14: Apple Health Sync
**Data Collected**:
```typescript
{
  healthKitPermissions: {
    granted: boolean,
    categories: [
      'heartRate',
      'bloodPressure',
      'bloodGlucose',
      'bodyTemperature',
      'respiratoryRate',
      'oxygenSaturation',
      'steps',
      'distance',
      'flights',
      'activeEnergy',
      'restingEnergy',
      'exerciseMinutes',
      'standHours',
      'sleep',
      'mindfulness',
      'weight',
      'bodyFat',
      'height',
      'nutrition',
      'hydration',
      'menstrualFlow',
      'sexualActivity',
      'reproductiveHealth',
    ],
    deniedCategories?: string[],
  },
  
  wearables: {
    appleWatch: boolean,
    fitbit: boolean,
    garmin: boolean,
    whoop: boolean,
    oura: boolean,
    other?: string[],
  },
  
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'manual',
}
```

### Screen 15: Welcome Home
**Data Collected**: None
**Calculated Metrics**:
- Initial health score (0-100)
- Risk assessments
- Personalized recommendations
- Quick action suggestions

## Progressive Disclosure Strategy

### Quick Path (2 min)
- Birthday
- Gender  
- Height/Weight
- Health Goals
- Authentication

### Standard Path (5 min) - Recommended
- Birthday
- Gender
- Height/Weight  
- Health Goals
- Medical History (simplified)
- Family History (major conditions only)
- Lifestyle (basic questions)
- Authentication
- Apple Health Sync

### Complete Path (10 min)
- All screens with full detail
- Additional assessments
- Comprehensive medical history
- Detailed family tree
- Full lifestyle questionnaire
- Mental health screening tools
- Genetic information

## Data Validation Rules

### Required Fields (Minimum viable profile):
- Date of birth
- Biological sex  
- Height
- Weight
- At least one health goal
- Name
- Email or social auth

### Validation Patterns:
- Email: RFC 5322 compliant
- Height: 36-96 inches (91-244 cm)
- Weight: 50-700 lbs (23-318 kg)
- Age: 13-120 years
- Medications: Validated against drug database
- Conditions: ICD-10 code mapping

## Privacy & Compliance

### HIPAA Considerations:
- All health data encrypted at rest and in transit
- Explicit consent for each data category
- Granular privacy controls
- Data retention policies
- Right to deletion

### Sensitive Data Handling:
- Mental health responses trigger resources
- Substance use non-judgmental
- Gender identity separate from biological sex
- Sexual health optional and private
- Genetic data extra protection

## AI Processing Pipeline

### Real-time Analysis:
1. Risk stratification algorithm
2. Personalized insight generation
3. Recommendation engine
4. Predictive modeling
5. Anomaly detection

### Data Enrichment:
- Clinical guideline mapping
- Drug interaction checking
- Evidence-based recommendations
- Population health comparisons
- Trend analysis

## Integration Points

### External Data Sources:
- Apple HealthKit
- Google Fit
- Electronic Health Records (FHIR)
- Pharmacy systems
- Lab results (HL7)
- Wearable devices
- Genetic testing platforms

### Output Formats:
- FHIR resources
- CDA documents
- PDF reports
- CSV exports
- API webhooks

## Notes

- Progressive disclosure reduces abandonment
- Medical terminology paired with plain language
- Visual indicators for data quality/completeness  
- Contextual help for medical terms
- Skip options for sensitive questions
- Regular prompts to update changing data
- Celebrate completion milestones