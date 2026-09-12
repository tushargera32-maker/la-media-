"use client";

/*
  One-tap call picker: user picks a senior architect from the dropdown
  and the phone dialer opens straight away. Nothing else, by design.
*/

const ARCHITECTS = [
  { name: "Ar. Arjun Deep", phone: "98880 78580", tel: "tel:+919888078580" },
  { name: "Ar. Neeraj Sharma", phone: "99888 00389", tel: "tel:+919988800389" },
  { name: "Ar. Sham Sunder Gupta", phone: "98151 00385", tel: "tel:+919815100385" },
];

export function ArchitectCallSelect() {
  return (
    <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center">
      <p className="text-center text-[14px] font-semibold text-mist sm:text-[15px]">
        Rather talk? Call a senior architect:
      </p>
      <select
        aria-label="Call a senior architect"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) window.location.href = e.target.value;
          e.target.selectedIndex = 0;
        }}
        className="field-input cursor-pointer sm:w-auto"
      >
        <option value="" disabled>
          Select architect…
        </option>
        {ARCHITECTS.map((a) => (
          <option key={a.tel} value={a.tel}>
            {a.name} — {a.phone}
          </option>
        ))}
      </select>
    </div>
  );
}
