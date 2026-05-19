import { useEffect, useState } from 'react';

/**
 * Tracks which `<section id="...">` is currently in view via IntersectionObserver.
 * Returns the id of the section that has the most viewport real estate.
 */
export function useActiveSection(ids: string[], rootMargin = '-40% 0px -55% 0px'): string {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with the largest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids.join('|'), rootMargin]);

  return active;
}
