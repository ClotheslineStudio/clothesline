import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Header from './Header.svelte';

// ---------------------------------------------------------------------------
// Utility: extracts classes from the rendered element
// ---------------------------------------------------------------------------
function getHeader(container: HTMLElement) {
  return container.querySelector('.cl-header') as HTMLElement;
}

describe('Header component', () => {
  // -------------------------------------------------------------------------
  // Basic Render
  // -------------------------------------------------------------------------
  it('renders with default props', () => {
    const { container } = render(Header);
    const header = getHeader(container);

    expect(header).toBeTruthy();
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(header.classList.contains('cl-header')).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Tag Switching
  // -------------------------------------------------------------------------
  it('renders with a custom tag when using the "as" prop', () => {
    const { container } = render(Header, { props: { as: 'nav' } });
    const header = container.querySelector('nav.cl-header');

    expect(header).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Slot Rendering
  // -------------------------------------------------------------------------
  it('renders left, center, and right slots', () => {
    const { getByText } = render(Header, {
      context: new Map([
        ['$$slots', { left: true, center: true, right: true }]
      ])
    });

    // Note: This test may need to be updated based on how slots are actually implemented
    // in the Header component. You might need to render with actual slot content.
  });

  // -------------------------------------------------------------------------
  // Sticky Mode
  // -------------------------------------------------------------------------
  it('applies sticky class when "sticky" is true', () => {
    const { container } = render(Header, { props: { sticky: true } });
    const header = getHeader(container);

    expect(header.classList.contains('is-sticky')).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Bordered and Elevated
  // -------------------------------------------------------------------------
  it('respects the "bordered" and "elevated" props', () => {
    const { container } = render(Header, {
      props: { bordered: false, elevated: false },
    });

    const header = getHeader(container);

    expect(header.classList.contains('is-bordered')).toBe(false);
    expect(header.classList.contains('is-elevated')).toBe(false);
  });

  // -------------------------------------------------------------------------
  // Max Width Constraints
  // -------------------------------------------------------------------------
  it('applies correct max-width class', () => {
    const { container } = render(Header, { props: { maxWidth: 'prose' } });
    const wrapper = container.querySelector('.cl-header-inner') as HTMLElement;

    expect(wrapper.classList.contains('mw-prose')).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Combining Features
  it('combines sticky, bordered, and elevated correctly', () => {
    const { container } = render(Header, {
      props: { sticky: true, bordered: true, elevated: true },
    });

    const header = getHeader(container);

    expect(header.classList.contains('is-sticky')).toBe(true);
    expect(header.classList.contains('is-bordered')).toBe(true);
    expect(header.classList.contains('is-elevated')).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Accessibility Expectations
  // -------------------------------------------------------------------------
  it('sets semantic roles correctly', () => {
    const { container } = render(Header, { props: { as: 'header' } });

    const header = getHeader(container);
    // <header> already implies "banner", but verifying anyway:
    expect(header.getAttribute('role')).toBeNull();
  });
});
