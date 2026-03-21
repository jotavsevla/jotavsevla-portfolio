# Learnings

## 2026-03-20 — Initial Setup

### Tech Stack
- React 19 + Vite 7 + TypeScript 5.9
- Pure CSS with design tokens in `src/styles/tokens.css`
- Existing CSS: `src/styles/global.css` (671 lines)
- Entry point: `src/main.tsx` (11 lines)
- Main app: `src/App.tsx` (67 lines)

### New Dependencies Being Added
- `@fontsource-variable/jetbrains-mono` — Task 1
- `gsap` + `@gsap/react` — Task 2

### JetBrains Mono
- License: OFL 1.1 (free, no attribution required)
- Import: `import '@fontsource-variable/jetbrains-mono'`
- CSS: `font-family: 'JetBrains Mono Variable', monospace`

### Design Tokens (Task 1)
- `--bg: #0a0a0f`, `--accent: #a855f7`, `--accent-alt: #ec4899`
- Dark mode ONLY — delete `:root[data-theme='light']` block
- Exact token values in plan lines 248-263

### Files to DELETE (Task 6)
- src/sections/DifferentialSection.tsx
- src/components/ThemeToggle.tsx + .test.tsx
- src/hooks/useRevealOnScroll.ts + .test.tsx
- src/hooks/useTheme.ts + .test.tsx

### App.tsx Cleanup (Task 6)
Line refs: imports at 1, 4, 5, 7 — remove. Calls at 22, 25, 45, 54, 60 — remove.

### GSAP Strategy
- Only free plugins: ScrollTrigger (free), NOT SplitText/MorphSVG/DrawSVG
- Use `import { useGSAP } from '@gsap/react'` for proper cleanup
- Character split animation: DOM manipulation (not SplitText)

### i18n Strategy
- No heavy lib — custom context + JSON dicts
- Keys: nested, e.g. `hero.headline`, `nav.projects`
- Provider: wraps App in main.tsx
- Temporary toggle: floating button bottom-right, Task 13 replaces
- profile.ts: keep all exports intact until Wave 2 rewrites sections

### Task 4 & 5 QA Note
Need temporary import in App.tsx for visual QA. Agent must add then remove (Task 13 adds permanently).

## 2026-03-20 — Task 2 Hooks Implemented

- Added `src/hooks/useGsap.ts` with `gsap.registerPlugin(ScrollTrigger, useGSAP)` and shared exports.
- Added `src/hooks/useTextReveal.ts` using manual char-span splitting and GSAP stagger animation.
- Added `src/hooks/useParallax.ts` using `ScrollTrigger` scrub tween with mobile/reduced-motion guards.
- `useTextReveal` now uses `trigger` (`if (trigger === false) return`) to satisfy hook dependency diagnostics.

- CustomCursor component requires dynamic import of GSAP to support concurrent installation in parallel tasks.

- CustomCursor uses CSS pointer media queries alongside JS matchMedia to strictly limit custom cursors to desktop environments.
- ContactSection: Handled complex CTA layouts with glowing buttons using color-mix for the glow effects. Ensure the media queries correctly stack button layouts (.contact__actions) in mobile by retaining display: grid in global.css.

- App.tsx redesign used a custom glassmorphism full-width topbar with mobile drawer
- Integrated existing AnimatedBackground and CustomCursor effectively
- Built an IntroAnimation using useGSAP and sessionStorage to prevent multiple plays on reload. Used a skip button to manually jump tweens to their end states (gsap.getTweensOf(target).forEach(t => t.progress(1)) and gsap.globalTimeline.getChildren().forEach(t => t.progress(1))). Set up custom glitch animation as CSS variables handled by GSAP.
Added EasterEgg component matching task T18.
