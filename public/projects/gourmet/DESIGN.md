# Design System Document: The Kinetic Singularity

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Singularity."** This is a vision of high-precision digital architecture where data isn't just displayed—it radiates. We are moving away from the friendly, rounded "SaaS" aesthetic toward a high-end, technical editorial look that feels like a redacted intelligence terminal from the near future.

To break the "template" look, we rely on **Extreme Angularity**. By enforcing a strict 0px radius across the entire system, we create a sense of uncompromising precision. Visual interest is generated not through shapes, but through the tension between deep ultraviolet voids (`background`) and hyper-bright "light-leak" accents (`secondary`). We use intentional asymmetry—such as oversized display type paired with microscopic technical labels—to create a layout that feels curated rather than generated.

## 2. Colors
Our palette is a high-contrast study in "Deep Space vs. Neural Light."

*   **Primary (Ultraviolet):** Use `primary` (#cbbeff) and `primary_container` (#5d00ff) to represent the "neural" energy. This is the core of our brand identity.
*   **Secondary (Cyan):** `secondary` (#d3fbff) and its variants are reserved for high-action states, data highlights, and "active" signals.
*   **Surface Hierarchy:** We utilize a "Void-to-Light" layering system.
    *   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, use background shifts. For example, a `surface_container_low` (#1b1b20) card should sit on a `surface` (#131318) background. The change in tonal depth is the divider.
    *   **The "Glass & Gradient" Rule:** To achieve a premium "Cyber-Core" feel, floating elements should use glassmorphism: a combination of `surface_container_highest` at 60% opacity with a `backdrop-filter: blur(20px)`.
    *   **Signature Textures:** Use subtle linear gradients for CTAs, transitioning from `primary_container` (#5d00ff) to `inverse_primary` (#6425ff) at a 45-degree angle. This adds "soul" to the otherwise flat, dark UI.

## 3. Typography
We use **Space Grotesk** exclusively. It is a font that bridges the gap between a technical monospaced typeface and a high-fashion sans-serif.

*   **Editorial Scaling:** We use massive contrast in sizing. 
    *   Use `display-lg` (3.5rem) for hero statements and key data metrics.
    *   Pair this with `label-sm` (0.6875rem) with an increased letter-spacing (0.05rem) for metadata and technical annotations.
*   **The Technical Edge:** Headlines (`headline-lg`) should always be set with a tighter line-height to feel like "blocks" of data, while body text (`body-md`) requires more breathing room to ensure legibility against the dark background.

## 4. Elevation & Depth
In this system, depth is not simulated by physical shadows, but by **Tonal Layering** and **Atmospheric Glow**.

*   **The Layering Principle:** Stacking should follow a logical progression of "Radiance." The "deeper" an element is in the background, the darker the surface. The more "active" or "closer" to the user, the higher the container tier (e.g., `surface_container_highest`).
*   **Ambient Glows (Not Shadows):** Traditional drop shadows are forbidden. Instead, for floating elements, use a "Glow Halo." This is a box-shadow with a large blur (40px+) using a very low opacity (5-10%) of the `primary` or `secondary` color. This mimics the way neon light bleeds into a dark room.
*   **The "Ghost Border" Fallback:** If a container absolutely requires a boundary for accessibility, use a "Ghost Border": the `outline_variant` (#484457) at 20% opacity. It should feel like a faint laser line, not a physical stroke.
*   **Glassmorphism:** Use `surface_variant` with 40% opacity and a heavy background blur to create "neural lenses" that allow background patterns to bleed through.

## 5. Components

### Buttons
*   **Primary:** Sharp 0px corners. Background is `primary_container`. Text is `on_primary_container`. On hover, add a 1px `secondary` ghost-border.
*   **Secondary:** No fill. `outline` color for the text and a 1px `outline_variant` border at 50% opacity.
*   **Tertiary:** Text only in `secondary`. Underline only on hover.

### Chips
*   **Visual Style:** Small, rectangular, 0px radius. Use `surface_container_high` for the background.
*   **States:** For active states, the chip background should glow with `primary` at 20% opacity and `primary` text.

### Input Fields
*   **Base:** A bottom-border only (2px `outline_variant`). No box.
*   **Focus:** The bottom border transitions to `secondary` (Cyan) with a subtle `secondary` glow underneath the input field.
*   **Labels:** Always use `label-md` floating above the input in `on_surface_variant`.

### Cards & Lists
*   **Rule:** No dividers. 
*   **Implementation:** Separate list items using `spacing.4` (0.9rem) of vertical space. For cards, use `surface_container_low` against the `surface` background.
*   **Interactivity:** On hover, a card should shift from `surface_container_low` to `surface_container_high` and display a faint `primary` glow.

### Additional Component: The "Neural Hub"
*   A bespoke component for this system: A glassmorphic container displaying live data or navigation, featuring an SVG "neural" background pattern in `on_surface` at 3% opacity. It should feel like the "brain" of the interface.

## 6. Do's and Don'ts

### Do:
*   **DO** embrace the void. Large areas of `background` (#131318) are necessary to make the neon accents pop.
*   **DO** use 0px corners on every single element—buttons, inputs, cards, and images. Consistency is what makes it feel premium.
*   **DO** use `spacing.20` and `spacing.24` for section margins to create an editorial, spacious feel.

### Don't:
*   **DON'T** use 1px solid white or high-contrast borders. It breaks the "Kinetic" atmospheric feel.
*   **DON'T** use standard "Material" blue or "Bootstrap" rounded corners.
*   **DON'T** use grey shadows. If an element needs to lift, it should glow with the color of the light it would realistically emit (Ultraviolet or Cyan).
*   **DON'T** clutter the UI. If a piece of information isn't vital, use a lower-contrast text color like `on_surface_variant` to deprioritize it.