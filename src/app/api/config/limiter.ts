import { RateLimiter } from "limiter";

// applying limiter middleware
// limiter is used to limit the number of request a user can make after a reload
export const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: `min`,
  fireImmediately: true,
});
