---
name: Optometry Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#2156ca'
  primary: '#00328a'
  on-primary: '#ffffff'
  primary-container: '#0047bb'
  on-primary-container: '#afc1ff'
  inverse-primary: '#b3c5ff'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#2f3a4d'
  on-tertiary: '#ffffff'
  tertiary-container: '#465165'
  on-tertiary-container: '#b9c4db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00174a'
  on-primary-fixed-variant: '#003ea6'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The brand personality for this design system is rooted in clinical precision and modern accessibility. It conveys a sense of uncompromising expertise while remaining approachable to patients of all ages. The target audience includes both healthcare professionals seeking efficiency and patients looking for reliable vision care.

The chosen visual style is **Minimalism with a Corporate Modern influence**. By prioritizing extreme clarity and generous whitespace, the interface reflects the core product of optometry: clear vision. High-contrast elements ensure accessibility, while professional medical imagery should be used to anchor the minimalist aesthetic with human warmth and technical authority.

## Colors

The color palette is designed to balance clinical trust with visual focus.

*   **Primary Blue (#0047BB):** Used for headlines, primary actions, and branding elements to evoke a sense of professional medical authority.
*   **Vibrant Yellow (#FFD700):** Reserved for high-energy accents, such as "Book Appointment" buttons, focus states, or critical notifications. It represents clarity and light.
*   **Neutral Slate (#1E293B):** Utilized for body text and secondary icons to maintain high readability.
*   **Surface White (#FFFFFF) & Gray (#F8FAFC):** These form the foundation of the minimalist aesthetic, providing the "breathing room" necessary for a medical environment.

## Typography

This design system utilizes **Inter** across all levels to achieve a neutral, systematic, and highly legible digital feel. 

Headlines use a bold weight and slightly tighter letter spacing to create a strong visual anchor on the page. Body text is set with a generous line height (1.6) to reduce eye strain, reinforcing the optometry theme. Labels and small utility text should use a semibold weight and increased letter spacing to maintain clarity even at small scales.

## Layout & Spacing

The layout follows a **Fixed Grid** model to ensure clinical precision and predictable information architecture. 

A 12-column grid is used for desktop views, centered within a 1280px container. Section vertical spacing is intentionally large (using 'xl' units) to create the "plenty of whitespace" requested. Content blocks should be separated by clear gutters of 24px. Use the 8px base unit for all internal component padding to maintain a consistent rhythmic scale throughout the interface.

## Elevation & Depth

Visual hierarchy is conveyed through **low-contrast outlines** and **tonal layers**. To maintain a minimalist and professional look, avoid heavy or colorful shadows.

Surface depth is achieved by placing cards and containers on top of a light gray background (#F8FAFC) using a crisp 1px border (#E2E8F0). When a shadow is necessary for interactive elements (like a hovering card), use an extra-diffused, low-opacity (5%) neutral shadow to suggest lift without cluttering the clinical aesthetic.

## Shapes

The design system employs **Rounded (level 2)** corners. 

A radius of 0.5rem (8px) is the standard for buttons, input fields, and small components. This provides a balance between the technical "sharpness" of medical equipment and the "softness" required for patient-facing healthcare applications. Larger containers, such as feature cards or imagery frames, should use `rounded-lg` (1rem) to feel distinct and modern.

## Components

*   **Buttons:** Primary buttons use the Primary Blue with white text. The "Book Appointment" or "Emergency" actions use the Vibrant Yellow with dark text to ensure immediate focus. All buttons feature a 0.5rem corner radius.
*   **Input Fields:** Minimalist design with a 1px slate-gray border. On focus, the border transitions to Primary Blue with a subtle 2px glow.
*   **Cards:** Use white backgrounds with 1px light-gray borders. Content inside cards should follow the 'md' spacing unit (24px) for padding.
*   **Chips/Badges:** Small, subtle backgrounds (Primary Blue at 10% opacity) with Primary Blue text, used for categorizing services like "Pediatric" or "Surgical."
*   **Imagery:** Professional medical photography should be framed with the system's `rounded-lg` corners. High-quality macro shots of eyes or clean clinic environments are preferred.
*   **Booking Widget:** A specialized component that uses a calendar interface with Vibrant Yellow used exclusively for "Available" slots, emphasizing the "focus" aspect of the brand.