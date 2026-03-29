```markdown
# Design System Strategy: The Cinematic Gallery

## 1. Overview & Creative North Star: "The Obsidian Stage"
This design system is not a utility; it is an exhibition. Our Creative North Star is **"The Obsidian Stage"**—a concept where the interface recedes into a deep, atmospheric void to let the automotive subject matter command the spotlight. 

To break the "template" look, we move away from centered, predictable grids. We utilize **intentional asymmetry**, where text elements might be pushed to the extreme edges of the viewport, and **high-contrast typography scales** that treat letters as architectural elements. By overlapping serif display type across high-resolution imagery, we create a sense of depth and editorial sophistication that feels more like a premium coffee-table book than a standard website.

---

## 2. Color & Tonal Depth
The palette is rooted in a monochromatic spectrum of "Matte Black" and "Metallic Gray," punctuated by a surgical use of "Red Accent."

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To define boundaries, use color blocking and background shifts. A section using `surface-container-low` (#1C1B1B) sitting atop a `surface` (#131313) background creates a sophisticated, tactile transition that 1px lines cannot replicate.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Base Layer:** `surface-container-lowest` (#0E0E0E) for the deepest background immersion.
- **Content Cards:** Use `surface-container-high` (#2A2A2A) to make technical specs or car details "float" forward.
- **Nesting:** Place a `surface-container-highest` (#353534) element inside a `surface-container-low` section to draw the eye to specific CTAs without using high-contrast borders.

### The "Glass & Gradient" Rule
To add "soul" to the matte environment, utilize Glassmorphism. For floating navigation or over-image overlays, use `surface` at 60% opacity with a `20px` backdrop-blur. 
- **Signature Texture:** Apply a subtle linear gradient from `primary` (#FFB4AB) to `primary-container` (#2F0001) for primary action states to mimic the light reflection on polished automotive paint.

---

## 3. Typography: Editorial Authority
The typographic pairing is a tension between the heritage of the Serif and the precision of the Sans-Serif.

*   **Display & Headlines (Noto Serif):** These are your "Hero" elements. Use `display-lg` (3.5rem) with tight letter-spacing for car model names. The serif font conveys luxury, history, and craftsmanship.
*   **Body & Titles (Inter):** The "Engineer’s" font. Use `body-md` (0.875rem) for technical specifications. The clean, neutral Swiss style of Inter suggests modern performance and clarity.
*   **Visual Hierarchy:** Always maintain a minimum 3:1 ratio between headline and body size to ensure a cinematic "High/Low" contrast.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-like" for this system. We use **Tonal Layering**.

*   **The Layering Principle:** Achieve lift by placing a `surface-bright` (#393939) card on a `surface-dim` (#131313) background. The shift in value provides all the affordance necessary for a premium user.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a 60px blur at 8% opacity using the `on-background` color as a tint. This mimics natural light falling in a showroom.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Sharpness:** All corners are set to `0px` (Sharp). Rounded corners soften the "aggressive" and "sleek" nature of luxury car design; we embrace the hard edge.

---

## 5. Components

### Buttons
*   **Primary:** Solid `inverse-primary` (#B91C1C) with `on-primary` text. Sharp corners. Subtle 10% white inner-glow on hover to simulate "metallic" reflection.
*   **Secondary:** Ghost style. No background, `outline-variant` ghost border (20% opacity), white text.
*   **Tertiary:** All-caps `label-md` text with a 1px underline that expands on hover.

### Input Fields
*   **Styling:** No background. A single bottom-border using `outline-variant`. Focus state shifts the border color to `primary` (#FFB4AB) and animates the label upward using `notoSerif`.

### Cards & Lists
*   **The "No-Divider" Rule:** Never use lines to separate car specs or list items. Use **Spacing Scale 8** (2.75rem) to create clear "islands" of information, or alternate backgrounds between `surface-container-low` and `surface-container-high`.

### Additional Component: The "Spec Overlay"
A semi-transparent `surface-container-lowest` (#0E0E0E at 70% opacity) panel with `backdrop-blur: 12px`. Used to overlay technical data directly onto car photography without obscuring the vehicle's silhouette.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Void:** Use `surface-container-lowest` for large areas to create a sense of infinite space.
*   **Crop Aggressively:** Use imagery that crops the car intentionally (e.g., just a headlight or a wheel rim) to create mystery.
*   **Asymmetric Layouts:** Place text in the top-left and the CTA in the bottom-right to force the eye to travel across the imagery.

### Don’t:
*   **Don’t use "Pure" White for Body Text:** Use `on-surface-variant` (#C4C7C7) for long-form text to reduce eye strain against the matte black background. Save `FFFFFF` for headlines.
*   **Don’t use 1px Borders:** It breaks the "Cinematic" immersion. If you feel you need a line, use a 40px vertical space instead.
*   **Don’t use Standard Easing:** All transitions should be "Slow In, Fast Out" (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`) to mimic the acceleration of a high-performance vehicle.```