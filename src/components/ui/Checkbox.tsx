"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
}

function Checkbox({ checked, onChange, label, description, className }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-2.5 cursor-pointer", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-border-subtle accent-alert-red"
      />
      <div className="flex flex-col">
        <span className="text-sm text-white">{label}</span>
        {description && (
          <span className="text-xs text-text-muted">{description}</span>
        )}
      </div>
    </label>
  );
}

export { Checkbox };
export type { CheckboxProps };
