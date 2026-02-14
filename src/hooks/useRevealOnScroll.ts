import { useEffect } from 'react';

export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      return;
    }

    const observedElements = new WeakSet<HTMLElement>();

    const observeRevealElement = (element: HTMLElement) => {
      if (!element.hasAttribute('data-reveal')) {
        return;
      }

      if (observedElements.has(element) || element.classList.contains('is-visible')) {
        return;
      }

      element.classList.add('reveal-pending');
      observer.observe(element);
      observedElements.add(element);
    };

    const observeRevealTree = (rootNode: HTMLElement | ParentNode) => {
      if (rootNode instanceof HTMLElement) {
        observeRevealElement(rootNode);
      }

      if ('querySelectorAll' in rootNode) {
        rootNode.querySelectorAll<HTMLElement>('[data-reveal]').forEach(observeRevealElement);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -12% 0px',
      },
    );

    observeRevealTree(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeRevealTree(node);
          }
        });
      });
    });

    if (document.body) {
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
