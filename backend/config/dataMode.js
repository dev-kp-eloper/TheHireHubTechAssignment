/** When unset, API serves rich in-memory dummy data (no MongoDB required). */
export function isMockDataMode() {
  return !process.env.MONGODB_URI;
}
