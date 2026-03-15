import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { wait } from "./wait";

describe("wait", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves to true after the default 500ms", async () => {
    const promise = wait();

    vi.advanceTimersByTime(500);

    const result = await promise;
    expect(result).toBe(true);
  });

  it("resolves to true after a custom delay", async () => {
    const promise = wait(1000);

    vi.advanceTimersByTime(1000);

    const result = await promise;
    expect(result).toBe(true);
  });

  it("does not resolve before the delay has elapsed", async () => {
    let resolved = false;

    wait(500).then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(200);
    // Need to flush microtasks
    await vi.advanceTimersByTimeAsync(0);

    expect(resolved).toBe(false);

    vi.advanceTimersByTime(300);
    await vi.advanceTimersByTimeAsync(0);

    expect(resolved).toBe(true);
  });

  it("works with 0ms delay", async () => {
    const promise = wait(0);

    vi.advanceTimersByTime(0);

    const result = await promise;
    expect(result).toBe(true);
  });
});
