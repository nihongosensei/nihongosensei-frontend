import { useSignalEffect } from "@preact/signals";
import type { Signal } from "@preact/signals-core";
import { useRef } from "preact/hooks";

export function useDebounceEffect<T>(
  signal: Signal<T>,
  callback: (value: T) => void | Promise<void>,
  delay: number,
) {
  const timeoutRef = useRef<number>(null);

  useSignalEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    const value = signal.value;

    timeoutRef.current = window.setTimeout(() => callback(value), delay);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  });
}
