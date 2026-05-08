# 📘 Production Engineering Standards Handbook

## 🏛️ The Five Pillars of Production Engineering

| Pillar | Core Strategy | Technical Implementation |
| :--- | :--- | :--- |
| **1. Code Quality** | **Predictability** | Strict TypeScript + Zod + JSDoc. We validate data at the boundary. If the data is wrong, the app stops before it breaks the UI. |
| **2. Security** | **Defense in Depth** | Rate Limiting + Sanitization + CSP. Protection against Brute force, XSS, and Data Injection. |
| **3. Efficiency** | **Perceived Speed** | PWA + Streaming + Dynamic Imports. Load in <1s, and show AI/Data results before full delivery. |
| **4. Testing** | **Verification** | The Pyramid (Unit → Integration → E2E). Focus on logic, Golden Paths, and critical hardware/APIs. |
| **5. Accessibility** | **Inclusion** | WCAG 2.1 + ARIA + High Contrast. Semantic HTML and Dyslexia-friendly options. |

---

## 1. Code Quality: The "Clean Code" Architecture
*   **Schema-First Development:** Use **Zod** to define data models. Every API response must be parsed through a schema.
*   **Functional Components:** Avoid local state where global state is needed. Use **Zustand** for global sync.
*   **Formal Documentation (JSDoc):** Every function must have `@param` and `@returns`.
*   **Error Boundaries:** Wrap major sections in a React `ErrorBoundary` component to provide a "Reload" option.

## 2. Security: The "Hardened" Backend
*   **Sliding Window Rate Limiting:** Prevent DDoS and API abuse by limiting requests per IP within a time window.
*   **Content Security Policy (CSP):** Use `middleware.ts` to set headers that restrict script/style execution.
*   **XSS Protection:** Sanitize user-generated or AI-generated HTML using `isomorphic-dompurify`.

## 3. Efficiency: The "Performance" Layer
*   **Progressive Web App (PWA):** Use a manifest and service worker for "installable" native feel.
*   **Next.js Optimization:** 
    *   `next/image` for automatic lazy-loading.
    *   `next/font` to eliminate Layout Shift (CLS).
    *   Dynamic Imports for heavy modules.
*   **Multi-Stage Docker Builds:** Keep production images tiny (<200MB).

## 4. Testing: The "Confidence" Suite
*   **Unit Testing (Jest):** Focus on pure functions (helpers, math, formatters).
*   **Integration Testing:** Test component interactions (e.g., "Selecting a state updates the dashboard").
*   **E2E Testing (Playwright):** Test the most critical "Money Path" (Login, Payment, or ID Scanner).
*   **CI Readiness:** Always run `npm test` and `npm run build` before pushing.

## 5. Accessibility (a11y): The "Global" Reach
*   **Semantic HTML:** Use `<button>` for actions and `<a>` for navigation.
*   **ARIA Roles:** Use `aria-live="polite"` for dynamic updates.
*   **Keyboard Navigation:** Ensure every interactive element is reachable via `Tab`.

---

## 💎 The "Holy Trinity" of Production Readiness

These three patterns separate a "student project" from a "commercial product."

### 1. `lib/schemas.ts` — The "Source of Truth"
*   **Fail-Fast:** Ensures malformed data never reaches the UI.
*   **Automatic Types:** `z.infer<typeof Schema>` keeps TS types in sync.
*   **The Contract:** Acts as a contract between Frontend and Backend/AI.

### 2. `app/components/ErrorBoundary.tsx` — The "Safety Net"
*   **Graceful Failure:** Prevents one bug from crashing the entire site.
*   **User Trust:** Provides a helpful UI when things go wrong.

### 3. `lib/rateLimiter.ts` — The "Shield"
*   **Cost Protection:** Prevents runaway API costs from malicious users or bugs.
*   **Defense:** Blocks bot scrapers and brute force attacks.
