"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

function LanguageToggle({ className }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "ar") => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("flex gap-1", className)}>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm transition-colors",
          locale === "en"
            ? "bg-card-hover text-white"
            : "text-text-muted hover:text-white"
        )}
      >
        English
      </button>
      <button
        onClick={() => switchLocale("ar")}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm transition-colors",
          locale === "ar"
            ? "bg-card-hover text-white"
            : "text-text-muted hover:text-white"
        )}
      >
        عربية
      </button>
    </div>
  );
}

export { LanguageToggle };
