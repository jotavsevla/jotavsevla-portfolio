import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRevealOnScroll } from './useRevealOnScroll';

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  readonly observe = vi.fn((element: Element) => {
    this.observed.push(element);
  });
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);

  private readonly callback: IntersectionObserverCallback;
  private readonly observed: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  trigger(entries: Array<{ target: Element; isIntersecting: boolean }>) {
    const normalizedEntries = entries.map(
      (entry) =>
        ({
          target: entry.target,
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.isIntersecting ? 1 : 0,
          time: 0,
          boundingClientRect: entry.target.getBoundingClientRect(),
          intersectionRect: entry.target.getBoundingClientRect(),
          rootBounds: null,
        }) as IntersectionObserverEntry,
    );

    this.callback(normalizedEntries, this as unknown as IntersectionObserver);
  }
}

class MockMutationObserver implements MutationObserver {
  static instances: MockMutationObserver[] = [];

  readonly observe = vi.fn();
  readonly disconnect = vi.fn();
  readonly takeRecords = vi.fn(() => [] as MutationRecord[]);

  private readonly callback: MutationCallback;

  constructor(callback: MutationCallback) {
    this.callback = callback;
    MockMutationObserver.instances.push(this);
  }

  triggerAddedNodes(addedNodes: Node[]) {
    const record = {
      type: 'childList',
      target: document.body,
      addedNodes: addedNodes as unknown as NodeList,
      removedNodes: [] as unknown as NodeList,
      previousSibling: null,
      nextSibling: null,
      attributeName: null,
      attributeNamespace: null,
      oldValue: null,
    } as unknown as MutationRecord;

    this.callback([record], this as unknown as MutationObserver);
  }
}

const originalIntersectionObserver = window.IntersectionObserver;
const originalMutationObserver = window.MutationObserver;

function Harness() {
  useRevealOnScroll();

  return (
    <div>
      <div data-testid="initial-reveal" data-reveal />
    </div>
  );
}

describe('useRevealOnScroll', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    MockMutationObserver.instances = [];

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(window, 'MutationObserver', {
      configurable: true,
      writable: true,
      value: MockMutationObserver,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: originalIntersectionObserver,
    });

    Object.defineProperty(window, 'MutationObserver', {
      configurable: true,
      writable: true,
      value: originalMutationObserver,
    });
  });

  it('revela elementos existentes no mount quando entram em viewport', () => {
    render(<Harness />);

    const initialElement = screen.getByTestId('initial-reveal');
    const ioInstance = MockIntersectionObserver.instances[0];

    expect(ioInstance).toBeDefined();
    expect(initialElement).toHaveClass('reveal-pending');

    ioInstance.trigger([{ target: initialElement, isIntersecting: true }]);

    expect(initialElement).not.toHaveClass('reveal-pending');
    expect(initialElement).toHaveClass('is-visible');
  });

  it('observa e revela elementos adicionados depois do mount', () => {
    render(<Harness />);

    const ioInstance = MockIntersectionObserver.instances[0];
    const mutationInstance = MockMutationObserver.instances[0];

    const dynamicElement = document.createElement('article');
    dynamicElement.setAttribute('data-reveal', '');
    document.body.appendChild(dynamicElement);

    mutationInstance.triggerAddedNodes([dynamicElement]);

    expect(dynamicElement).toHaveClass('reveal-pending');

    ioInstance.trigger([{ target: dynamicElement, isIntersecting: true }]);

    expect(dynamicElement).not.toHaveClass('reveal-pending');
    expect(dynamicElement).toHaveClass('is-visible');

    dynamicElement.remove();
  });

  it('desconecta observers no unmount', () => {
    const { unmount } = render(<Harness />);

    const ioInstance = MockIntersectionObserver.instances[0];
    const mutationInstance = MockMutationObserver.instances[0];

    unmount();

    expect(ioInstance.disconnect).toHaveBeenCalledTimes(1);
    expect(mutationInstance.disconnect).toHaveBeenCalledTimes(1);
  });
});
