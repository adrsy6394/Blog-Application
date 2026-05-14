import { CACHE_PREFIX, CACHE_EXPIRY_MS } from './constants';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateCacheKey = (key: string): string => {
  return `${CACHE_PREFIX}${key}`;
};

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export const setCacheItem = <T>(key: string, data: T, expiryMs = CACHE_EXPIRY_MS): void => {
  if (typeof window === 'undefined') return;
  const cacheKey = generateCacheKey(key);
  const cacheEntry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    expiry: expiryMs,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
};

export const getCacheItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const cacheKey = generateCacheKey(key);
  const item = localStorage.getItem(cacheKey);
  if (!item) return null;

  try {
    const parsedItem = JSON.parse(item) as CacheEntry<T>;
    const now = Date.now();
    if (now - parsedItem.timestamp > (parsedItem.expiry || CACHE_EXPIRY_MS)) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return parsedItem.data;
  } catch (error) {
    console.error('Error parsing cache item', error);
    return null;
  }
};

export const isCacheValid = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  const cacheKey = generateCacheKey(key);
  const item = localStorage.getItem(cacheKey);
  if (!item) return false;

  try {
    const parsedItem = JSON.parse(item) as CacheEntry<any>;
    const now = Date.now();
    return now - parsedItem.timestamp <= (parsedItem.expiry || CACHE_EXPIRY_MS);
  } catch (error) {
    return false;
  }
};

export const clearCacheItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  const cacheKey = generateCacheKey(key);
  localStorage.removeItem(cacheKey);
};

export const clearAllCache = (): void => {
  if (typeof window === 'undefined') return;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    return true;
  }
};
