import DOMPurify from 'isomorphic-dompurify';

/**
 * @file sanitizer.ts
 * @description Provides a hardened layer for HTML sanitization to prevent XSS attacks.
 */

/**
 * Sanitizes a string of HTML, stripping dangerous tags and attributes.
 * 
 * @param {string} html The raw HTML string to sanitize.
 * @returns {string} The sanitized HTML string.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img'
    ],
    ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'title', 'class', 'id'],
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
}

/**
 * React-friendly hook or utility to safely set HTML.
 * Use this instead of passing raw strings to dangerouslySetInnerHTML.
 */
export function createSafeHtml(html: string) {
  return { __html: sanitizeHtml(html) };
}
