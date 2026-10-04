"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

type DebouncedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onDebouncedChange: (value: string) => void;
  delayMs: number;
};

/**
 * Text input with local state that only notifies the parent after the user stops typing.
 * External value changes (e.g. "clear filters") are synced back without clobbering typing.
 */
export function DebouncedInput({ value, onDebouncedChange, delayMs, ...inputProps }: DebouncedInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const lastEmittedRef = useRef(value);
  const emitDebounced = useDebouncedCallback((next: string) => {
    lastEmittedRef.current = next;
    onDebouncedChange(next);
  }, delayMs);

  useEffect(() => {
    if (value !== lastEmittedRef.current) {
      lastEmittedRef.current = value;
      setLocalValue(value);
    }
  }, [value]);

  return (
    <input
      {...inputProps}
      value={localValue}
      onChange={(event) => {
        setLocalValue(event.target.value);
        emitDebounced(event.target.value);
      }}
    />
  );
}
