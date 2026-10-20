import { useEffect, useState } from 'react';

// Tiny client-side router: plain <a href="/..."> links are intercepted globally,
// so components keep using normal anchors and no router library is needed.

const listeners = new Set();

export function navigate(to) {
  const url = new URL(to, window.location.origin);
  window.history.pushState({}, '', url.pathname + url.hash);
  listeners.forEach((fn) => fn());
}

export function useLocation() {
  // stamp changes on every navigation, so clicking a link to the current page still re-scrolls
  const read = () => ({ path: window.location.pathname, hash: window.location.hash, stamp: Date.now() });
  const [location, setLocation] = useState(read);

  useEffect(() => {
    const update = () => setLocation(read());
    listeners.add(update);
    window.addEventListener('popstate', update);

    // Catch clicks on same-origin links that point at another page ("/about", "/#cases")
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);

    return () => {
      listeners.delete(update);
      window.removeEventListener('popstate', update);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // After every page change, jump to the #section if there is one, otherwise to the top
  useEffect(() => {
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      const el = id && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }, 60);
    return () => clearTimeout(timer);
  }, [location.stamp]);

  return location;
}
