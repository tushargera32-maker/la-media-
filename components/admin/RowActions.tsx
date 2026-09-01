"use client";

import { useTransition } from "react";

/* ==================================================================
   ROW ACTIONS

   A status dropdown that saves on change, and a delete with a
   confirmation. useTransition keeps the row responsive while the server
   action runs, and disables the control so a fast double-change can't
   race itself.
   ================================================================== */

export function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (next: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        startTransition(async () => {
          await onChange(next);
        });
      }}
      className="rounded border border-black/15 bg-white px-2 py-1 text-[12px] capitalize disabled:opacity-50"
    >
      {options.map((option) => (
        <option key={option} value={option} className="capitalize">
          {option}
        </option>
      ))}
    </select>
  );
}

export function DeleteButton({
  onDelete,
  label = "Delete",
  confirmText = "Delete this permanently?",
}: {
  onDelete: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await onDelete();
        });
      }}
      className="text-[12px] text-neutral-400 transition-colors hover:text-[#8C1D34] disabled:opacity-50"
    >
      {pending ? "…" : label}
    </button>
  );
}

/**
 * Handled checkbox for a registration row.
 * Optimistic-free on purpose: the checkbox reflects the database, and the
 * transition keeps it disabled until the server confirms.
 */
export function HandledToggle({
  handled,
  onToggle,
}: {
  handled: boolean;
  onToggle: (next: boolean) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <label className="flex cursor-pointer items-center gap-2 text-[12px] text-neutral-500">
      <input
        type="checkbox"
        checked={handled}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.checked;
          startTransition(async () => {
            await onToggle(next);
          });
        }}
        className="h-4 w-4 accent-[#8C1D34] disabled:opacity-50"
      />
      {handled ? "Done" : "Open"}
    </label>
  );
}
