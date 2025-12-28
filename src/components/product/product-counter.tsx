"use client";

import { useCount } from "@/hooks/use-count";
import { useSizes } from "@/hooks/use-size";
import NumberFlow from "@number-flow/react";
import clsx from "clsx/lite";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Label } from "../ui/label";

const ProductCounter = () => {
  const { sizes } = useSizes();
  const min = 1;
  const max = sizes?.amount ?? 99;
  const { count, setCount } = useCount();
  const [animated, setAnimated] = React.useState(true); // Animation state
  const [showCaret, setShowCaret] = React.useState(true); // Caret visibility state
  const inputRef = React.useRef<HTMLInputElement>(null); // Input reference

  // Handle changes from the input field
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: el,
  }) => {
    setAnimated(false);
    let next = count;

    if (el.value === "") {
      next = 0; // Default to min value if input is empty
    } else {
      const num = parseInt(el.value);
      if (!isNaN(num) && num >= min && num <= max) next = num; // Validate range
    }

    // Manually update the input value to prevent issues like leading zeros
    el.value = String(next);
    setCount(next); // Update the local state
  };

  // Handle pointer down event for increment/decrement buttons
  const handlePointerDown =
    (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      setAnimated(true);

      if (event.pointerType === "mouse") {
        event?.preventDefault();
        inputRef.current?.focus(); // Focus input when buttons are clicked
      }

      const newVal = Math.min(Math.max(count + diff, min), max);
      setCount(newVal); // Update the value with the new value
    };

  return (
    <div className="group flex w-fit items-stretch rounded-md text-3xl font-semibold ring ring-zinc-200 transition-shadow focus-within:ring-2 focus-within:ring-blue-500 dark:ring-zinc-800">
      <button
        aria-hidden
        tabIndex={-1}
        className="flex items-center pr-[.325em] pl-[.5em] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none"
        disabled={count <= min}
        onPointerDown={handlePointerDown(-1)} // Decrement the value
      >
        <Minus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
      </button>

      <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <Label className="sr-only" htmlFor="math">
          quntity cart
        </Label>
        <input
          id="math"
          ref={inputRef}
          className={clsx(
            showCaret ? "caret-primary" : "caret-transparent",
            "spin-hide w-[1.5em] bg-transparent py-2 text-center font-[inherit] text-transparent outline-none",
          )}
          style={{ fontKerning: "none" }}
          min={min}
          step={1}
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={count}
          onInput={handleInput} // Update value when the input changes
        />

        <NumberFlow
          value={count}
          format={{ useGrouping: false }}
          aria-hidden
          animated={animated}
          onAnimationsStart={() => setShowCaret(false)}
          onAnimationsFinish={() => setShowCaret(true)}
          className="pointer-events-none"
          willChange
        />
      </div>

      <button
        aria-hidden
        tabIndex={-1}
        className="flex items-center pr-[.5em] pl-[.325em] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none"
        disabled={count >= max}
        onPointerDown={handlePointerDown(1)} // Increment the value
      >
        <Plus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
      </button>
    </div>
  );
};

export default ProductCounter;
