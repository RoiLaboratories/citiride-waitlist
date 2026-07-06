type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  headers: Record<string, string>;
};

const buckets = new Map<string, Bucket>();

const DEFAULT_LIMIT = 20;
const DEFAULT_WINDOW_MS = 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function createHeaders(
  limit: number,
  remaining: number,
  resetAt: number,
  retryAfter?: number,
): Record<string, string> {
  const headers: Record<string, string> = {
    "RateLimit-Limit": String(limit),
    "RateLimit-Remaining": String(Math.max(remaining, 0)),
    "RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };

  if (retryAfter !== undefined) {
    headers["Retry-After"] = String(Math.max(retryAfter, 0));
  }

  return headers;
}

export function checkRateLimit(
  request: Request,
  namespace: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
): RateLimitResult {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      headers: createHeaders(limit, limit - 1, resetAt),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      headers: createHeaders(
        limit,
        0,
        current.resetAt,
        Math.ceil((current.resetAt - now) / 1000),
      ),
    };
  }

  current.count += 1;

  return {
    allowed: true,
    headers: createHeaders(limit, limit - current.count, current.resetAt),
  };
}