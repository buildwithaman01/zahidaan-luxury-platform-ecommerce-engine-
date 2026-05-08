/**
 * @file rateLimiter.ts
 * @description Lightweight in-memory rate limiter to protect API routes from abuse.
 * Implements a sliding window strategy to limit requests per IP.
 */

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const cache = new Map<string, RateLimitInfo>();

/**
 * @function rateLimit
 * @description Checks if a given identifier (e.g., IP) has exceeded the limit.
 * @param identifier Unique key (IP address)
 * @param limit Max requests allowed in the window
 * @param windowMs Time window in milliseconds
 * @returns { success: boolean, remaining: number, reset: number }
 */
export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
) {
  const now = Date.now();
  const info = cache.get(identifier);

  // If new IP or window expired
  if (!info || now > info.resetTime) {
    const newInfo = {
      count: 1,
      resetTime: now + windowMs
    };
    cache.set(identifier, newInfo);
    return {
      success: true,
      remaining: limit - 1,
      reset: newInfo.resetTime
    };
  }

  // If within window
  if (info.count < limit) {
    info.count += 1;
    return {
      success: true,
      remaining: limit - info.count,
      reset: info.resetTime
    };
  }

  // Limit exceeded
  return {
    success: false,
    remaining: 0,
    reset: info.resetTime
  };
}

// Cleanup interval to prevent memory leaks (runs every 10 mins)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now > value.resetTime) {
        cache.delete(key);
      }
    }
  }, 600000);
}
