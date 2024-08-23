export const tokenBlacklist: Set<string> = new Set();

export function isTokenBlacklisted(token: string): boolean {
  return tokenBlacklist.has(token);
}

export function addTokenToBlacklist(token: string): void {
  tokenBlacklist.add(token);
}
