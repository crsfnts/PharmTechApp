# Animation Reference Guide - RxMate

Quick reference for using animations throughout the RxMate application.

---

## Available Animation Classes

### Fade-In Animation
```jsx
className="animate-fade-in"
style={{ animationDelay: '200ms' }}
```
- **Duration:** 600ms
- **Effect:** Fades in from 0 opacity + slides up 20px
- **Easing:** Spring-based (cubic-bezier(0.16, 1, 0.3, 1))
- **Use for:** Page elements, cards, text blocks

### Slide-Up Animation
```jsx
className="animate-slide-up"
style={{ animationDelay: '300ms' }}
```
- **Duration:** 700ms
- **Effect:** Fades in from 0 opacity + slides up 30px
- **Easing:** Spring-based
- **Use for:** Modal dialogs, major sections

### Scale-In Animation
```jsx
className="animate-scale-in"
```
- **Duration:** 400ms
- **Effect:** Scales from 0.9 to 1.0 + fades in
- **Easing:** Spring-based
- **Use for:** Modals, tooltips, popovers

### Slide-In-Right Animation
```jsx
className="animate-slide-in-right"
```
- **Duration:** 500ms
- **Effect:** Slides in from right 20px + fades in
- **Easing:** Spring-based
- **Use for:** Sidebar panels, notifications

---

## Staggered Animation Pattern

For lists or grids, use inline delay styles:

```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {item.content}
  </div>
))}
```

**Recommended delays:**
- **Small lists (3-5 items):** 80-100ms between items
- **Medium lists (6-10 items):** 60-80ms between items
- **Large lists (10+ items):** 40-60ms between items

---

## Shadow Classes

### Standard Shadows
```jsx
className="card-shadow-sm"   // Subtle: 0 1px 2px
className="card-shadow-md"   // Medium: 0 4px 6px
className="card-shadow-lg"   // Large: 0 10px 15px
className="card-shadow-xl"   // Extra large: 0 20px 25px
```

### Colored Glow Effects
```jsx
className="glow-blue"        // Blue glow
className="glow-emerald"     // Emerald glow
className="glow-violet"      // Violet glow
```

---

## Interactive States

### Hover States
```jsx
// Card lift on hover
className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"

// Icon bounce on hover
className="icon-bounce"

// Scale on hover
className="hover:scale-105 transition-transform duration-300"
```

### Press Effect
```jsx
// Scale down on press
className="active:scale-[0.98] transition-transform duration-100"

// Translate reset on press
className="hover:-translate-y-2 active:translate-y-0"
```

### Focus States
```jsx
// Auto-applied to inputs/selects/textareas
// Lifts 1px up + enhanced shadow on focus
```

---

## Loading States

### Shimmer Effect
```jsx
<div className="loading-shimmer h-8 w-full rounded" />
```
- Horizontal sweep animation
- 2s loop
- Use for: Loading placeholders

### Skeleton Loader
```jsx
<div className="skeleton h-4 w-3/4 rounded mb-2" />
<div className="skeleton h-4 w-1/2 rounded" />
```
- Pulsing opacity + gradient
- 1.5s loop
- Use for: Content loading states

---

## Gradient Backgrounds

### Card Gradients
```jsx
// Blue theme
className="bg-gradient-to-br from-blue-500 to-blue-600"

// Emerald theme
className="bg-gradient-to-br from-emerald-500 to-emerald-600"

// Rose theme
className="bg-gradient-to-br from-rose-500 to-pink-600"

// Violet theme
className="bg-gradient-to-br from-violet-500 to-purple-600"

// Indigo theme
className="bg-gradient-to-br from-indigo-500 to-indigo-600"

// Teal theme
className="bg-gradient-to-br from-teal-500 to-emerald-600"
```

### Background Overlays
```jsx
// Subtle gradient overlay
className="bg-gradient-to-br from-blue-50 to-emerald-50"
```

---

## Transition Patterns

### Standard Transition
```jsx
className="transition-all duration-300"
```
- Use for: Most interactive elements
- Smooth, consistent motion

### Fast Transition
```jsx
className="transition-all duration-150"
```
- Use for: Small UI changes, toggles

### Slow Transition
```jsx
className="transition-all duration-500"
```
- Use for: Cards, major state changes

### Custom Spring Easing
```jsx
style={{
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
}}
```
- Bouncy, natural feel
- Use for: Premium interactions

---

## Icon Box Pattern

Professional icon container with shadow:

```jsx
<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
  <svg className="w-5 h-5 text-white">
    {/* icon */}
  </svg>
</div>
```

---

## Button Patterns

### Primary Button
```jsx
<button className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300">
  Submit
</button>
```

### Secondary Button
```jsx
<button className="px-6 py-3 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300">
  Cancel
</button>
```

### Icon Button
```jsx
<button className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-200">
  <svg className="w-5 h-5">{/* icon */}</svg>
</button>
```

---

## Card Pattern

Professional feature card:

```jsx
<div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-neutral-200 hover:border-transparent hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 overflow-hidden">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Content */}
  <div className="relative p-6">
    <h3 className="font-bold text-neutral-900 group-hover:text-white transition-colors duration-300">
      Title
    </h3>
    <p className="text-neutral-600 group-hover:text-white/90 transition-colors duration-300">
      Description
    </p>
  </div>
</div>
```

---

## Badge Pattern

Professional badges with hover:

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
  Badge Text
</span>
```

---

## Section Header Pattern

Enhanced section headers:

```jsx
<h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
    <svg className="w-5 h-5 text-white">
      {/* icon */}
    </svg>
  </div>
  Section Title
</h2>
```

---

## View Transition Wrapper

For smooth page transitions:

```jsx
// In App.tsx or routing component
<div key={currentView} className="animate-fade-in">
  {renderView()}
</div>
```

---

## Timing Reference

### Animation Delays for Page Load
```
Hero badges:     0ms
Hero title:      100ms
Hero subtitle:   200ms
Section 1:       300ms
Section 1 cards: 350ms, 430ms, 510ms...
Section 2:       500ms
Section 2 cards: 550ms, 630ms, 710ms...
Section 3:       700ms
Section 3 cards: 750ms, 830ms, 910ms...
Footer info:     900ms
```

### Animation Durations
```
Fast:       150ms  (toggles, small changes)
Standard:   300ms  (most interactions)
Medium:     400-500ms  (cards, modals)
Slow:       600-700ms  (page transitions, major changes)
```

---

## Best Practices

1. **Always provide delays for staggered animations**
   - Creates natural reading flow
   - Prevents overwhelming user

2. **Use spring easing for premium feel**
   - `cubic-bezier(0.16, 1, 0.3, 1)`
   - Adds personality without being gimmicky

3. **Keep hover states consistent**
   - Cards: lift + shadow increase
   - Buttons: lift + slight scale
   - Icons: scale or bounce

4. **Maintain performance**
   - Only animate `transform` and `opacity`
   - Avoid animating `width`, `height`, `top`, `left`
   - Use GPU acceleration

5. **Test on mobile**
   - Ensure animations feel smooth on lower-end devices
   - Consider `prefers-reduced-motion` for accessibility

6. **Purpose over decoration**
   - Every animation should communicate or guide
   - Avoid animations that distract or slow workflow

---

## Color Theme Reference

```js
// For matching icon boxes to card gradients
const colorThemes = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  rose: 'from-rose-500 to-pink-600',
  violet: 'from-violet-500 to-purple-600',
  indigo: 'from-indigo-500 to-indigo-600',
  teal: 'from-teal-500 to-emerald-600',
  amber: 'from-amber-500 to-orange-600',
};
```

---

## Quick Copy-Paste Snippets

### Animated Feature Card
```jsx
<div
  className="animate-fade-in"
  style={{ animationDelay: `${index * 80}ms` }}
>
  <button className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-200 hover:border-transparent hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98]">
    {/* Content */}
  </button>
</div>
```

### Icon with Gradient Background
```jsx
<div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-[1.15] group-hover:rotate-6 transition-all duration-500">
  <svg className="w-8 h-8 text-white">{/* icon */}</svg>
</div>
```

### Loading Skeleton
```jsx
<div className="space-y-3">
  <div className="skeleton h-8 w-3/4 rounded" />
  <div className="skeleton h-4 w-full rounded" />
  <div className="skeleton h-4 w-5/6 rounded" />
</div>
```

---

## Browser Support

All animations tested and working in:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile Safari iOS 14+

Graceful degradation for older browsers with basic transitions.
