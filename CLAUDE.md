# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RxMate** is a React + TypeScript pharmacy technician assistant application that provides tools for medication management, drug information lookup, prescription calculations, and PTCB exam preparation.

**AI Usage**: The app uses Google's Gemini AI **only for pill identification**. Drug lookup uses a comprehensive local database (68+ medications) with no AI dependency for fast, reliable offline access.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 5000)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Architecture

### View-Based Navigation System

The app uses a custom view-based navigation system (not React Router) centered around the `View` enum in `types.ts`. Navigation is managed through:

- **View State Management**: `App.tsx` maintains `currentView` and `viewHistory` state
- **View Enum**: All possible views are defined in `types.ts` as `View` enum values
- **View Navigation**: Components receive `setView` prop to trigger navigation
- **Back Navigation**: `goBack()` function pops from `viewHistory` to return to previous views
- **Dynamic Header**: Header component displays current view title and changes color based on selected tool (see `viewColors` mapping in `Header.tsx`)

### Component Structure

```
App.tsx (root)
├── ThemeProvider (context/ThemeContext.tsx)
│   └── Provides dynamic theming based on current View
├── Header.tsx
│   └── View-aware header with back navigation
├── Dashboard.tsx
│   └── Main landing page with feature cards
└── Feature Components (receive setView prop)
    ├── DosageCalculator.tsx (Days Supply)
    ├── DrugLookup.tsx (Drug Information)
    ├── PillIdentifier.tsx
    ├── SIGTrainer.tsx
    ├── FlashCards.tsx (PTCB Learning)
    ├── InjectionGuide.tsx
    ├── HospitalCalculations.tsx
    │   └── Sub-calculators accessed via buttons
    │       ├── IVFlowRateCalculator.tsx
    │       └── AlligationCalculator.tsx
```

### Key Architectural Patterns

1. **Dynamic Header Theming**: `Header.tsx` contains a `viewColors` map that defines gradient colors for each view:
   - Dashboard: Blue gradient
   - Drug Lookup: Violet to Purple gradient
   - Hospital Calculations: Teal to Emerald gradient
   - Days Supply: Blue gradient
   - Pill Identifier: Amber to Orange gradient
   - SIG Codes: Emerald gradient
   - Flashcards: Rose to Pink gradient
   - Injections: Indigo gradient

   The header automatically switches colors when navigating between views.

2. **Local Drug Database**: `components/drugData.ts` contains a comprehensive drug database with 68+ medications:
   - Each drug includes: generic name, brand names, common uses, dosage forms, side effects, and pharmacology
   - `findDrugLocally()` function searches by generic or brand name
   - **No AI required** for drug lookups - completely offline
   - Database covers most commonly prescribed medications

3. **AI Integration** (Pill Identifier Only): `components/geminiService.ts`:
   - Uses model fallback strategy (tries multiple Gemini models)
   - `identifyPill()`: Returns formatted HTML text for pill identification
   - API key is hardcoded in the service file
   - **NOT used for drug lookup** (removed to rely on local database)

4. **Component Props Pattern**: Most feature components receive:
   - `setView: (view: View) => void` - for navigation to other views
   - Components handle their own state and service calls

5. **Professional UI Design**:
   - Glassmorphism effects on header with backdrop blur
   - Gradient overlays on hover for dashboard cards
   - Smooth animations (fade-in, slide-up) defined in `index.html`
   - Custom scrollbar styling
   - Medical-grade color palette (blues, emeralds, professional neutrals)

## Important Implementation Details

### Drug Lookup vs Pill Identifier

- **Drug Lookup** (`DrugLookup.tsx`): Uses **local database only** (`drugData.ts`). No AI calls. Fast, offline-capable.
- **Pill Identifier** (`PillIdentifier.tsx`): Uses **Gemini AI** for image-based pill identification.

### API Key Configuration

The Gemini API key is stored in `components/geminiService.ts`. Only required for Pill Identifier feature.

### Local Drug Database Structure

In `components/drugData.ts`, each drug entry follows this format:
```typescript
'drugname': {
  genericName: 'ProperCase',
  brandNames: ['Brand1', 'Brand2'],
  commonUses: ['Use1', 'Use2', 'Use3'],
  dosageForms: ['Tablet', 'Capsule'],
  commonSideEffects: ['Effect1', 'Effect2'],
  pharmacology: 'Mechanism of action description'
}
```
Keys are lowercase generic names. Search is case-insensitive.

### TypeScript Configuration

- Using bundler module resolution
- React JSX transform enabled
- Strict mode enabled
- Path alias: `@/*` maps to project root

### Styling System

- **Tailwind CSS** via CDN (not built/compiled)
- **Color Palette**: Professional medical-grade colors
  - Primary: Blue (`blue-500`, `blue-600`)
  - Secondary: Emerald/Teal
  - Accents: Violet, Amber, Rose, Indigo (view-specific)
  - Neutrals: `neutral-50` (background), `neutral-900` (headings), `neutral-600` (body text)
- **Custom Animations** in `index.html`:
  - `fadeIn`: Opacity + translateY
  - `slideUp`: Entrance animation for cards
  - Glassmorphism: `backdrop-filter: blur(12px)`
- **Typography**: Inter font with optimized rendering
- **Spacing**: 8px-based scale (p-4, p-6, p-8, etc.)

## File Organization

- `App.tsx` - Root component with view routing logic
- `types.ts` - TypeScript interfaces and View enum
- `components/` - All feature components and shared UI
- `context/` - React context providers (ThemeContext)
- `constants.ts` - App-wide constants (not currently used extensively)

## Adding New Drugs to Database

To add a new drug to the local database in `components/drugData.ts`:

1. Add entry with lowercase generic name as key
2. Include all required fields (see structure above)
3. Update TOP_DRUGS_LIST in `constants.ts` if it's a commonly prescribed medication
4. Drug will be immediately searchable by generic or brand name

## Testing and Debugging

When testing features:
- **Drug Lookup**: Works offline, no API key needed. Database contains 68+ drugs.
- **Pill Identifier**: Requires active Gemini API key in `geminiService.ts`
- Model fallback will try multiple Gemini versions if one fails
- Check browser console for any errors related to missing drugs or API failures

## Key Design Principles

1. **Professional Medical UI**: Clean, trustworthy design appropriate for healthcare
2. **Offline-First**: Drug lookup works without internet (local database)
3. **Fast Performance**: No AI calls for common operations
4. **Mobile-Responsive**: Mobile-first Tailwind breakpoints (sm:, md:, lg:)
5. **Accessibility**: Focus states, ARIA labels, keyboard navigation
