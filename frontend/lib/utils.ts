import DOMPurify from 'isomorphic-dompurify';

/**
 * @file utils.ts
 * @description Global utility functions for the ZAHIDAAN storefront.
 */

/**
 * @function sanitizeHtml
 * @description Sanitizes HTML strings to prevent XSS attacks.
 * Uses isomorphic-dompurify for safe server and client-side rendering.
 * @param {string} html - The raw HTML string.
 * @returns {string} The sanitized HTML.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    return DOMPurify.sanitize(html);
  }
  return DOMPurify.sanitize(html);
}

/**
 * @function formatCurrency
 * @description Formats a number into Indian Rupee (INR) currency format.
 * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
