```markdown
# Design System: The Cinematic Epicurean

### 1. Overview & Creative North Star
**Creative North Star: "The Digital Maître d'"**
This design system rejects the "template-heavy" nature of modern food apps in favor of high-end editorial storytelling. It is designed to feel like a private invitation—dark, moody, and intentionally spaced. We move beyond the grid by using **dynamic asymmetry**: large-scale typography that breaks container boundaries and photography that bleeds into the edges of the screen. The goal is to evoke the hushed, candle-lit atmosphere of a Michelin-star dining room where every detail is deliberate and nothing is rushed.

---

### 2. Colors & Tonal Depth
The palette is rooted in the depth of vintage wine and the glow of brushed metallics. We utilize a "Dark Mode by Default" philosophy to ensure food photography pops with hyper-realistic vibrancy.

*   **Primary (Burgundy - `#ffb2b8` / `#4b0f1a`):** Used sparingly for high-intent actions and brand moments.
*   **Secondary (Gold - `#e9c349`):** Our "Light Source." Used for interactive elements, refined accents, and subtle dividers.
*   **Surface (Deep Onyx - `#131313`):** The foundational canvas.

**The "No-Line" Rule**
Standard 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through **Surface Hierarchy**. Use `surface-container-low` (#1c1b1b) for the main body and `surface-container-high` (#2a2a2a) for elevated elements like reservation cards.

**The Glass & Gradient Rule**
To prevent the UI from feeling "flat," use Glassmorphism for floating navigation bars or hover states. Apply `surface-variant` with a 60% opacity and a `20px` backdrop-blur. For primary CTAs, apply a subtle linear gradient from `primary` (#ffb2b8) to `primary_container` (#4b0f1a) at a 135-degree angle to simulate the sheen of silk.

---

### 3. Typography: The Editorial Voice
Our typography pairing balances the tradition of fine dining with the precision of modern service.

*   **The Hero (Noto Serif):** Used for all `display` and `headline` tiers. This font should be treated as an art piece. Increase letter-spacing slightly (0.02em) for `display-lg` to create an air of "quiet luxury."
*   **The Service (Manrope):** Used for `body` and `label` tiers. This sans-serif provides high legibility for menus and descriptions. 
*   **Hierarchy Note:** Use `display-lg` (3.5rem) for section titles (e.g., "The Autumn Tasting") but keep the supporting `body-md` (0.875rem) small and centered with wide margins (use Spacing `16` or `20`) to create a "Gallery" effect.

---

### 4. Elevation & Depth
We eschew traditional drop shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is created by stacking. A card in `surface_container_highest` (#353534) sitting on a `surface` (#131313) background provides enough contrast to imply elevation without a single line of CSS shadow.
*   **Ambient Shadows:** If a floating element (like a Booking Modal) requires a shadow, use a "Burgundy Tinted Shadow." 
    *   *Spec:* `0px 20px 40px rgba(75, 15, 26, 0.15)`. This creates a warm, atmospheric glow rather than a cold grey blur.
*   **The "Ghost Border":** For buttons or input fields, use the `outline_variant` (#534344) at **20% opacity**. This creates a whisper of a boundary that guides the eye without cluttering the canvas.

---

### 5. Components

#### Buttons
*   **Primary:** Solid `primary` (#ffb2b8) with `on_primary` (#591a24) text. Hard 0px corners. Use `Spacing 4` for horizontal padding and `Spacing 2` for vertical.
*   **Secondary:** Ghost style. `secondary` (#e9c349) text with a `secondary` ghost border (20% opacity). 
*   **Interaction:** On hover, the background should transition to a 10% opacity gold tint.

#### Cards & Menus
*   **Rule:** Forbid divider lines between menu items. 
*   **Implementation:** Separate the "Wagyu Ribeye" from the "Duck Confit" using a `Spacing 6` (2rem) vertical gap. 
*   **Imagery:** All cards must use `0px` border-radius. Photos should be treated as the "hero," often occupying 60% of the card's real estate.

#### Input Fields
*   **Style:** Minimalist underline style using the `outline` (#a18c8d) token. 
*   **State:** When focused, the underline transitions to `secondary` (Gold) and the label (Manrope `label-sm`) shifts upwards with a 0.2s ease-in-out.

#### Subtle Gold Dividers
*   While 1px borders are banned for *containers*, decorative 1px lines are permitted using the `secondary` (#e9c349) token, but only if they are **horizontally centered and restricted to 40% width** to act as a visual "pause" between courses or sections.

---

### 6. Do's and Don'ts

**Do:**
*   **Use Massive Whitespace:** If you think there is enough space, double it. Use `Spacing 20` (7rem) between major sections.
*   **Focus on the "Plate":** Use `surface-container-lowest` (#0e0e0e) for full-screen image backgrounds to make food colors (greens, reds, oranges) look electric.
*   **Asymmetric Layouts:** Place text on the left at `Spacing 10` and the image on the right, slightly overlapping the text container.

**Don't:**
*   **No Rounded Corners:** `0px` is the absolute rule. Roundness communicates "friendly/approachable," while sharp edges communicate "precision/prestige."
*   **No Pure White:** Never use #FFFFFF. Use `tertiary_fixed` (#e8e1da) or `on_surface` (#e5e2e1) for a softer, creamier "fine paper" feel.
*   **No Standard Icons:** Avoid generic filled icons. Use ultra-thin (1pt) stroke icons that match the `secondary` Gold color.