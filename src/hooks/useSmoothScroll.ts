import { useCallback, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './useGsap';

const SECTION_IDS = [
  'inicio',
  'projetos',
  'stack',
  'experiencia',
  'formacao',
  'contato',
] as const;

type SectionId = (typeof SECTION_IDS)[number];

interface UseSmoothScrollOptions {
  containerRef: React.RefObject<HTMLElement | null>;
}

interface UseSmoothScrollReturn {
  activeSection: SectionId;
  sectionIds: readonly SectionId[];
  scrollToSection: (id: string) => void;
}

export function useSmoothScroll({
  containerRef,
}: UseSmoothScrollOptions): UseSmoothScrollReturn {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const sections = containerRef.current?.querySelectorAll<HTMLElement>(
        '[data-section]'
      );
      if (!sections?.length) return;

      sections.forEach((section) => {
        const sectionId = section.dataset.section as SectionId;

        if (!prefersReduced) {
          gsap.set(section, { opacity: 0, y: 40 });

          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
              });
            },
          });
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: ({ isActive }) => {
            if (isActive) {
              setActiveSection(sectionId);
            }
          },
        });
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      window.scrollTo({ top: target.offsetTop - 80 });
      return;
    }

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: target, offsetY: 80 },
      ease: 'power2.inOut',
    });
  }, []);

  return {
    activeSection,
    sectionIds: SECTION_IDS,
    scrollToSection,
  };
}
