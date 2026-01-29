"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  error: Error | null;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  reset: () => void;
}

export function useInfiniteScroll<T>(
  fetchFn: (cursor?: string) => Promise<{
    items: T[];
    nextCursor?: string;
    hasMore: boolean;
  }>,
  options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollReturn<T> {
  const { threshold = 0.1, rootMargin = "100px", enabled = true } = options;

  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initial fetch
  useEffect(() => {
    if (!enabled) return;

    const initialFetch = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFn();
        setItems(result.items);
        setCursor(result.nextCursor);
        setHasMore(result.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch"));
      } finally {
        setIsLoading(false);
      }
    };

    initialFetch();
  }, [enabled, fetchFn]);

  // Load more function
  const loadMore = useCallback(async () => {
    if (isFetchingMore || !hasMore || !cursor) return;

    setIsFetchingMore(true);
    try {
      const result = await fetchFn(cursor);
      setItems((prev) => [...prev, ...result.items]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch more"));
    } finally {
      setIsFetchingMore(false);
    }
  }, [cursor, fetchFn, hasMore, isFetchingMore]);

  // Intersection observer setup
  useEffect(() => {
    if (!enabled || isLoading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          loadMore();
        }
      },
      { threshold, rootMargin },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    enabled,
    hasMore,
    isFetchingMore,
    isLoading,
    loadMore,
    rootMargin,
    threshold,
  ]);

  // Reset function
  const reset = useCallback(() => {
    setItems([]);
    setCursor(undefined);
    setHasMore(true);
    setError(null);
    setIsLoading(true);
  }, []);

  return {
    items,
    isLoading,
    isFetchingMore,
    hasMore,
    error,
    loadMoreRef: loadMoreRef as React.RefObject<HTMLDivElement>,
    reset,
  };
}

// Simplified hook for basic infinite scroll without async
interface UseSimpleInfiniteScrollOptions {
  initialCount?: number;
  incrementCount?: number;
  maxCount?: number;
}

export function useSimpleInfiniteScroll(
  totalItems: number,
  options: UseSimpleInfiniteScrollOptions = {},
) {
  const {
    initialCount = 10,
    incrementCount = 10,
    maxCount = totalItems,
  } = options;

  const [visibleCount, setVisibleCount] = useState(
    Math.min(initialCount, maxCount),
  );
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const hasMore = visibleCount < Math.min(totalItems, maxCount);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) =>
            Math.min(prev + incrementCount, maxCount, totalItems),
          );
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, incrementCount, maxCount, totalItems]);

  return {
    visibleCount,
    hasMore,
    loadMoreRef: loadMoreRef as React.RefObject<HTMLDivElement>,
    reset: () => setVisibleCount(Math.min(initialCount, maxCount)),
  };
}
