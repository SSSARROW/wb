# Design System Document

## 1. Overview & Creative North Star

### The Creative North Star: "Kinetic Brutalism"
This design system is engineered to capture the raw, unyielding energy of high-performance athletics. It moves beyond the static grid, embracing "Kinetic Brutalism"—a philosophy where heavy typography, high-contrast color shifts, and intentional asymmetry simulate the momentum of an athlete in motion. 

We break the "template" look by treating the screen as a high-end editorial spread. We utilize oversized, outlined typography that bleeds off the canvas, overlapping imagery that breaks container boundaries, and a "No-Line" architecture that relies on pure tonal shifts to define space. Every pixel is designed to feel intentional, aggressive, and premium.

---

## 2. Colors

The palette is a high-octane mix of deep obsidian, pure whites, and a signature high-contrast orange (`primary-container: #ff5625`).

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts or ample negative space.
- Transition from `surface` (#131313) to `surface-container` (#1f1f1f) to denote a change in content context.
- Use full-bleed color blocks of `primary-container` (#ff5625) with `on-primary-container` (#541100) text to create high-impact "interrupter" sections that break the vertical scroll.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Layer 0 (Base):** `surface` (#131313).
- **Layer 1 (Cards/Modules):** `surface-container-low` (#1b1b1b).
- **Layer 2 (Elevated Interaction):** `surface-container-high` (#2a2a2a).
Nesting a `surface-container-lowest` (#0e0e0e) card inside a `surface-container-low` section creates a recessed, high-end "machined" look without ever drawing a line.

### The "Glass & Gradient" Rule
To add "soul" to the brutalist aesthetic:
- **Floating Elements:** Use `surface-variant` (#353535) at 60% opacity with a `24px` backdrop blur for navigation bars or floating action menus.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#ffb5a0) to `primary-container` (#ff5625) on main CTAs to provide a metallic, light-catching quality that feels like high-end performance gear.

---

## 3. Typography

The typographic system is the primary driver of the brand's voice: Arrogant, Bold, and Precise.

- **Display (Archivo Black):** Used for "Scream" moments. Use `display-lg` (3.5rem) for hero statements. Apply `-webkit-text-stroke: 1px #FFFFFF` with a transparent fill for overlapping background text to create depth.
- **Headlines (Archivo Black):** High-energy, all-caps. `headline-lg` (2rem) is the standard for section titles like "WHY WE EXIST."
- **Body (Inter):** Clean and functional. Use `body-lg` (1rem) for storytelling. Inter’s neutrality balances the aggression of Archivo Black, ensuring readability remains a priority.
- **Labels (Inter):** Used for technical specs and micro-copy. All-caps with high tracking (letter-spacing: 0.1em) to mimic luxury apparel tagging.

---

## 4. Elevation & Depth

We reject drop shadows in favor of **Tonal Layering**.

### The Layering Principle
Depth is achieved by "stacking" surface tokens. A `surface-container-high` module placed on a `surface-dim` background creates a natural lift. This mimics the way matte black materials interact with light in the physical world.

### Ambient Shadows
When a floating element (like a modal or dropdown) requires true separation, shadows must be:
- **Color:** Tinted with `on-surface` (#e2e2e2) at 4% opacity.
- **Blur:** Large (40px–60px).
- **Logic:** Shadows should feel like ambient occlusion, not a direct light source.

### The "Ghost Border" Fallback
If accessibility requires a border, use a "Ghost Border": the `outline-variant` (#5d4038) at **10% opacity**. This provides a hint of a container without breaking the seamless "No-Line" aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Background `primary-container` (#ff5625), Text `on-primary-container`. Square corners (`0px`). Bold all-caps `label-md` text.
- **Secondary (The Outlined Look):** No background. 2px solid `on-surface` (#e2e2e2). Text `on-surface`.
- **Tertiary:** No background or border. Text `primary-container`. Use for "View All" or low-priority actions.

### Product Cards
- **Structure:** `surface-container-lowest` (#0e0e0e) background.
- **Imagery:** Large, high-contrast photography. Images should have a subtle 5% black overlay to ensure white text remains legible.
- **Constraint:** No dividers. Use `Spacing-8` (2.75rem) to separate the product title from the price.

### Minimalist Navigation
- **Style:** `surface` at 80% opacity with backdrop blur.
- **Layout:** Centered links in `label-sm`. No background container for the nav bar; it should feel like it's floating over the content.

### Input Fields
- **State:** Underline-only (bottom border 2px) using `outline-variant`.
- **Focus:** Transition underline color to `primary-container`. No "box" around the input.

---

## 6. Do's and Don'ts

### Do:
- **DO** use `Spacing-20` (7rem) and `Spacing-24` (8.5rem) for vertical section gaps. Embrace the "empty" space.
- **DO** overlap elements. Let a heading bleed over a photo to create a layered, editorial feel.
- **DO** use Archivo Black for any text that is meant to be an "attitude" statement.

### Don't:
- **DON'T** use rounded corners. Every component must have a `0px` radius to maintain the aggressive, structural look.
- **DON'T** use standard grey (#CCCCCC). Use the surface-container tiers to find the right level of dark-grey/black.
- **DON'T** use 1px dividers between list items. Use background color shifts or spacing to define the list item boundaries.
- **DON'T** use animations that feel "bouncy." All transitions should be linear or high-speed "eases" (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`) to reflect athletic precision.