
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface MainNavItem {
  translationKey: string;
  href: string;
  disabled?: boolean;
}

interface NavLinksProps {
  items: MainNavItem[];
  isMobile?: boolean;
}

export function NavLinks({ items, isMobile = false }: NavLinksProps) {
  const location = useLocation();
  const { t } = useTranslation("navigation");

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn(
      isMobile ? "flex flex-col gap-4 text-sm font-medium" : "flex items-center space-x-6 text-sm font-medium"
    )}>
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            item.disabled && "pointer-events-none opacity-50",
            location.pathname === item.href && "text-primary font-semibold"
          )}
        >
          {t(item.translationKey)}
        </Link>
      ))}
    </nav>
  );
}
