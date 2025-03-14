
import { LucideProps, Rocket, Menu, X } from "lucide-react";

export type IconProps = LucideProps;

// Custom parachute icon SVG path
const Parachute = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2c-3.47 0-6.34 2.53-7.5 6C2.02 12 12 22 12 22s9.98-10 7.5-14c-1.16-3.47-4.03-6-7.5-6z" />
    <path d="M8 10l3 3" />
    <path d="M16 10l-3 3" />
    <path d="M12 2v5" />
    <path d="M5 8h3" />
    <path d="M16 8h3" />
  </svg>
);

export const Icons = {
  logo: Parachute,
  menu: Menu,
  close: X,
};
