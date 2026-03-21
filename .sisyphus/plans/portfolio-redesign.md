# Portfolio Redesign — Awwwards-Level Immersive Experience

## TL;DR

> **Quick Summary**: Redesign completo do portfólio pessoal de João Victor Araújo, transformando de um layout informativo tradicional para uma experiência imersiva dark-only nível Awwwards, com GSAP animations, JetBrains Mono como fonte protagonista, paleta purple/magenta, terminal interativo, animação de intro, easter egg, custom cursor, glitch effects, parallax, e suporte bilíngue PT/EN.
> 
> **Deliverables**:
> - Novo design system dark-only com paleta purple/magenta
> - JetBrains Mono como fonte principal (via @fontsource-variable)
> - GSAP animation engine com typing, parallax, glitch, smooth scroll
> - Custom cursor contextual
> - Animação de loading/intro cinematográfica
> - Terminal interativo navegável por comandos
> - Easter egg escondido
> - Sistema i18n PT/EN com toggle
> - Experiência imersiva fullscreen por seção
> - Seções: Intro → Hero → Projects → Skills → Experience → Education → Contact
> - Remoção da seção Differential/gaming
> - Remoção do light mode
> 
> **Estimated Effort**: XL
> **Parallel Execution**: YES — 6 waves
> **Critical Path**: Task 1 (design tokens) → Task 2 (GSAP setup) → Task 6 (i18n) → Task 8 (Hero) → Task 13 (smooth scroll) → Task 16 (intro animation) → Final Verification

---

## Context

### Original Request
Usuário quer melhorar o portfólio, trocar a fonte para JetBrains Mono (confirmado: licença OFL 1.1, livre para uso), e fazer "algo realmente bom" — que evoluiu para um redesign completo nível Awwwards.

### Interview Summary
**Key Discussions**:
- **Vibe**: Criativo e Ousado — nível Awwwards winners, layout não-convencional
- **Escopo**: Redesign completo — manter só React 19 + Vite + TS e dados
- **Público**: Comunidade dev — personalidade e skills acima de tudo
- **Tema**: Dark mode only (remover light mode) — liberdade criativa total
- **Animações**: GSAP como engine principal
- **Estrutura**: Experiência imersiva — cada seção = experiência fullscreen
- **Paleta**: Purple/Magenta sobre fundo escuro profundo
- **Efeitos**: TODOS selecionados — typing, parallax, backgrounds animados, hover effects, custom cursor, smooth scroll, glitch/distortion
- **Extras**: Intro animation, terminal interativo, easter egg
- **i18n**: PT + EN com toggle
- **Gaming section**: Remover
- **GitHub API**: Manter integração existente
- **Testes**: Sem unit tests, QA via Playwright + agent verification

### Research Findings
- **JetBrains Mono**: OFL 1.1, livre para uso. Melhor via `@fontsource-variable/jetbrains-mono` (1 import, pesos 100-800)
- **Codebase atual**: Bem arquitetada — React 19, Vite 7, TS 5.9, CSS puro com tokens, hooks customizados, GitHub API com cache
- **Arquivos-chave a preservar**: `src/data/profile.ts`, `src/hooks/useGithubProjects.ts`, `src/lib/cache.ts`, `src/lib/github.ts`, `src/types/github.ts`
- **GSAP**: Industry standard, precisa de `gsap` + `@gsap/react` + ScrollTrigger plugin

### Gap Analysis (Self-conducted — Metis timeout)
**Identified Gaps** (addressed):
- **Performance budget**: GSAP + partículas + parallax pode ser pesado → Guardrail: manter 60fps, lazy-load animações, `will-change` consciente
- **Acessibilidade**: Animações intensas podem causar problemas → Respeitar `prefers-reduced-motion`
- **Mobile experience**: Custom cursor e parallax não funcionam bem em mobile → Fallbacks responsivos
- **GSAP licensing**: GSAP core é free, ScrollTrigger é free, plugins premium (MorphSVG, etc) são pagos → Usar apenas core + free plugins
- **Terminal commands**: Precisa definir quais comandos o terminal aceita → Definido nos tasks
- **i18n approach**: Sem lib pesada (react-intl, i18next) — dicionário simples em JSON é suficiente para 2 idiomas com conteúdo estático

---

## Work Objectives

### Core Objective
Transformar o portfólio de João Victor Araújo de um layout informativo tradicional para uma experiência imersiva dark-only nível Awwwards, com animações GSAP profissionais, identidade visual forte (JetBrains Mono + purple/magenta), e features interativas únicas (terminal, intro, easter egg).

### Concrete Deliverables
- Novo `src/styles/tokens.css` — design system dark-only, paleta purple/magenta
- Novo `src/styles/global.css` — tipografia JetBrains Mono, layout imersivo fullscreen
- GSAP integrado com ScrollTrigger, SplitText-like effects
- Custom cursor component
- Intro/loading animation component
- Terminal interativo component
- Easter egg feature
- Sistema i18n com dicionários PT/EN
- Todas as seções redesenhadas (Hero, Projects, Skills, Experience, Education, Contact)
- Remoção de: DifferentialSection, ThemeToggle, useTheme, light mode tokens
- Background animado (partículas/grid/formas geométricas)

### Definition of Done
- [ ] Site carrega com intro animation cinematográfica
- [ ] Todas as seções têm animações GSAP de entrada
- [ ] Terminal interativo funciona com pelo menos 6 comandos
- [ ] Custom cursor muda de contexto em links, botões, e seções
- [ ] Easter egg é descobrível mas não óbvio
- [ ] Toggle PT/EN funciona em todas as seções
- [ ] Performance: Lighthouse Performance ≥ 80 em mobile
- [ ] `prefers-reduced-motion` desativa animações pesadas
- [ ] Responsivo: funciona em 320px–2560px
- [ ] `npm run build` sem erros

### Must Have
- JetBrains Mono como fonte única (remover Space Grotesk)
- Dark mode only — zero referência a light mode
- GSAP para todas as animações
- Smooth scroll entre seções com transições
- Purple/magenta como cor de acento principal
- i18n PT/EN funcional
- Intro animation na primeira visita
- Terminal interativo
- Custom cursor (desktop only)
- Responsivo mobile-first
- `prefers-reduced-motion` respeitado

### Must NOT Have (Guardrails)
- ❌ Light mode ou qualquer referência a tema claro
- ❌ Space Grotesk ou qualquer fonte além de JetBrains Mono
- ❌ Seção Differential/gaming
- ❌ Plugins GSAP premium/pagos (MorphSVG, DrawSVG, SplitText oficial) — usar alternativas free
- ❌ Autoplay de som/música
- ❌ Animações que não respeitam `prefers-reduced-motion`
- ❌ Custom cursor em dispositivos touch/mobile
- ❌ Dependências pesadas de i18n (react-intl, i18next) — dicionário simples
- ❌ Three.js / WebGL (overkill para o escopo, impacto pesado em performance)
- ❌ Comentários excessivos estilo "AI slop" no código
- ❌ Over-abstraction prematura — components simples e diretos
- ❌ `as any`, `@ts-ignore`, console.log em produção

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Vitest + Playwright)
- **Automated tests**: NO (redesign visual, QA via Playwright)
- **Framework**: Playwright for visual QA
- **Agent-Executed QA**: ALWAYS — Playwright screenshots, curl for build, visual checks

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **Build verification**: Use Bash — `npm run build`, check for errors
- **Animation verification**: Use Playwright — wait for animation, screenshot frames
- **Responsiveness**: Use Playwright — set viewport sizes, screenshot

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — design system + infrastructure):
├── Task 1: Design tokens + JetBrains Mono setup [quick]
├── Task 2: GSAP installation + base hooks [quick]
├── Task 3: i18n system (dictionaries + hook + context) [unspecified-high]
├── Task 4: Custom cursor component [visual-engineering]
├── Task 5: Animated background component [visual-engineering]
└── Task 6: Remove dead code (Differential, ThemeToggle, light mode) [quick]

Wave 2 (Core sections — MAX PARALLEL):
├── Task 7: Hero section redesign (depends: 1, 2, 3) [visual-engineering]
├── Task 8: Projects section redesign (depends: 1, 2, 3) [visual-engineering]
├── Task 9: Skills section redesign (depends: 1, 2, 3) [visual-engineering]
├── Task 10: Experience section redesign (depends: 1, 2, 3) [visual-engineering]
├── Task 11: Education section redesign (depends: 1, 2, 3) [visual-engineering]
└── Task 12: Contact section redesign (depends: 1, 2, 3) [visual-engineering]

Wave 3 (Navigation + Layout):
├── Task 13: App shell + navigation redesign (depends: 1, 2, 3) [visual-engineering]
├── Task 14: Smooth scroll + section transitions with GSAP (depends: 2, 7-12) [deep]
└── Task 15: Footer redesign (depends: 1, 3) [quick]

Wave 4 (Premium features):
├── Task 16: Intro/loading animation (depends: 2, 13) [visual-engineering]
├── Task 17: Interactive terminal (depends: 1, 2, 3) [deep]
├── Task 18: Easter egg (depends: 2) [artistry]
└── Task 19: Glitch/distortion effects (depends: 2) [visual-engineering]

Wave 5 (Polish + Integration):
├── Task 20: Responsive polish + mobile fallbacks (depends: all prev) [visual-engineering]
└── Task 21: prefers-reduced-motion + accessibility (depends: all prev) [unspecified-high]

Wave 6 (Final build verification — after Wave 5):
└── Task 22: Performance optimization + build verification (depends: 20, 21) [deep]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: T1 → T2 → T7 → T14 → T16 → T20 → T22 → F1-F4 → user okay
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 6 (Waves 1 & 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 4, 5, 7-15, 17, 20 | 1 |
| 2 | — | 4, 5, 7-14, 16-19, 20 | 1 |
| 3 | — | 7-13, 15, 17 | 1 |
| 4 | — | 20 | 1 |
| 5 | — | 13, 20 | 1 |
| 6 | — | — | 1 |
| 7 | 1, 2, 3 | 14 | 2 |
| 8 | 1, 2, 3 | 14 | 2 |
| 9 | 1, 2, 3 | 14 | 2 |
| 10 | 1, 2, 3 | 14 | 2 |
| 11 | 1, 2, 3 | 14 | 2 |
| 12 | 1, 2, 3 | 14 | 2 |
| 13 | 1, 2, 3, 5 | 16 | 3 |
| 14 | 2, 7-12 | 16, 20 | 3 |
| 15 | 1, 3 | 20 | 3 |
| 16 | 2, 13 | 20 | 4 |
| 17 | 1, 2, 3 | 20 | 4 |
| 18 | 2 | 20 | 4 |
| 19 | 2 | 20 | 4 |
| 20 | all prev | 22 | 5 |
| 21 | all prev | 22 | 5 |
| 22 | 20, 21 | F1-F4 | 6 |

### Agent Dispatch Summary

- **Wave 1**: **6 tasks** — T1 → `quick`, T2 → `quick`, T3 → `unspecified-high`, T4 → `visual-engineering`, T5 → `visual-engineering`, T6 → `quick`
- **Wave 2**: **6 tasks** — T7-T12 → `visual-engineering`
- **Wave 3**: **3 tasks** — T13 → `visual-engineering`, T14 → `deep`, T15 → `quick`
- **Wave 4**: **4 tasks** — T16 → `visual-engineering`, T17 → `deep`, T18 → `artistry`, T19 → `visual-engineering`
- **Wave 5**: **2 tasks** — T20 → `visual-engineering`, T21 → `unspecified-high`
- **Wave 6**: **1 task** — T22 → `deep`
- **FINAL**: **4 tasks** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation tasks below. EVERY task has: Agent Profile + Parallelization + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [ ] 1. Design Tokens Overhaul + JetBrains Mono Setup

  **What to do**:
  - Install `@fontsource-variable/jetbrains-mono` via npm
  - Rewrite `src/styles/tokens.css`:
    - Remove Google Fonts `@import` line entirely
    - Remove `--font-body` (Space Grotesk). Set `--font-mono: 'JetBrains Mono Variable', monospace` as the ONLY font
    - Replace entire color palette with purple/magenta dark-only scheme:
      - `--bg: #0a0a0f` (deep near-black with slight purple tint)
      - `--bg-soft: #12111a` (slightly lighter)
      - `--panel: rgba(18, 16, 30, 0.85)`
      - `--panel-border: rgba(168, 85, 247, 0.15)`
      - `--text-primary: #f0eef6`
      - `--text-secondary: #a8a3c0`
      - `--text-muted: #6b6589`
      - `--accent: #a855f7` (vibrant purple)
      - `--accent-strong: #7c3aed` (deeper purple)
      - `--accent-alt: #ec4899` (magenta/pink)
      - `--success: #34d399`
      - `--danger: #f87171`
      - `--glow: rgba(168, 85, 247, 0.4)` (new: for glow effects)
      - `--glow-strong: rgba(168, 85, 247, 0.7)` (new: stronger glow)
    - Delete entire `:root[data-theme='light']` block
    - Add new animation tokens: `--transition-fast: 150ms`, `--transition-normal: 300ms`, `--transition-slow: 600ms`
  - Update `src/main.tsx`: add `import '@fontsource-variable/jetbrains-mono'` before CSS imports
  - Update all `font-family: var(--font-body)` references in global.css to `font-family: var(--font-mono)`

  **Must NOT do**:
  - Keep any reference to Space Grotesk
  - Keep any light mode tokens
  - Use Google Fonts CDN
  - Add fonts other than JetBrains Mono

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward token replacement and npm install, no complex logic
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed — this is token/config work, not visual design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5, 6)
  - **Blocks**: Tasks 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 17, 20
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/styles/tokens.css` — Current design tokens file to rewrite. Lines 1-52. Note the `@import` on line 1 (remove), `--font-body` on line 5 (remove), `--font-mono` on line 6 (update), and the light mode block on lines 33-52 (delete entirely)
  - `src/main.tsx` — Entry point where font import goes. Currently imports `tokens.css` on line 4. Add fontsource import BEFORE this line.

  **API/Type References**:
  - None

  **External References**:
  - `@fontsource-variable/jetbrains-mono` npm package — `import '@fontsource-variable/jetbrains-mono'` enables weights 100-800 in a single file
  - Font CSS usage: `font-family: 'JetBrains Mono Variable', monospace`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Font loads correctly and is visible
    Tool: Playwright
    Preconditions: Dev server running (npm run dev)
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for page load (networkidle)
      3. Execute JS: getComputedStyle(document.body).fontFamily
      4. Assert result contains 'JetBrains Mono Variable'
      5. Screenshot full page
    Expected Result: Font family is JetBrains Mono Variable on body element
    Failure Indicators: Font falls back to generic monospace, Space Grotesk appears
    Evidence: .sisyphus/evidence/task-1-font-loaded.png

  Scenario: No light mode tokens exist
    Tool: Bash (grep)
    Preconditions: Task complete
    Steps:
      1. grep -r "data-theme.*light" src/styles/
      2. grep -r "Space Grotesk" src/
      3. grep -r "fonts.googleapis.com" src/
    Expected Result: All three grep commands return 0 matches
    Failure Indicators: Any match found
    Evidence: .sisyphus/evidence/task-1-no-light-mode.txt

  Scenario: Build succeeds with new tokens
    Tool: Bash
    Preconditions: All changes applied
    Steps:
      1. Run npm run build
    Expected Result: Build completes with exit code 0, dist/ directory created
    Failure Indicators: TypeScript errors, missing font, CSS parse errors
    Evidence: .sisyphus/evidence/task-1-build-success.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(tokens): dark-only purple/magenta design system with JetBrains Mono Variable`
  - Files: `src/styles/tokens.css`, `src/main.tsx`, `package.json`, `package-lock.json`
  - Pre-commit: `npm run build`

- [ ] 2. GSAP Installation + Base Animation Hooks

  **What to do**:
  - Install GSAP: `npm install gsap @gsap/react`
  - Create `src/hooks/useGsap.ts` — a hook that:
    - Registers ScrollTrigger plugin via `gsap.registerPlugin(ScrollTrigger)`
    - Provides a `useGsapContext` hook that creates a GSAP context scoped to a ref, with automatic cleanup on unmount
    - Exports `gsap` and `ScrollTrigger` for direct use
  - Create `src/hooks/useTextReveal.ts` — a hook for text typing/split animations:
    - Takes a ref to a text element
    - Splits text into individual `<span>` elements (character-by-character) via DOM manipulation (NOT using paid SplitText plugin)
    - Animates each character appearing with stagger using `gsap.from()`
    - Respects `prefers-reduced-motion`: if true, skip animation, show text immediately
  - Create `src/hooks/useParallax.ts` — a hook for parallax effects:
    - Takes a ref and a speed multiplier
    - Uses ScrollTrigger to create y-translation based on scroll position
    - Disabled on mobile (matchMedia check for `(max-width: 768px)`)
  - **NOTE**: Do NOT delete old hooks here. Hook file deletions (`useRevealOnScroll`, `useTheme`) are handled in Task 6 together with the `App.tsx` cleanup to avoid broken imports.

  **Must NOT do**:
  - Use GSAP premium plugins (SplitText, MorphSVG, DrawSVG)
  - Import from `gsap/all` (tree-shake properly)
  - Forget cleanup in useEffect returns (memory leaks)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard library installation + hook creation following React patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5, 6)
  - **Blocks**: Tasks 4, 5, 7-14, 16-19, 20
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/hooks/useRevealOnScroll.ts` — Current scroll animation hook (being replaced by GSAP). Study its IntersectionObserver pattern to understand what behavior needs GSAP equivalent. File deletion handled in Task 6.
  - `src/hooks/useTheme.ts` — Being deleted in Task 6. Currently imported in App.tsx — that import is also removed in Task 6.

  **External References**:
  - GSAP React: `import { useGSAP } from '@gsap/react'` — provides proper cleanup
  - ScrollTrigger: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
  - GSAP stagger: `gsap.from('.char', { opacity: 0, y: 20, stagger: 0.03 })`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: GSAP is installed and importable
    Tool: Bash
    Preconditions: npm install completed
    Steps:
      1. Run: node -e "require('gsap'); require('@gsap/react'); console.log('OK')"
      2. Run: npm run build
    Expected Result: Both commands exit 0
    Failure Indicators: Module not found errors
    Evidence: .sisyphus/evidence/task-2-gsap-installed.txt

  Scenario: Hooks compile without errors
    Tool: Bash
    Preconditions: Hook files created
    Steps:
      1. Run: npx tsc -b --noEmit
    Expected Result: No TypeScript errors
    Failure Indicators: Type errors in hook files
    Evidence: .sisyphus/evidence/task-2-hooks-compile.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(animation): GSAP setup with useGsapContext, useTextReveal, useParallax hooks`
  - Files: `src/hooks/useGsap.ts`, `src/hooks/useTextReveal.ts`, `src/hooks/useParallax.ts`, `package.json`, `package-lock.json`
  - Pre-commit: `npm run build`

- [ ] 3. i18n System — Dictionaries + Hook + Context

  **What to do**:
  - Create `src/i18n/` directory structure:
    - `src/i18n/locales/pt.json` — All Portuguese text (extract from profile.ts + section components + nav items)
    - `src/i18n/locales/en.json` — English translations of all text
    - `src/i18n/types.ts` — TypeScript type for the translation dictionary (strongly typed keys)
    - `src/i18n/context.tsx` — React context provider:
      - `LanguageProvider` wraps app
      - `useLanguage()` hook returns `{ t: (key) => string, lang: 'pt' | 'en', toggleLang: () => void }`
      - Persists selection to localStorage key `portfolio_lang`
      - Default language: detect from `navigator.language` (pt-BR → pt, else en)
  - Move hardcoded Portuguese strings from `src/data/profile.ts` into `pt.json` (COPY them — do NOT remove the original exports from profile.ts yet)
  - **DO NOT modify `src/data/profile.ts` exports** — keep all current exports intact so existing consumers (`HeroSection`, `SkillsSection`, etc.) continue working. The old exports will be removed when each section is rewritten in Wave 2 (Tasks 7-12) to use `t()` instead.
  - Translation keys should be nested: `hero.headline`, `hero.summary`, `nav.projects`, `skills.title`, etc.
  - **Integrate LanguageProvider into the app**: Wrap `<App />` in `<LanguageProvider>` in `src/main.tsx`. This enables `useLanguage()` for all Wave 2 components.
  - **Add a minimal temporary language toggle**: Create a simple `src/components/LanguageToggle.tsx` — a small floating button (fixed position, bottom-right corner, z-index: 9999) that calls `toggleLang()` and displays current language ("PT" / "EN"). This is a temporary component so Wave 2 QA scenarios can test i18n. Task 13 will replace this with the toggle integrated into the navigation bar.
  - **NOTE**: This task creates the i18n infrastructure, dictionaries, context, hook, wraps the app in the provider, and adds a minimal toggle. Component text migration to `t()` happens in Wave 2 (Tasks 7-12). Profile.ts cleanup happens after all sections are migrated.

  **Must NOT do**:
  - Install react-intl, i18next, or any heavy i18n library
  - Make English translations with Google Translate quality — they should read naturally
  - Modify section components (src/sections/*) or App.tsx — those use `t()` when rewritten in Wave 2
  - Remove or modify existing exports from `src/data/profile.ts` — consumers still depend on them until Wave 2
  - Make the temporary LanguageToggle visually elaborate — it's a minimal dev aid, Task 13 replaces it

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Moderate complexity — needs to extract all strings, create typed dictionaries, build React context
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5, 6)
  - **Blocks**: Tasks 7-13, 15, 17
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/data/profile.ts` — READ-ONLY reference for string extraction. Lines 1-83. Contains: profileData, skillGroups, experiences, education, languages, differential. Copy all user-facing strings into dictionaries. DO NOT modify this file.
  - `src/App.tsx:14-19` — READ-ONLY reference. NAV_ITEMS with Portuguese labels to include in dictionaries. DO NOT modify this file.
  - `src/sections/HeroSection.tsx` — READ-ONLY reference. Has Portuguese strings for hero content to include in dictionaries.
  - `src/sections/ProjectsSection.tsx` — READ-ONLY reference. Portuguese strings for project section.
  - `src/sections/SkillsSection.tsx` — READ-ONLY reference. Portuguese strings for skills.
  - `src/sections/ExperienceSection.tsx` — READ-ONLY reference. Portuguese strings for experience.
  - `src/sections/EducationSection.tsx` — READ-ONLY reference. Portuguese strings for education.
  - `src/sections/ContactSection.tsx` — READ-ONLY reference. Portuguese strings for contact.

  **API/Type References**:
  - `src/types/github.ts:1` — Current `Theme` type definition (will be replaced by `Lang` type)
  - `src/main.tsx:7-10` — Wrap `<App />` in `<LanguageProvider>` here. Currently renders `<StrictMode><App /></StrictMode>`.

  **External References**:
  - React Context pattern: `createContext` + `useContext` + Provider wrapper
  - localStorage API for persistence

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: i18n dictionaries are valid JSON with correct structure
    Tool: Bash
    Preconditions: Dictionary files created
    Steps:
      1. Run: node -e "const pt=JSON.parse(require('fs').readFileSync('src/i18n/locales/pt.json','utf8')); console.log('PT keys:', Object.keys(pt).length); if(Object.keys(pt).length<10) throw 'Too few keys'"
      2. Run: node -e "const en=JSON.parse(require('fs').readFileSync('src/i18n/locales/en.json','utf8')); console.log('EN keys:', Object.keys(en).length); if(Object.keys(en).length<10) throw 'Too few keys'"
    Expected Result: Both files parse as valid JSON with 10+ top-level keys
    Failure Indicators: JSON parse error, too few keys (incomplete extraction)
    Evidence: .sisyphus/evidence/task-3-dict-valid.txt

  Scenario: Both dictionaries have identical keys
    Tool: Bash
    Preconditions: Dictionary files created
    Steps:
      1. Run: node -e "const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>typeof v==='object'?flat(v,p+k+'.'):[[p+k]]); const pt=flat(JSON.parse(require('fs').readFileSync('src/i18n/locales/pt.json','utf8'))).sort(); const en=flat(JSON.parse(require('fs').readFileSync('src/i18n/locales/en.json','utf8'))).sort(); const missing=pt.filter(k=>!en.includes(k)); const extra=en.filter(k=>!pt.includes(k)); if(missing.length||extra.length){console.log('MISSING in EN:',missing,'EXTRA in EN:',extra);process.exit(1)}else{console.log('MATCH -',pt.length,'keys')}"
    Expected Result: "MATCH" — all nested keys present in both files
    Failure Indicators: Missing or extra keys in either file
    Evidence: .sisyphus/evidence/task-3-dict-keys-match.txt

  Scenario: i18n context and hook compile correctly
    Tool: Bash
    Preconditions: All i18n files created (types.ts, context.tsx, locales/pt.json, locales/en.json)
    Steps:
      1. Run: npx tsc -b --noEmit
      2. Run: npm run build
    Expected Result: Both commands exit 0, no type errors in i18n/
    Failure Indicators: TypeScript errors, missing exports, circular deps
    Evidence: .sisyphus/evidence/task-3-build-success.txt

  Scenario: Existing app still works with LanguageProvider and toggle is clickable
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for page load (networkidle)
      3. Assert page renders without console errors (no "Cannot read properties of undefined")
      4. Assert hero section contains profile name text
      5. Assert a language toggle button is visible (fixed position, bottom-right area)
      6. Click the language toggle button
      7. Assert the button text changed (e.g. "PT" → "EN" or vice versa)
      8. Refresh page
      9. Assert language persisted (button still shows the toggled language)
      10. Screenshot
    Expected Result: App renders as before, toggle is visible and functional, language persists via localStorage
    Failure Indicators: White screen, console errors, toggle missing, language not persisting
    Evidence: .sisyphus/evidence/task-3-provider-toggle.png
  ```

  > **NOTE**: The "No hardcoded Portuguese in components" check is deferred to Wave 2 tasks (7-12). In Wave 1, Task 3 only creates the i18n infrastructure and dictionaries. Sections will use `t()` when they are rewritten in Wave 2.

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(i18n): bilingual PT/EN system with typed dictionaries, language context, and toggle`
  - Files: `src/i18n/**` (locales/pt.json, locales/en.json, types.ts, context.tsx), `src/components/LanguageToggle.tsx`, `src/main.tsx`
  - Pre-commit: `npm run build`

- [ ] 4. Custom Cursor Component

  **What to do**:
  - Create `src/components/CustomCursor.tsx`:
    - A floating div that follows mouse position via `mousemove` event
    - Uses GSAP for smooth interpolation (lerp) between positions — NOT raw CSS transform (jittery)
    - States: `default` (small ring), `hover-link` (expanded ring + text "click"), `hover-section` (expanded + section name), `hidden` (on scroll or touch)
    - CSS class changes based on what element the cursor is over:
      - `a`, `button` → hover-link state
      - `.section` → hover-section state with section title
      - Default → default state
    - Hidden entirely on touch devices: check `window.matchMedia('(pointer: coarse)')` and `'ontouchstart' in window`
    - Set `cursor: none` on `body` when custom cursor is active (desktop only)
  - Create `src/styles/cursor.css`:
    - Custom cursor styles with `mix-blend-mode: difference` for visibility on any background
    - Smooth transitions between states
    - Purple accent glow on hover state

  **Must NOT do**:
  - Show custom cursor on mobile/touch devices
  - Use raw `style.transform` without GSAP smoothing
  - Cause layout shifts or interfere with click targets
  - Make cursor so large it obscures content

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual component with GSAP animation, cursor tracking, responsive behavior
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5, 6)
  - **Blocks**: Task 20
  - **Blocked By**: None (can start immediately, but needs GSAP from Task 2 to animate — can install gsap independently)

  **References**:

  **Pattern References**:
  - `src/components/ThemeToggle.tsx` — Existing component pattern to follow for file structure
  - `src/styles/global.css:116-135` — Example of component-specific CSS with transitions and hover states

  **External References**:
  - GSAP quickTo: `gsap.quickTo('.cursor', 'x', { duration: 0.3, ease: 'power3' })` — for smooth cursor following
  - `mix-blend-mode: difference` — CSS for cursor visibility on any background

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Custom cursor component compiles and builds
    Tool: Bash
    Preconditions: Component and CSS files created
    Steps:
      1. Run: npx tsc -b --noEmit
      2. Run: npm run build
    Expected Result: Both commands exit 0, no TypeScript errors
    Failure Indicators: Import errors, type errors, missing GSAP types
    Evidence: .sisyphus/evidence/task-4-build-success.txt

  Scenario: Custom cursor renders in isolation
    Tool: Playwright
    Preconditions: Dev server running. Temporarily import CustomCursor into App.tsx (add `<CustomCursor />` inside the root div) so it renders. Restore App.tsx after QA if needed (Task 13 will add it permanently).
    Steps:
      1. Navigate to http://localhost:5173
      2. Set viewport to 1280x720
      3. Assert element with class 'custom-cursor' or similar exists in DOM
      4. Assert body has `cursor: none` style
      5. Move mouse to center of page
      6. Move mouse to a link element
      7. Assert cursor element class includes 'hover-link' or similar
      8. Screenshot
    Expected Result: Custom cursor visible, follows mouse, changes state on links
    Failure Indicators: No custom cursor element, native cursor still visible
    Evidence: .sisyphus/evidence/task-4-cursor-desktop.png

  Scenario: Custom cursor hidden on mobile viewport
    Tool: Playwright
    Preconditions: Dev server running, CustomCursor imported
    Steps:
      1. Set viewport to 375x812 (iPhone)
      2. Navigate to http://localhost:5173
      3. Assert custom cursor element is hidden (display:none or not in DOM)
      4. Assert body does NOT have cursor:none
    Expected Result: No custom cursor on mobile, native cursor behavior preserved
    Failure Indicators: Custom cursor visible on mobile
    Evidence: .sisyphus/evidence/task-4-cursor-mobile.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(cursor): contextual custom cursor with GSAP smoothing`
  - Files: `src/components/CustomCursor.tsx`, `src/styles/cursor.css`
  - Pre-commit: `npm run build`

- [ ] 5. Animated Background Component

  **What to do**:
  - Create `src/components/AnimatedBackground.tsx`:
    - Full-viewport fixed background behind all content (z-index: -1)
    - Canvas-based particle system OR CSS-based animated grid (choose based on performance):
      - Option A (recommended): CSS grid with animated dots at grid intersections that pulse and have subtle glow. Simpler, more performant, fits the aesthetic.
      - Option B: Canvas with floating geometric shapes (triangles, circles) in purple/magenta with slow drift animation
    - Subtle gradient overlay that shifts slowly (GSAP timeline, infinite loop)
    - Performance: Use `requestAnimationFrame` efficiently, pause when tab is not visible (`document.hidden`)
    - Respect `prefers-reduced-motion`: if true, show static grid/gradient, no animation
  - Create `src/styles/background.css`:
    - Full-screen fixed positioning
    - Low opacity (0.3-0.5) so it doesn't compete with content
    - Gradient colors using `--accent` and `--accent-alt` tokens

  **Must NOT do**:
  - Use Three.js or WebGL (overkill)
  - Create background that distracts from content (keep it subtle)
  - Forget to pause animation when tab is hidden (battery drain)
  - Exceed 5% CPU usage on idle

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual component with animation, performance considerations, canvas/CSS art
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4, 6)
  - **Blocks**: Task 13, 20
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/styles/global.css:21-32` — Current `body::before` grid pattern. This is the existing subtle grid — the new animated background should replace and enhance this pattern
  - `src/styles/tokens.css:8-9` — Background color tokens that the new component should use

  **External References**:
  - CSS animated grid: `background-image: radial-gradient(circle, var(--accent) 1px, transparent 1px); background-size: 40px 40px`
  - `requestAnimationFrame` pattern with `document.hidden` check for efficient animation loops

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Animated background compiles and builds
    Tool: Bash
    Preconditions: Component and CSS files created
    Steps:
      1. Run: npx tsc -b --noEmit
      2. Run: npm run build
    Expected Result: Both commands exit 0, no TypeScript errors
    Failure Indicators: Import errors, type errors
    Evidence: .sisyphus/evidence/task-5-build-success.txt

  Scenario: Animated background renders in isolation
    Tool: Playwright
    Preconditions: Dev server running. Temporarily import AnimatedBackground into App.tsx (add `<AnimatedBackground />` as first child of root div) so it renders. Restore App.tsx after QA if needed (Task 13 will add it permanently).
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait 2 seconds for animations to initialize
      3. Assert an element with class 'animated-bg' or similar exists in DOM
      4. Assert it has position:fixed and z-index < 0
      5. Screenshot full page
    Expected Result: Background visible behind all content, not obscuring it
    Failure Indicators: Background covers content, too bright, invisible, not fixed position
    Evidence: .sisyphus/evidence/task-5-background.png

  Scenario: Background respects reduced motion
    Tool: Playwright
    Preconditions: Dev server running, AnimatedBackground imported
    Steps:
      1. Set prefers-reduced-motion: reduce via Playwright emulation
      2. Navigate to http://localhost:5173
      3. Wait 2 seconds
      4. Assert no CSS animations running on background element (animation-play-state: paused or no animation property)
    Expected Result: Static background with no animation
    Failure Indicators: Animations still running
    Evidence: .sisyphus/evidence/task-5-reduced-motion.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(bg): animated background with particle grid and gradient`
  - Files: `src/components/AnimatedBackground.tsx`, `src/styles/background.css`
  - Pre-commit: `npm run build`

- [ ] 6. Remove Dead Code — Differential, ThemeToggle, Light Mode

  **What to do**:
  - Delete files:
    - `src/sections/DifferentialSection.tsx`
    - `src/components/ThemeToggle.tsx`
    - `src/components/ThemeToggle.test.tsx`
    - `src/hooks/useRevealOnScroll.ts` and `src/hooks/useRevealOnScroll.test.tsx` (replaced by GSAP in Task 2)
    - `src/hooks/useTheme.ts` and `src/hooks/useTheme.test.tsx` (no more theme toggle)
  - In `src/App.tsx`:
    - Remove import of `DifferentialSection`
    - Remove import of `ThemeToggle`
    - Remove import of `useTheme`
    - Remove import of `useRevealOnScroll`
    - Remove `<DifferentialSection />` from JSX
    - Remove `<ThemeToggle ... />` from JSX
    - Remove `const { theme, toggleTheme } = useTheme()` 
    - Remove `useRevealOnScroll()` call
    - Remove footer theme reference (`tema {theme}`)
  - In `src/styles/global.css`:
    - Remove `.differential` styles (lines 565-568)
    - Remove `.theme-toggle` styles (lines 116-135)
    - Remove `[data-reveal]` styles (lines 591-605) — replaced by GSAP
  - In `src/data/profile.ts`:
    - Remove `differential` export (lines 74-83)
  - Clean up any other imports referencing deleted files

  **Must NOT do**:
  - Break the build — verify after each deletion
  - Leave orphan imports
  - Delete `useGithubProjects.ts` or any lib/ files (those are kept)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple file deletion and import cleanup, no creative work
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4, 5)
  - **Blocks**: None directly
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/App.tsx:1-67` — Main file to clean up. Lines 1 (ThemeToggle import), 4 (useRevealOnScroll import), 5 (useTheme import), 7 (DifferentialSection import) — remove all. Line 22 (useTheme call), line 25 (useRevealOnScroll call), line 45 (ThemeToggle JSX), line 54 (DifferentialSection JSX), line 60 (theme reference) — remove all.
  - `src/hooks/useRevealOnScroll.ts` — Delete entirely (replaced by GSAP hooks in Task 2)
  - `src/hooks/useTheme.ts` — Delete entirely (no more theme toggle)
  - `src/data/profile.ts:74-83` — `differential` export to remove
  - `src/styles/global.css:116-135` — ThemeToggle styles to remove
  - `src/styles/global.css:565-568` — Differential styles to remove
  - `src/styles/global.css:591-605` — data-reveal styles to remove

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Dead files are deleted
    Tool: Bash
    Preconditions: Deletions complete
    Steps:
      1. ls src/sections/DifferentialSection.tsx (expect not found)
      2. ls src/components/ThemeToggle.tsx (expect not found)
      3. ls src/components/ThemeToggle.test.tsx (expect not found)
      4. ls src/hooks/useRevealOnScroll.ts (expect not found)
      5. ls src/hooks/useTheme.ts (expect not found)
    Expected Result: All five files not found
    Failure Indicators: Any file still exists
    Evidence: .sisyphus/evidence/task-6-files-deleted.txt

  Scenario: No stale references
    Tool: Bash (grep)
    Preconditions: Cleanup complete
    Steps:
      1. grep -rn "DifferentialSection\|ThemeToggle\|useTheme\|useRevealOnScroll\|differential" src/ --include="*.tsx" --include="*.ts"
    Expected Result: 0 matches (no imports or references to deleted modules)
    Failure Indicators: Stale imports found
    Evidence: .sisyphus/evidence/task-6-no-stale-refs.txt

  Scenario: Build succeeds after cleanup
    Tool: Bash
    Preconditions: All cleanup done
    Steps:
      1. Run npm run build
    Expected Result: Build succeeds with exit code 0
    Failure Indicators: Import errors, missing module errors
    Evidence: .sisyphus/evidence/task-6-build-success.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `chore(cleanup): remove DifferentialSection, ThemeToggle, light mode, old hooks, and data-reveal`
  - Files: deleted files (DifferentialSection, ThemeToggle, useTheme, useRevealOnScroll + tests) + modified `src/App.tsx`, `src/data/profile.ts`, `src/styles/global.css`
  - Pre-commit: `npm run build`

- [ ] 7. Hero Section Redesign — Immersive Fullscreen Landing

  **What to do**:
  - Rewrite `src/sections/HeroSection.tsx` completely:
    - Fullscreen viewport height (`100vh`) immersive hero
    - Use `useLanguage()` for all text (t('hero.headline'), etc.)
    - GSAP timeline on mount:
      1. Background gradient fades in (0.5s)
      2. Name appears with character-by-character typing animation (useTextReveal hook)
      3. Role/tagline slides up with opacity (0.3s delay)
      4. Highlight pills stagger in from left (0.05s stagger)
      5. CTA buttons scale in (0.2s after pills)
      6. Avatar slides in from right with subtle parallax
    - Layout: Two-column on desktop (content left, avatar right), stacked on mobile
    - Glitch effect on name hover (subtle CSS distortion, not full GSAP — save heavy glitch for Task 19)
    - Scroll indicator at bottom (animated chevron bouncing)
    - Keep: avatar, name, role, highlights, action buttons (email, LinkedIn, CV)
    - Use `profileData` for non-translatable data (URLs, email) and `t()` for text
  - Update `src/styles/global.css` hero styles:
    - Remove existing `.hero` styles (lines 177-322)
    - New fullscreen hero with dramatic gradient background using `--accent` and `--accent-alt`
    - JetBrains Mono typography with large display sizes
    - Glow effects on accent elements using `--glow` token

  **Must NOT do**:
  - Keep the old card-based hero layout
  - Use Space Grotesk anywhere
  - Hardcode Portuguese text (use t())
  - Make hero shorter than 100vh on desktop

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex visual design with GSAP timeline, typography, layout, responsive
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Needed for crafting stunning visual design without mockup reference

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 9, 10, 11, 12)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1 (tokens), 2 (GSAP), 3 (i18n)

  **References**:

  **Pattern References**:
  - `src/sections/HeroSection.tsx` — Current hero to rewrite. Study the data it uses from profileData
  - `src/data/profile.ts:1-19` — profileData with avatarUrl, email, linkedin, github, heroHeadline, heroHighlights
  - `src/styles/global.css:177-322` — Current hero CSS to replace entirely
  - `src/hooks/useTextReveal.ts` — Created in Task 2, use for typing animation on name
  - `src/hooks/useParallax.ts` — Created in Task 2, use for avatar parallax effect
  - `src/i18n/context.tsx` — Created in Task 3, use `useLanguage()` for all text

  **External References**:
  - GSAP timeline: `const tl = gsap.timeline(); tl.from('.hero-name', {...}).from('.hero-role', {...}, '-=0.3')`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Hero fills viewport and animations play
    Tool: Playwright
    Preconditions: Dev server running, Tasks 1-3 complete
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait 3 seconds for GSAP animations to complete
      3. Assert .hero or [data-section="hero"] has height >= viewport height
      4. Assert hero heading text is visible (not opacity:0)
      5. Assert avatar image is loaded and visible
      6. Assert CTA buttons are visible
      7. Screenshot at 1280x720
      8. Screenshot at 375x812
    Expected Result: Fullscreen hero with all elements visible, responsive layout works
    Failure Indicators: Hero shorter than viewport, elements invisible, animation stuck
    Evidence: .sisyphus/evidence/task-7-hero-desktop.png, .sisyphus/evidence/task-7-hero-mobile.png

  Scenario: Hero text switches language
    Tool: Playwright
    Preconditions: Dev server running, i18n working
    Steps:
      1. Navigate to http://localhost:5173
      2. Read hero heading text — expect Portuguese
      3. Click language toggle
      4. Read hero heading text — expect English
      5. Assert ALL hero text changed (headline, role, highlights, buttons)
    Expected Result: All hero text switches to English, no mixed languages
    Failure Indicators: Some text remains in Portuguese
    Evidence: .sisyphus/evidence/task-7-hero-i18n.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(hero): immersive fullscreen hero with GSAP timeline animations`
  - Files: `src/sections/HeroSection.tsx`, `src/styles/global.css`
  - Pre-commit: `npm run build`

- [ ] 8. Projects Section Redesign

  **What to do**:
  - Rewrite `src/sections/ProjectsSection.tsx`:
    - Fullscreen section with dramatic heading
    - Use `useLanguage()` for all text
    - Keep `useGithubProjects` integration (receive as props like current)
    - Project cards: glassmorphism style with purple border glow on hover
    - GSAP stagger animation: cards reveal one-by-one as user scrolls into view (ScrollTrigger)
    - Each card: project name (JetBrains Mono bold), description, language badge, stars, link
    - Hover effect: card lifts, border glows purple, subtle scale(1.02)
    - Keep skeleton loading states (update styling to match new design)
    - Keep error/fallback states
    - Grid: 2 columns desktop, 1 column mobile
  - Update `src/components/ProjectCard.tsx`:
    - New glassmorphism card design with backdrop-filter
    - Purple glow hover effect
    - Language badge with colored dot
  - Update CSS for projects section and cards

  **Must NOT do**:
  - Break GitHub API integration
  - Remove loading/error states
  - Hardcode Portuguese text

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card design, hover effects, GSAP scroll animations, glassmorphism
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Card design and visual polish

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 9, 10, 11, 12)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/sections/ProjectsSection.tsx` — Current implementation, keep props interface and GitHub API integration
  - `src/components/ProjectCard.tsx` — Current card component to redesign
  - `src/types/github.ts:30-38` — `ProjectCardModel` interface (keep as-is)
  - `src/hooks/useGithubProjects.ts` — Hook interface (don't modify)
  - `src/styles/global.css:349-441` — Current project grid and card CSS to replace

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Projects load from GitHub and display
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to projects section
      3. Wait for loading skeletons to disappear (max 10s)
      4. Assert at least 1 project card is visible
      5. Assert project card has name, description, language badge
      6. Hover over first card
      7. Assert card has visual hover effect (border glow or transform)
      8. Screenshot
    Expected Result: GitHub projects displayed in new card design with hover effects
    Failure Indicators: No projects loaded, old design visible, hover broken
    Evidence: .sisyphus/evidence/task-8-projects.png

  Scenario: Projects show loading skeleton
    Tool: Playwright
    Preconditions: Dev server running, throttle network
    Steps:
      1. Set network to Slow 3G
      2. Navigate to http://localhost:5173
      3. Scroll to projects section immediately
      4. Assert skeleton loading elements visible
      5. Screenshot
    Expected Result: Skeleton cards visible while loading
    Failure Indicators: Empty space, no loading indication
    Evidence: .sisyphus/evidence/task-8-projects-skeleton.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(projects): glassmorphism project cards with GSAP scroll reveal`
  - Files: `src/sections/ProjectsSection.tsx`, `src/components/ProjectCard.tsx`, CSS files
  - Pre-commit: `npm run build`

- [x] 9. Skills Section Redesign

  **What to do**:
  - Rewrite `src/sections/SkillsSection.tsx`:
    - Use `useLanguage()` for all text
    - Skill groups displayed as interactive cards with icons or visual indicators
    - Each skill group: animated progress bars or tag clouds that animate in on scroll
    - GSAP ScrollTrigger: skills stagger in as cards, items within each card animate sequentially
    - Visual hierarchy: "Stack Principal" most prominent, "Aprendendo Agora" with distinct "learning" visual treatment (dotted border, pulsing indicator)
    - Grid: 2x2 on desktop, single column on mobile
    - Hover: skill cards tilt slightly (3D perspective transform)
  - Update skill card CSS with glassmorphism style matching project cards

  **Must NOT do**:
  - Hardcode Portuguese text
  - Use pie charts or complex data visualizations (keep it typographic)
  - Remove any existing skills from the data

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card design, animation choreography, visual hierarchy
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 10, 11, 12)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/sections/SkillsSection.tsx` — Current implementation to rewrite
  - `src/data/profile.ts:22-39` — `skillGroups` data (4 groups with items arrays)
  - `src/styles/global.css:442-496` — Current skills grid and card CSS to replace

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Skills display with animations on scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to skills section
      3. Wait 2 seconds for animations
      4. Assert 4 skill group cards visible
      5. Assert each card has a title and list of skills
      6. Hover over first card, assert visual effect
      7. Screenshot at 1280x720
    Expected Result: 4 skill groups displayed with animations and hover effects
    Failure Indicators: Missing groups, no animation, layout broken
    Evidence: .sisyphus/evidence/task-9-skills.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(skills): animated skill cards with GSAP scroll reveal and 3D tilt`
  - Files: `src/sections/SkillsSection.tsx`, CSS files
  - Pre-commit: `npm run build`

- [x] 10. Experience Section Redesign

  **What to do**:
  - Rewrite `src/sections/ExperienceSection.tsx`:
    - Use `useLanguage()` for all text
    - Timeline design with vertical line and nodes (purple accent)
    - Each experience entry: animated card that slides in from left with GSAP ScrollTrigger
    - Timeline node pulses with glow effect
    - Period shown as monospace badge
    - Bullets animate in as list items with stagger
    - Design should work well with 1 entry but also scale to multiple entries
  - Update timeline CSS with new visual treatment

  **Must NOT do**:
  - Hardcode Portuguese text
  - Design that looks empty with only 1 entry (make it feel intentional)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timeline visual design, GSAP animations, needs to look good with minimal data
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 11, 12)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/sections/ExperienceSection.tsx` — Current implementation to rewrite
  - `src/data/profile.ts:41-53` — `experiences` array (currently 1 entry with role, period, location, bullets)
  - `src/styles/global.css:498-521` — Current timeline CSS to replace

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Experience timeline displays and animates
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to experience section
      3. Wait 2 seconds for animations
      4. Assert timeline visual element exists (vertical line)
      5. Assert experience card visible with role, period, bullets
      6. Screenshot
    Expected Result: Timeline with animated experience entry
    Failure Indicators: No timeline, missing data, animation stuck
    Evidence: .sisyphus/evidence/task-10-experience.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(experience): animated timeline with GSAP scroll reveal`
  - Files: `src/sections/ExperienceSection.tsx`, CSS files
  - Pre-commit: `npm run build`

- [x] 11. Education Section Redesign

  **What to do**:
  - Rewrite `src/sections/EducationSection.tsx`:
    - Use `useLanguage()` for all text
    - Card design matching the overall glassmorphism style
    - Course name large and prominent, institution below
    - Period as monospace badge (similar to experience)
    - Subjects displayed as animated tags that stagger in
    - Languages list (from profile.ts) displayed alongside education with progress-bar-like visual for each level
    - GSAP ScrollTrigger for entrance animation
  - Update CSS for education section

  **Must NOT do**:
  - Hardcode Portuguese text
  - Ignore the languages data (Português, Inglês, Espanhol)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card design, tag animation, visual hierarchy
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10, 12)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/sections/EducationSection.tsx` — Current implementation to rewrite
  - `src/data/profile.ts:55-66` — `education` object (course, institution, period, subjects array)
  - `src/data/profile.ts:68-72` — `languages` array (name + level for each)
  - `src/styles/global.css:523-563` — Current education-related CSS to replace

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Education and languages display correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to education section
      3. Assert course name "Ciência da Computação" (or EN equivalent) visible
      4. Assert institution "IFNMG" visible
      5. Assert at least 3 subject tags visible
      6. Assert languages list visible (Português, Inglês, Espanhol)
      7. Screenshot
    Expected Result: Education card with course info, subjects, and languages
    Failure Indicators: Missing data, subjects not showing, no languages
    Evidence: .sisyphus/evidence/task-11-education.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(education): glassmorphism education card with animated subject tags`
  - Files: `src/sections/EducationSection.tsx`, CSS files
  - Pre-commit: `npm run build`

- [x] 12. Contact Section Redesign

  **What to do**:
  - Rewrite `src/sections/ContactSection.tsx`:
    - Use `useLanguage()` for all text
    - Bold call-to-action section with large heading ("Let's connect" / "Vamos conversar")
    - Contact buttons: Email (primary), LinkedIn (secondary), GitHub (ghost)
    - Buttons with hover glow effects matching purple/magenta palette
    - GSAP entrance animation: heading types in, buttons stagger from bottom
    - Subtle background element (gradient orb or mesh) to make section feel special
    - Include email address as visible text (not just mailto link)
  - Update contact CSS

  **Must NOT do**:
  - Add contact form (no backend)
  - Hardcode Portuguese text

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: CTA design, button effects, animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10, 11)
  - **Blocks**: Task 14
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/sections/ContactSection.tsx` — Current implementation to rewrite
  - `src/data/profile.ts:8-11` — Contact data (email, linkedin, github URLs)
  - `src/styles/global.css:570-573` — Current contact CSS
  - `src/styles/global.css:238-277` — Current button styles (.btn, .btn--primary, etc.) to enhance

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Contact section has working links
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to contact section
      3. Assert heading text visible
      4. Assert email link with href containing "mailto:jotavsevla@gmail.com"
      5. Assert LinkedIn link with href containing "linkedin.com"
      6. Assert GitHub link with href containing "github.com"
      7. Hover over email button, assert visual effect
      8. Screenshot
    Expected Result: Contact section with working links and hover effects
    Failure Indicators: Missing links, broken hrefs, no hover effect
    Evidence: .sisyphus/evidence/task-12-contact.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(contact): bold CTA contact section with glow effects`
  - Files: `src/sections/ContactSection.tsx`, CSS files
  - Pre-commit: `npm run build`

- [x] 13. App Shell + Navigation Redesign

  **What to do**:
  - Rewrite `src/App.tsx`:
    - Import and render `AnimatedBackground` (Task 5) as first child
    - Import and render `CustomCursor` (Task 4) 
    - Wrap app in `LanguageProvider` (Task 3)
    - New navigation bar:
      - Floating glassmorphism nav (keep sticky, redesign visual)
      - Brand name in JetBrains Mono with subtle glow
      - Nav items with active state indicator (purple underline that follows scroll position via ScrollTrigger)
      - Language toggle button (PT | EN) replacing the old theme toggle position
      - Hamburger menu on mobile with slide-in drawer
    - New section order: Hero → Projects → Skills → Experience → Education → Contact
    - Footer: minimal, monospace, version/year info
    - Full-width layout (remove max-width constraint for immersive sections, apply max-width only to content within sections)
  - Update `src/styles/global.css`:
    - Replace `.app-shell` to be full-width
    - New topbar glassmorphism with purple accents
    - Mobile hamburger menu styles
    - Section base styles for fullscreen immersive layout

  **Must NOT do**:
  - Import ThemeToggle or useTheme (deleted in Task 6)
  - Keep max-width constraint on outer shell (sections should be full-bleed)
  - Forget to include AnimatedBackground and CustomCursor

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Navigation design, layout architecture, mobile hamburger, glassmorphism
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 14, 15)
  - **Blocks**: Task 16
  - **Blocked By**: Tasks 1, 2, 3, 5

  **References**:

  **Pattern References**:
  - `src/App.tsx:1-67` — Current app structure to rewrite
  - `src/styles/global.css:56-114` — Current .app-shell and .topbar CSS to replace
  - `src/i18n/context.tsx` — LanguageProvider to wrap app (Task 3)
  - `src/components/CustomCursor.tsx` — Cursor component to include (Task 4)
  - `src/components/AnimatedBackground.tsx` — Background to include (Task 5)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Navigation works on desktop
    Tool: Playwright
    Preconditions: Dev server running, all Wave 1-2 tasks complete
    Steps:
      1. Navigate to http://localhost:5173
      2. Assert navigation bar is visible and sticky
      3. Assert brand name visible
      4. Assert nav links present (Projects, Skills, Experience, etc.)
      5. Assert language toggle visible (PT | EN)
      6. Click language toggle, assert it switches
      7. Click "Projects" nav link, assert page scrolls to projects section
      8. Screenshot
    Expected Result: Glassmorphism nav with working links and language toggle
    Failure Indicators: Nav not sticky, links broken, toggle missing
    Evidence: .sisyphus/evidence/task-13-nav-desktop.png

  Scenario: Mobile hamburger menu works
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to http://localhost:5173
      3. Assert hamburger icon visible (nav links hidden)
      4. Click hamburger icon
      5. Assert mobile menu drawer opens with nav links
      6. Click a nav link
      7. Assert menu closes and page scrolls
      8. Screenshot open state
    Expected Result: Hamburger menu opens, shows links, closes on selection
    Failure Indicators: Hamburger missing, menu doesn't open, links don't scroll
    Evidence: .sisyphus/evidence/task-13-nav-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(layout): immersive app shell with glassmorphism nav and language toggle`
  - Files: `src/App.tsx`, `src/styles/global.css`
  - Pre-commit: `npm run build`

- [x] 14. Smooth Scroll + Section Transitions with GSAP

  **What to do**:
  - Create `src/hooks/useSmoothScroll.ts`:
    - GSAP ScrollTrigger-based smooth scrolling between sections
    - Each section snaps into view as user scrolls (optional: `snap` property on ScrollTrigger)
    - Section entrance animations triggered by scroll position:
      - Each section fades in + slides up as it enters viewport
      - Section headings animate with text reveal
      - Content animates in after heading
    - Progress indicator: subtle side dots or progress bar showing current section
    - Update nav active state based on which section is in view
  - Apply to `App.tsx`:
    - Each `<section>` gets a `data-section` attribute for ScrollTrigger targeting
    - Register all sections with ScrollTrigger on mount
    - Cleanup all ScrollTrigger instances on unmount
  - Integrate with nav items from Task 13:
    - Active nav item updates as user scrolls past sections
    - Clicking nav item smooth-scrolls to target section

  **Must NOT do**:
  - Use `scroll-behavior: smooth` CSS (GSAP handles this)
  - Create scroll-jacking that feels broken or disorienting
  - Forget to clean up ScrollTrigger instances (memory leak)
  - Make scroll snapping too aggressive (user should still feel in control)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex GSAP ScrollTrigger choreography, performance-sensitive, multiple interacting animations
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 15)
  - **Blocks**: Task 16, 20
  - **Blocked By**: Tasks 2, 7-12 (needs all sections to exist)

  **References**:

  **Pattern References**:
  - `src/hooks/useGsap.ts` — Base GSAP hook created in Task 2
  - `src/App.tsx` — Where scroll behavior is orchestrated (modified in Task 13)
  - All section files (Tasks 7-12) — each section needs `data-section` attribute

  **External References**:
  - GSAP ScrollTrigger: `ScrollTrigger.create({ trigger: '.section', start: 'top center', onEnter: () => {} })`
  - GSAP scroll snap: `snap: { snapTo: 1 / totalSections, duration: 0.5 }`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Sections animate on scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll down slowly (simulate with mouse.wheel or page.evaluate window.scrollBy)
      3. Wait for projects section to enter viewport
      4. Assert projects section has visible content (opacity > 0)
      5. Continue scrolling through each section
      6. Assert each section becomes visible as it enters viewport
      7. Screenshot at each section
    Expected Result: Each section animates in smoothly as it enters viewport
    Failure Indicators: Sections invisible, animations jank, scroll stuck
    Evidence: .sisyphus/evidence/task-14-scroll-sections.png

  Scenario: Nav active state updates on scroll
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to projects section
      3. Assert "Projects" nav item has active class/style
      4. Scroll to skills section
      5. Assert "Skills" nav item now has active class/style
    Expected Result: Active nav item matches current section
    Failure Indicators: Active state doesn't update, wrong item highlighted
    Evidence: .sisyphus/evidence/task-14-nav-active.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(scroll): GSAP ScrollTrigger section transitions and smooth scroll`
  - Files: `src/hooks/useSmoothScroll.ts`, `src/App.tsx`
  - Pre-commit: `npm run build`

- [x] 15. Footer Redesign

  **What to do**:
  - Update footer in `src/App.tsx` (or extract to `src/components/Footer.tsx`):
    - Minimal monospace design
    - Use `useLanguage()` for text
    - Content: "Built with React + Vite" • year • "João Victor Araújo"
    - Subtle purple accent on hover of link elements
    - Optional: GitHub repo link, source code link
    - No theme reference (removed)
  - Update footer CSS in global.css

  **Must NOT do**:
  - Reference theme (dark/light)
  - Over-design the footer (it should be minimal)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple component, minimal design work
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14)
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 1, 3

  **References**:

  **Pattern References**:
  - `src/App.tsx:58-62` — Current footer code
  - `src/styles/global.css:583-589` — Current footer CSS

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Footer displays correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Scroll to bottom of page
      3. Assert footer element visible
      4. Assert footer contains "React" and current year
      5. Assert footer uses monospace font
      6. Assert no "tema" text (old theme reference removed)
    Expected Result: Minimal monospace footer with correct content
    Failure Indicators: Old theme text present, wrong font
    Evidence: .sisyphus/evidence/task-15-footer.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(footer): minimal monospace footer with i18n`
  - Files: `src/App.tsx` or `src/components/Footer.tsx`, CSS
  - Pre-commit: `npm run build`

- [x] 16. Intro/Loading Animation

  **What to do**:
  - Create `src/components/IntroAnimation.tsx`:
    - Fullscreen overlay that plays on first visit
    - GSAP master timeline:
      1. Black screen → purple gradient fades in (0.5s)
      2. Name "João Victor" types character-by-character in large JetBrains Mono (1.5s)
      3. Subtitle/role types below in smaller text (1s)
      4. Glitch distortion flash effect (0.3s)
      5. Screen "shatters" or slides away to reveal the actual site (0.8s)
    - Total duration: ~4-5 seconds
    - Skip button: small "Skip" text in corner that immediately completes the timeline
    - Session check: use `sessionStorage` key `intro_played` — only show once per session
    - After animation completes: remove overlay from DOM (not just hide)
    - Respect `prefers-reduced-motion`: if true, skip entire animation, show site immediately
  - Create `src/styles/intro.css`:
    - Fullscreen overlay styles (z-index: 9999, position: fixed)
    - Typography for intro text (extra large, centered)
    - Glitch effect keyframes

  **Must NOT do**:
  - Show intro on every page refresh (only once per session via sessionStorage)
  - Make it unskippable (always offer skip)
  - Last longer than 5 seconds
  - Ignore prefers-reduced-motion
  - Block interaction while loading real content (prefetch in background)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex GSAP timeline, visual effects, timing, creative animation
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 17, 18, 19)
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 2 (GSAP), 13 (app shell to overlay on)

  **References**:

  **Pattern References**:
  - `src/hooks/useTextReveal.ts` — Created in Task 2, can reuse for typing animation
  - `src/hooks/useGsap.ts` — GSAP context for proper cleanup

  **External References**:
  - GSAP timeline with labels: `tl.from('.intro-name', {...}, 'type').to('.intro-overlay', { opacity: 0 }, 'reveal')`
  - sessionStorage API: `sessionStorage.getItem('intro_played')` / `sessionStorage.setItem('intro_played', 'true')`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Intro plays on first visit
    Tool: Playwright
    Preconditions: Dev server running, clear sessionStorage
    Steps:
      1. Clear sessionStorage
      2. Navigate to http://localhost:5173
      3. Assert fullscreen overlay visible (z-index high, covers viewport)
      4. Wait 5 seconds
      5. Assert overlay is gone (removed from DOM or hidden)
      6. Assert site content visible behind
      7. Screenshot at 1s, 3s, and after completion
    Expected Result: Intro animation plays and reveals site
    Failure Indicators: No intro, intro stuck, site not revealed
    Evidence: .sisyphus/evidence/task-16-intro-sequence.png

  Scenario: Intro does NOT replay on refresh
    Tool: Playwright
    Preconditions: Dev server running, intro already played
    Steps:
      1. Navigate to http://localhost:5173 (first visit, let intro play)
      2. Wait for intro to complete
      3. Reload page
      4. Assert NO overlay visible (intro skipped)
      5. Assert site content immediately visible
    Expected Result: Intro skipped on second visit (sessionStorage check)
    Failure Indicators: Intro plays again
    Evidence: .sisyphus/evidence/task-16-intro-no-replay.png

  Scenario: Skip button works
    Tool: Playwright
    Preconditions: Dev server running, clear sessionStorage
    Steps:
      1. Clear sessionStorage
      2. Navigate to http://localhost:5173
      3. Assert skip button visible within 1 second
      4. Click skip button
      5. Assert overlay immediately gone
      6. Assert site content visible
    Expected Result: Skip immediately ends intro
    Failure Indicators: Skip button missing, animation continues after skip
    Evidence: .sisyphus/evidence/task-16-intro-skip.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(intro): cinematic loading animation with GSAP timeline and skip button`
  - Files: `src/components/IntroAnimation.tsx`, `src/styles/intro.css`, `src/App.tsx`
  - Pre-commit: `npm run build`

- [x] 17. Interactive Terminal

  **What to do**:
  - Create `src/components/Terminal.tsx`:
    - Floating terminal window that can be toggled open/closed
    - Toggle button: fixed position bottom-right, terminal icon with purple glow
    - Terminal appearance: dark panel with JetBrains Mono, prompt line, blinking cursor
    - Prompt format: `visitor@joao-portfolio:~$ `
    - Supported commands (minimum 8):
      - `help` — lists all available commands
      - `about` — displays short bio, scrolls to hero
      - `projects` — lists projects, scrolls to projects section
      - `skills` — lists skills, scrolls to skills section
      - `experience` — shows experience, scrolls to section
      - `contact` — shows contact info, scrolls to contact section
      - `lang [pt|en]` — switches language
      - `clear` — clears terminal output
      - `github` — opens GitHub profile in new tab
      - `secret` — hints at the easter egg existence
    - Terminal behavior:
      - Type text appears character-by-character (output animation)
      - Up arrow cycles through command history
      - Tab completion for command names
      - Unknown command: "Command not found. Type 'help' for available commands."
    - Uses `useLanguage()` for output text (commands output in current language)
    - GSAP for open/close animation (slide up from bottom-right)
  - Create `src/styles/terminal.css`:
    - Terminal window styles (rounded corners, backdrop blur, purple accent border)
    - Command prompt styles
    - Output text styles
    - Blinking cursor animation
    - Responsive: on mobile, terminal opens fullscreen

  **Must NOT do**:
  - Execute actual system commands (all commands are predefined)
  - Make terminal required for navigation (it's a bonus feature)
  - Block scrolling when terminal is open
  - Make it difficult to close

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex interactive component with command parsing, history, animations, responsive behavior
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 18, 19)
  - **Blocks**: Task 20
  - **Blocked By**: Tasks 1, 2, 3

  **References**:

  **Pattern References**:
  - `src/i18n/context.tsx` — useLanguage() hook for bilingual output
  - `src/data/profile.ts` — Non-translatable data (URLs, email) for command output
  - `src/hooks/useGsap.ts` — GSAP for terminal open/close animation

  **External References**:
  - Terminal UI pattern: input element with monospace font, output as scrollable div
  - GSAP .fromTo for slide-in animation

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Terminal opens and accepts commands
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Find terminal toggle button (bottom-right area)
      3. Click toggle button
      4. Assert terminal window opens with animation
      5. Assert prompt visible "visitor@joao-portfolio:~$"
      6. Type "help" and press Enter
      7. Assert output lists available commands
      8. Type "projects" and press Enter
      9. Assert page scrolls to projects section
      10. Screenshot terminal open state
    Expected Result: Terminal opens, accepts commands, outputs results, navigates
    Failure Indicators: Terminal doesn't open, commands not recognized, no output
    Evidence: .sisyphus/evidence/task-17-terminal-commands.png

  Scenario: Terminal handles unknown commands
    Tool: Playwright
    Preconditions: Terminal open
    Steps:
      1. Open terminal
      2. Type "foobar" and press Enter
      3. Assert error message "Command not found" or similar
    Expected Result: Graceful error message for unknown commands
    Failure Indicators: No error message, crash, blank output
    Evidence: .sisyphus/evidence/task-17-terminal-error.png

  Scenario: Terminal works on mobile
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set viewport to 375x812
      2. Navigate to http://localhost:5173
      3. Click terminal toggle
      4. Assert terminal opens fullscreen
      5. Type "help" and Enter
      6. Assert output visible
    Expected Result: Terminal works on mobile in fullscreen mode
    Failure Indicators: Terminal doesn't fit mobile, can't type, overflow issues
    Evidence: .sisyphus/evidence/task-17-terminal-mobile.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(terminal): interactive terminal with command navigation and bilingual output`
  - Files: `src/components/Terminal.tsx`, `src/styles/terminal.css`, `src/App.tsx`
  - Pre-commit: `npm run build`

- [ ] 18. Easter Egg

  **What to do**:
  - Create `src/components/EasterEgg.tsx`:
    - Hidden Konami Code activation: ↑ ↑ ↓ ↓ ← → ← → B A
    - When activated:
      - Screen flashes with glitch effect
      - A hidden message or animation appears (creative freedom — suggestions):
        - Matrix rain effect in purple/magenta for 3 seconds
        - OR: "You found me!" message with fun animation
        - OR: Mini retro game (snake, pong) overlay for 30 seconds
        - OR: All text on page briefly becomes l33t sp34k
      - Achievement-style toast notification: "🎮 Secret Found!"
    - Also discoverable via terminal command `secret` (shows hint: "Try the Konami Code...")
    - Uses GSAP for whatever animation is chosen
    - One-time per session (sessionStorage)
  - Add keyboard event listener in App.tsx or within EasterEgg component

  **Must NOT do**:
  - Make it obvious or easy to find accidentally
  - Break the site when activated
  - Leave it running indefinitely (auto-dismiss after animation)
  - Make it inappropriate or unprofessional

  **Recommended Agent Profile**:
  - **Category**: `artistry`
    - Reason: Creative, unconventional implementation. The whole point is personality and surprise.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 17, 19)
  - **Blocks**: Task 20
  - **Blocked By**: Task 2 (GSAP)

  **References**:

  **Pattern References**:
  - `src/hooks/useGsap.ts` — GSAP for animation effects
  - `src/components/Terminal.tsx` — Task 17, terminal `secret` command should hint at this

  **External References**:
  - Konami Code detection: sequence of keydown events [38,38,40,40,37,39,37,39,66,65]
  - sessionStorage for one-time activation

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Konami code activates easter egg
    Tool: Playwright
    Preconditions: Dev server running, clear sessionStorage
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for page to load
      3. Press keys in sequence: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
      4. Wait 1 second
      5. Assert some visual effect appeared (flash, toast, animation)
      6. Wait for effect to auto-dismiss
      7. Assert site returns to normal state
      8. Screenshot during effect
    Expected Result: Easter egg activates with visual effect, then auto-dismisses
    Failure Indicators: Nothing happens, site breaks, effect doesn't dismiss
    Evidence: .sisyphus/evidence/task-18-easter-egg.png

  Scenario: Easter egg only activates once per session
    Tool: Playwright
    Preconditions: Easter egg already activated this session
    Steps:
      1. Enter Konami code again
      2. Assert nothing happens (no repeat activation)
    Expected Result: No repeated activation
    Failure Indicators: Effect triggers again
    Evidence: .sisyphus/evidence/task-18-no-repeat.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(easter): hidden Konami Code easter egg with visual effect`
  - Files: `src/components/EasterEgg.tsx`, `src/App.tsx`
  - Pre-commit: `npm run build`

- [ ] 19. Glitch/Distortion Effects

  **What to do**:
  - Create `src/styles/glitch.css`:
    - CSS glitch effect class `.glitch` that can be applied to any text element
    - Uses CSS `clip-path` + pseudo-elements for RGB split effect
    - Subtle noise/scan-line overlay on hover
    - Multiple intensity levels: `.glitch--subtle` (hover only), `.glitch--active` (always)
  - Create `src/hooks/useGlitch.ts`:
    - A hook that applies random glitch "spasms" to elements:
      - Randomly triggers brief glitch animation (0.1-0.3s) at random intervals (every 5-15 seconds)
      - Uses GSAP for the distortion keyframes
      - Only on elements with `data-glitch` attribute
    - Respects `prefers-reduced-motion`: if true, no glitch effects at all
  - Apply glitch effects to:
    - Hero section heading (subtle glitch on hover)
    - Section headings (random periodic glitch spasm)
    - Terminal output (on command execution)

  **Must NOT do**:
  - Make glitch effects constant/annoying (they should be rare, brief, surprising)
  - Use glitch on body text (only headings and special elements)
  - Trigger epileptic-risk flashing (keep effects subtle, not full-screen)
  - Forget prefers-reduced-motion check

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: CSS effects, GSAP animation, visual polish
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 17, 18)
  - **Blocks**: Task 20
  - **Blocked By**: Task 2 (GSAP)

  **References**:

  **Pattern References**:
  - `src/hooks/useGsap.ts` — GSAP context for animation management
  - `src/sections/HeroSection.tsx` — Task 7, apply glitch to hero heading
  - `src/components/Terminal.tsx` — Task 17, apply glitch on command output

  **External References**:
  - CSS glitch effect: `clip-path: inset()` with pseudo-elements offset + RGB channel separation
  - GSAP random: `gsap.utils.random(5, 15)` for random timing

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Glitch effect visible on hover
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Wait for hero section
      3. Hover over hero heading text
      4. Wait 500ms
      5. Assert element has glitch-related class or pseudo-element visible
      6. Screenshot during hover
    Expected Result: Subtle glitch distortion visible on heading hover
    Failure Indicators: No visual change on hover
    Evidence: .sisyphus/evidence/task-19-glitch-hover.png

  Scenario: Glitch respects reduced motion
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set prefers-reduced-motion: reduce
      2. Navigate to http://localhost:5173
      3. Hover over hero heading
      4. Assert NO glitch animation (no clip-path changes, no RGB split)
    Expected Result: No glitch effects with reduced motion preference
    Failure Indicators: Glitch still active
    Evidence: .sisyphus/evidence/task-19-glitch-reduced.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(glitch): CSS glitch distortion effects with GSAP random triggers`
  - Files: `src/styles/glitch.css`, `src/hooks/useGlitch.ts`
  - Pre-commit: `npm run build`

- [ ] 20. Responsive Polish + Mobile Fallbacks

  **What to do**:
  - Review ALL components at breakpoints: 320px, 375px, 640px, 768px, 990px, 1280px, 1920px, 2560px
  - Fix issues found at each breakpoint:
    - Text overflow / truncation
    - Touch targets too small (min 44x44px)
    - Custom cursor: confirm hidden on touch devices
    - Parallax: confirm disabled on mobile
    - GSAP animations: reduce complexity on mobile (simpler enter animations, no parallax)
    - Terminal: confirm fullscreen on mobile
    - Intro animation: simpler on mobile (no shatter effect, just fade)
    - Navigation: hamburger menu works correctly
    - Cards: stack to single column on mobile
    - Font sizes: verify clamp() values work at extremes
  - Add/update media queries in CSS files as needed
  - Test touch interactions:
    - All buttons/links reachable by touch
    - Scroll works naturally (no GSAP scroll-jacking on mobile)
    - Terminal input works with mobile keyboard

  **Must NOT do**:
  - Show custom cursor on mobile
  - Enable parallax on mobile
  - Enable aggressive scroll snapping on mobile
  - Make text unreadable at 320px width

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive design review, CSS adjustments, mobile UX
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Mobile UX decisions
    - `playwright`: Automated viewport testing at multiple sizes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 21, 22)
  - **Blocks**: Task 22
  - **Blocked By**: ALL previous tasks (this is polish pass)

  **References**:

  **Pattern References**:
  - `src/styles/global.css` — All media queries (currently @640px and @990px)
  - ALL component files from Tasks 4-19

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Site works at all critical breakpoints
    Tool: Playwright
    Preconditions: Dev server running, all features complete
    Steps:
      1. For each viewport [320x568, 375x812, 640x480, 768x1024, 990x768, 1280x720, 1920x1080]:
         a. Set viewport
         b. Navigate to http://localhost:5173
         c. Scroll through all sections
         d. Assert no horizontal overflow (document.body.scrollWidth <= viewport.width)
         e. Assert all text readable (no truncation on critical elements)
         f. Screenshot
    Expected Result: Site works correctly at all breakpoints, no overflow
    Failure Indicators: Horizontal scroll, overlapping elements, unreadable text
    Evidence: .sisyphus/evidence/task-20-responsive-{width}.png (one per breakpoint)

  Scenario: Touch targets meet minimum size
    Tool: Playwright
    Preconditions: Mobile viewport (375x812)
    Steps:
      1. Find all interactive elements (a, button, [role="button"])
      2. Check each has minimum 44x44px touch target
      3. Report any undersized targets
    Expected Result: All touch targets >= 44x44px
    Failure Indicators: Buttons or links smaller than 44px in either dimension
    Evidence: .sisyphus/evidence/task-20-touch-targets.txt
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `fix(responsive): mobile polish and fallbacks for all components`
  - Files: various CSS and component files
  - Pre-commit: `npm run build`

- [ ] 21. Accessibility — prefers-reduced-motion + ARIA

  **What to do**:
  - Create/update `src/styles/reduced-motion.css`:
    - Global `@media (prefers-reduced-motion: reduce)` rules:
      - Disable all CSS animations and transitions (`animation: none !important; transition-duration: 0.01ms !important`)
      - Hide animated background (show static version)
      - Disable parallax
      - Disable glitch effects
      - Disable custom cursor animations (keep position tracking but no transitions)
      - Intro animation: skip entirely
  - Review GSAP hooks (useTextReveal, useParallax, useGlitch, useSmoothScroll):
    - Each must check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before animating
    - If true: apply end state immediately (no animation), or skip entirely
  - Accessibility audit:
    - All interactive elements have focus-visible styles
    - All images have alt text
    - All sections have proper headings (h1 → h2 → h3 hierarchy)
    - Terminal has proper ARIA: `role="log"` for output, `aria-label` for input
    - Language toggle has `aria-label` indicating current language
    - Color contrast: verify text meets WCAG AA (4.5:1 for normal text, 3:1 for large text) against dark backgrounds
    - Skip-to-content link for keyboard navigation
    - Focus trap in terminal when open

  **Must NOT do**:
  - Ignore prefers-reduced-motion in any animation
  - Remove focus styles (they're essential for keyboard nav)
  - Use color alone to convey information

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Cross-cutting concern, touches many files, requires accessibility expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 20, 22)
  - **Blocks**: Task 22
  - **Blocked By**: ALL previous tasks

  **References**:

  **Pattern References**:
  - All hooks in `src/hooks/` — need reduced-motion checks
  - All CSS files — need reduced-motion overrides
  - `src/components/Terminal.tsx` — needs ARIA roles
  - `src/components/IntroAnimation.tsx` — needs to skip with reduced-motion

  **External References**:
  - `prefers-reduced-motion` media query: `@media (prefers-reduced-motion: reduce) { ... }`
  - WCAG 2.1 AA color contrast requirements
  - ARIA authoring practices for terminal: `role="log"`, `aria-live="polite"`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Reduced motion disables animations
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Set prefers-reduced-motion: reduce via Playwright emulation
      2. Navigate to http://localhost:5173
      3. Assert NO intro animation plays (site visible immediately)
      4. Scroll through all sections
      5. Assert NO scroll animations (content immediately visible)
      6. Assert NO glitch effects
      7. Assert NO parallax movement
      8. Screenshot
    Expected Result: All content visible without any animation
    Failure Indicators: Animations still playing, content hidden waiting for animation
    Evidence: .sisyphus/evidence/task-21-reduced-motion.png

  Scenario: Keyboard navigation works
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:5173
      2. Press Tab key repeatedly
      3. Assert focus moves through: skip-link → nav items → hero CTA buttons → ... → footer
      4. Assert focus ring visible on each focused element
      5. Press Enter on a nav link
      6. Assert page scrolls to correct section
    Expected Result: Full keyboard navigability with visible focus indicators
    Failure Indicators: Focus lost, no visible focus ring, can't reach elements
    Evidence: .sisyphus/evidence/task-21-keyboard-nav.png
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `fix(a11y): prefers-reduced-motion support, ARIA roles, keyboard navigation`
  - Files: `src/styles/reduced-motion.css`, various hooks and components
  - Pre-commit: `npm run build`

- [ ] 22. Performance Optimization + Build Verification

  **What to do**:
  - Performance audit and optimization:
    - Run Lighthouse audit (via Playwright or CLI) and capture scores
    - Font loading: ensure `font-display: swap` is set (fontsource handles this by default)
    - GSAP: verify tree-shaking works (only imported plugins in bundle)
    - Images: ensure avatar and any images use lazy loading where appropriate
    - CSS: audit for unused styles from old design (should have been cleaned up, verify)
    - Bundle size: run `npx vite-bundle-visualizer` or check dist/ output size
    - Critical rendering path: ensure above-fold content (intro + hero) loads fast
    - Verify `<meta>` tags and Open Graph data are still correct
  - Build verification:
    - `npm run build` succeeds
    - `npm run preview` serves correctly
    - No console errors in production build
    - All assets load (no 404s)
  - Update `README.md` to reflect new features and stack (GSAP, dark-only, etc.)

  **Must NOT do**:
  - Optimize prematurely at the cost of code clarity
  - Remove GSAP animations for performance (optimize, don't remove)
  - Leave console.log statements in production code

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Performance analysis, bundle optimization, cross-cutting verification
  - **Skills**: [`playwright`]
    - `playwright`: For Lighthouse audit

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 20, 21)
  - **Blocks**: F1-F4
  - **Blocked By**: ALL previous tasks

  **References**:

  **Pattern References**:
  - `package.json` — build scripts
  - `vite.config.ts` — Vite configuration for build optimization
  - `index.html` — Meta tags and OG data
  - `README.md` — To update

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Production build succeeds
    Tool: Bash
    Preconditions: All tasks complete
    Steps:
      1. Run npm run build
      2. Assert exit code 0
      3. Assert dist/ directory exists
      4. Assert dist/index.html exists
      5. Check dist/ total size < 5MB
    Expected Result: Clean build under 5MB
    Failure Indicators: Build fails, output too large, missing files
    Evidence: .sisyphus/evidence/task-22-build.txt

  Scenario: Preview server has no console errors
    Tool: Playwright
    Preconditions: npm run build complete
    Steps:
      1. Start preview server (npm run preview)
      2. Navigate to http://localhost:4173
      3. Collect all console.error messages
      4. Navigate through all sections
      5. Assert 0 console errors
      6. Assert 0 network 404 errors
    Expected Result: Zero errors in production build
    Failure Indicators: Console errors, 404s, missing assets
    Evidence: .sisyphus/evidence/task-22-no-errors.txt

  Scenario: Lighthouse performance check
    Tool: Bash
    Preconditions: Preview server running
    Steps:
      1. Run: npx lighthouse http://localhost:4173 --output=json --output-path=.sisyphus/evidence/task-22-lighthouse.json --chrome-flags="--headless" --only-categories=performance,accessibility
      2. Parse JSON for scores
      3. Assert Performance score >= 80
      4. Assert Accessibility score >= 85
    Expected Result: Performance >= 80, Accessibility >= 85
    Failure Indicators: Scores below thresholds
    Evidence: .sisyphus/evidence/task-22-lighthouse.json
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `perf(build): optimization pass and production build verification`
  - Files: various optimized files, README.md
  - Pre-commit: `npm run build`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc -b` + linter + check for `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify all GSAP animations have cleanup in useEffect returns.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (intro → hero → scroll → terminal → easter egg). Test edge cases: rapid resize, fast scroll, language toggle mid-animation, terminal during intro. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes. Verify DifferentialSection removed. Verify no light mode references.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| After Wave | Commit Message | Pre-commit Check |
|-----------|---------------|-----------------|
| Wave 1 | `feat(design): new dark-only design system with JetBrains Mono + GSAP + i18n infrastructure` | `npm run build` |
| Wave 2 | `feat(sections): redesign all sections with GSAP animations and i18n` | `npm run build` |
| Wave 3 | `feat(layout): immersive app shell with smooth scroll transitions` | `npm run build` |
| Wave 4 | `feat(premium): intro animation, interactive terminal, easter egg, glitch effects` | `npm run build` |
| Wave 5 | `fix(polish): responsive fallbacks, accessibility, performance optimization` | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: no errors, dist/ generated
npx playwright test    # Expected: QA screenshots captured
```

### Final Checklist
- [ ] JetBrains Mono is the ONLY font loaded
- [ ] Zero references to Space Grotesk
- [ ] Zero references to light mode / data-theme="light"
- [ ] DifferentialSection.tsx deleted
- [ ] ThemeToggle.tsx deleted or repurposed as LanguageToggle
- [ ] GSAP animations on every section
- [ ] Custom cursor visible on desktop, hidden on mobile
- [ ] Terminal interativo accepts commands and navigates
- [ ] Intro animation plays on first load
- [ ] Easter egg is present and discoverable
- [ ] PT/EN toggle works on all text content
- [ ] `prefers-reduced-motion` disables heavy animations
- [ ] Lighthouse Performance ≥ 80 mobile
- [ ] Responsive: 320px to 2560px
- [ ] All "Must NOT Have" items absent from codebase
