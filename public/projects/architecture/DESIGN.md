# Design System Document: Editorial Dark Mode

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Curator."** 

This system moves beyond the standard "dark mode" template to create a high-end, editorial experience that feels like a premium physical monograph. It rejects the "boxy" nature of traditional web design in favor of **Intentional Asymmetry** and **Tonal Depth**. By utilizing high-contrast typography and a sophisticated layering of dark surfaces, the interface directs the eye through negative space rather than structural lines. The goal is to make every page feel like a custom-composed layout, where content breathes and "luxury" is defined by what is left out.

---

## 2. Colors & Surface Logic
The palette is rooted in deep obsidian tones (`surface: #131313`) punctuated by a high-energy "Electric Amber" (`primary_container: #FFC107`). 

### The "No-Line" Rule
To maintain a high-end aesthetic, **1px solid borders are prohibited for sectioning.** Conventional dividers create visual noise that cheapens the experience. Instead, boundaries must be defined solely through:
- **Background Shifting:** Moving from `surface` to `surface_container_low`.
- **Negative Space:** Using the `24` (6rem) or `20` (5rem) spacing tokens to create clear mental models of separation.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create organic depth:
- **Base Layer:** `surface` (#131313).
- **Secondary Sections:** `surface_container_low` (#1C1B1B).
- **Interactive/Elevated Elements:** `surface_container_high` (#2A2A2A).
- **Floating Overlays:** `surface_bright` (#393939) with a 60% opacity and 12px backdrop-blur.

### Signature Textures
Main CTAs and Hero accents should utilize a subtle "Soul Gradient." Instead of flat `#FFC107`, use a linear gradient from `primary_fixed` to `primary_container` (135deg). This adds a microscopic level of polish that mimics the way light hits a physical surface.

---

## 3. Typography: The Editorial Voice
The system pairs the technical precision of **Inter** with the geometric character of **Space Grotesk** (serving as the elevated evolution of the source's Outfit).

- **Display & Headlines (Space Grotesk):** These are the "hooks." Use `display-lg` (3.5rem) with `-0.04em` letter-spacing for a tight, aggressive editorial feel. Titles should often be placed asymmetrically to break the vertical grid.
- **Body & Labels (Inter):** Inter provides the functional "truth." Use `body-lg` (1rem) for standard reading. For a premium feel, increase the line-height of body text to 1.6x the font size.
- **Visual Hierarchy:** Utilize the contrast between `on_surface` (White) and `on_surface_variant` (Warm Grey) to create a clear "read first / read second" flow without changing font sizes.

---

## 4. Elevation & Depth
In this system, "Elevation" is a state of light, not just a shadow.

- **The Layering Principle:** Achieve lift by stacking tokens. A `surface_container_highest` card sitting on a `surface` background provides enough contrast to be "raised" without any shadow at all.
- **Ambient Shadows:** Shadows are reserved for floating elements (menus, tooltips). Use an ultra-diffused shadow: `offset: 0 20px, blur: 40px, color: rgba(0, 0, 0, 0.4)`. 
- **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` (#4F4632) at 15% opacity. It should be felt, not seen.
- **Glassmorphism:** Apply a "Frosted Obsidian" effect to navigation bars. Use `surface_container` at 70% opacity with a `backdrop-filter: blur(20px)`. This grounds the UI in a 3D space.

---

## 5. Components

### Buttons
- **Primary:** `primary_container` (#FFC107) background with `on_primary` (#3F2E00) text. Use `xl` (0.75rem) roundedness. 
- **Secondary:** Transparent background with a `Ghost Border`. Text in `primary`.
- **Interaction:** On hover, a Primary button should "glow"—add a soft amber shadow (`primary` at 20% opacity).

### Cards & Lists
- **Rule:** **No Divider Lines.** 
- **Execution:** Use a `surface_container_low` background for the card. Separate list items using the `4` (1rem) spacing token. 
- **Typography as Structure:** Use `label-sm` in `primary` color as a "category" tag above headlines to create structure without boxes.

### Input Fields
- **Base State:** `surface_container_highest` background. No border.
- **Focus State:** A 1px "Ghost Border" at 40% opacity and a subtle `primary` glow.
- **Typography:** Labels use `label-md` in `on_surface_variant`.

### Signature Component: The "Floating Nav"
Instead of a full-width header, use a centered, "pill-shaped" navigation bar with `full` roundedness, using the Glassmorphism rules mentioned above. This reinforces the "Curator" aesthetic.

---

## 6. Do's and Don'ts

### Do:
- **Use "White Space" as a Tool:** If a section feels crowded, don't add a border; add 32px of vertical padding.
- **Leverage Asymmetry:** Place a `display-lg` headline on the left and the `body-lg` copy on the right-hand columns only.
- **Tonal Transitions:** Use `surface_container_lowest` for deep-background sections to make content "pop" forward.

### Don't:
- **Don't use 100% Black:** Never use `#000000`. Use `surface` (#131313) to allow for subtle depth and shadows.
- **Don't use Standard Shadows:** Avoid the "drop shadow" look. If it looks like a default CSS shadow, it is too dark and too sharp.
- **Don't Over-Color:** Reserve the `primary` (#FFC107) for 5% of the screen real estate. It is a scalpel, not a bucket of paint.
- **Don't Center Everything:** Editorial design lives in the tension of the grid. Avoid centering large blocks of text; keep them left-aligned for a professional, Swiss-style look.