# Editorial Elegance: Design System Guidelines

## 1. Overview & Creative North Star
### The Creative North Star: "The Luminous Atelier"
This design system is not a standard e-commerce framework; it is a digital gallery. We treat every screen as a high-end editorial spread. The goal is to evoke the feeling of a sun-drenched, minimalist boutique where products are curated, not just listed. 

To achieve this, we break the "template" look through **Intentional Asymmetry**. Instead of rigid, centered grids, we use staggered imagery and overlapping typography to create a sense of movement and "planned" spontaneity. High-contrast typography scales—pairing dramatic serifs with ultra-clean sans-serifs—convey an authoritative yet inviting luxury.

---

## 2. Colors & Tonal Depth
Our palette is rooted in warmth and light. We move away from flat UI by using a sophisticated layering of tints and tones.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off content. Boundaries must be defined solely through:
- **Background Color Shifts:** Use `surface-container-low` sections against a `surface` background.
- **Tonal Transitions:** Use soft, bleed-edge transitions rather than hard stops.
- **Negative Space:** Use the `24` (8.5rem) spacing token to separate editorial thoughts.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine vellum paper. 
- **Base:** `surface` (#f8f9ff / Soft Beige base).
- **Layering:** Use `surface_container_lowest` for cards to create a "lifted" look and `surface_container_highest` for immersive background sections.
- **The "Glass & Gradient" Rule:** To add visual "soul," use subtle gradients on primary CTAs (`primary` to `primary_container`). For floating navigation or modals, apply **Glassmorphism**: use `surface` with 70% opacity and a `backdrop-filter: blur(20px)` to let product photography bleed through.

---

## 3. Typography
Typography is our primary brand vehicle. It must feel like a masthead for a premium magazine.

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Noto Serif | 3.5rem | High-drama, airy tracking. |
| **Headline** | `headline-lg` | Noto Serif | 2.0rem | Elegant, used for storytelling. |
| **Title** | `title-lg` | Manrope | 1.375rem | Functional, clean, modern. |
| **Body** | `body-lg` | Manrope | 1.0rem | Readable, generous line-height. |
| **Label** | `label-md` | Manrope | 0.75rem | All-caps, wide tracking (0.1rem). |

**Guideline:** Always pair a `display-lg` headline with a `body-md` sub-description. The contrast in scale is what creates the "Luxury" feel.

---

## 4. Elevation & Depth
We eschew traditional material shadows for **Ambient Tonal Layering**.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a soft, natural lift without a single drop shadow.
- **Ambient Shadows:** If a floating element (like a "Quick Buy" button) requires a shadow, use: `box-shadow: 0 20px 40px rgba(31, 41, 55, 0.04)`. It should be barely perceptible, mimicking natural studio lighting.
- **The "Ghost Border" Fallback:** If a container needs definition against a busy image, use the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons (The "Jewelry" of the UI)
- **Primary:** Background `primary_container` (#D4AF37 Gold), Text `on_primary_container`. No border. Apply a subtle 2px corner radius (`sm`).
- **Secondary:** Transparent background with a "Ghost Border" (15% `outline`). Text `primary`.
- **Interaction:** On hover, the Gold should transition slightly toward `primary_fixed_dim` with a slow 300ms ease.

### Cards & Product Grids
- **Forbid Dividers:** Do not use lines between items. Use `spacing-8` (2.75rem) to let the "white space" act as the separator.
- **Asymmetric Grid:** In a product list, offset every second image by `spacing-4` vertically to break the "standard e-commerce" monotony.

### Input Fields
- **Styling:** Use a "Bottom Line Only" approach or a very soft `surface_container_high` background. 
- **Focus State:** Transition the bottom border to `primary` (Gold). Helper text should always be in `label-sm`.

### Glass Navigation
- **Floating Header:** Use a semi-transparent `surface` with `backdrop-blur`. This ensures the UI feels "airy" even when the user scrolls through rich product photography.

---

## 6. Do's and Don'ts

### Do:
- **Do** use the `24` spacing token for hero section margins to create "breathing room."
- **Do** use `on_surface_variant` for secondary text to maintain a soft contrast ratio that is easy on the eyes.
- **Do** crop product photography with an "Editorial Eye"—use off-center compositions.

### Don't:
- **Don't** use pure black (#000000). Always use `on_surface` (#121c2a) for depth.
- **Don't** use standard 4-column grids. Experiment with 2-column or 3-column layouts with varied widths (e.g., 60/40 splits).
- **Don't** use heavy "Drop Shadows." If the UI looks "heavy," increase the spacing and decrease the shadow opacity.

---

## 7. Accessibility & Motion
While we prioritize aesthetics, the `on_background` text on `background` must maintain a 4.5:1 contrast ratio. 

**Motion Note:** All transitions should feel "liquid." Use `cubic-bezier(0.2, 0.8, 0.2, 1)` for all transforms. Elements should not just "appear"; they should gently drift into place, echoing the soft, airy nature of the brand.