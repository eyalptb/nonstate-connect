
import { MainNavItem } from "./NavLinks";

// Navigation items shown to logged out users
export const loggedOutMainNav: MainNavItem[] = [
  {
    translationKey: "home",
    href: "/",
  },
  {
    translationKey: "features",
    href: "/features",
  },
  {
    translationKey: "useCases",
    href: "/use-cases",
  },
  {
    translationKey: "learn",
    href: "/learn",
  },
  {
    translationKey: "pricing",
    href: "/pricing",
  },
  {
    translationKey: "contactSales",
    href: "/contact-sales",
  },
];

// Navigation items shown to logged in users
export const loggedInMainNav: MainNavItem[] = [
  {
    translationKey: "dashboard",
    href: "/dashboard",
  },
  {
    translationKey: "messaging",
    href: "/messaging",
  },
  {
    translationKey: "governance",
    href: "/governance",
  },
  {
    translationKey: "projects",
    href: "/projects",
  },
];

// For backward compatibility
export const defaultMainNav = loggedOutMainNav;
