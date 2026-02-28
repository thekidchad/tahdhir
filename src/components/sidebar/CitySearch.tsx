"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CitySearchProps {
  className?: string;
  onSearch?: (term: string) => void;
}

function CitySearch({ className, onSearch }: CitySearchProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className={cn("px-4 py-3", className)}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={t("sidebar.searchCity")}
          className={cn(
            "w-full rounded-lg border border-border-subtle bg-card py-2 pl-9 pr-3 text-sm text-white placeholder-text-muted transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-alert-red/50"
          )}
        />
      </div>
    </div>
  );
}

export { CitySearch };
