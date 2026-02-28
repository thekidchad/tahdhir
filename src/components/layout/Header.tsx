"use client";

import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/sidebar/LanguageToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const t = useTranslations();

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-border-subtle bg-sidebar px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-alert-red" />
        <h1 className="text-xl font-bold text-white">
          {t("header.title")}{" "}
          <span className="text-text-muted">{t("header.titleAr")}</span>
        </h1>
      </div>
      <LanguageToggle />
    </header>
  );
}

export { Header };
