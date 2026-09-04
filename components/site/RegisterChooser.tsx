"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/Primitives";

type Choice = "brand" | "architect";

const OPTIONS: { value: Choice; label: string; helper: string }[] = [
  { value: "brand", label: "Brand", helper: "to Exhibit Products" },
  { value: "architect", label: "Architect/Designer", helper: "to Attend the Paid Conference" },
];

const NEXT_STEP: Record<Choice, { href: string; label: string }> = {
  brand: { href: "/register/sponsor", label: "Book Your Stall — Exhibit Your Brand" },
  architect: { href: "/register/architect", label: "Continue to Architect Registration" },
};

export function RegisterChooser() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [touched, setTouched] = useState(false);

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <fieldset>
        <legend className="text-center text-[15px] font-semibold text-bone">
          Are you connecting as a...<span className="text-copper"> *Required</span>
        </legend>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {OPTIONS.map((opt) => {
            const active = choice === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setChoice(opt.value);
                  setTouched(true);
                }}
                aria-pressed={active}
                className={`panel p-6 text-left transition-all duration-300 ${
                  active ? "border-copper ring-1 ring-copper" : "hover:border-mist/40"
                }`}
              >
                <span className="text-[16px] font-bold uppercase tracking-[0.03em]">{opt.label}</span>
                <span className="mt-1 block text-[13.5px] text-mist">{opt.helper}</span>
              </button>
            );
          })}
        </div>

        {touched && !choice && (
          <p className="mt-3 text-center text-[12.5px] text-copper">Please choose one to continue.</p>
        )}
      </fieldset>

      <div className="mt-8 flex justify-center">
        {choice ? (
          <Link href={NEXT_STEP[choice].href} className="btn btn-fill">
            {NEXT_STEP[choice].label}
            <Arrow />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            onClick={() => setTouched(true)}
            className="btn btn-fill cursor-not-allowed opacity-40"
          >
            Continue
            <Arrow />
          </button>
        )}
      </div>
    </div>
  );
}
