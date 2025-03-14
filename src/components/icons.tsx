
import { LucideProps, Rocket, Menu, X } from "lucide-react";

export type IconProps = LucideProps;

// Custom parachute icon with 5 hands holding it
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
    {/* Round parachute canopy */}
    <path d="M12 4c-5 0-9 2-9 6s4 8 9 8 9-4 9-8-4-6-9-6z" />
    
    {/* Strings connecting hands to parachute */}
    <path d="M7 10l-2 7" />
    <path d="M9.5 10l-1 7" />
    <path d="M12 10v7" />
    <path d="M14.5 10l1 7" />
    <path d="M17 10l2 7" />
    
    {/* Five hands holding the parachute (simplified) */}
    <path d="M5 17c0.5 0.5 1.5 0.5 2 0" /> {/* Hand 1 */}
    <path d="M8.5 17c0.5 0.5 1 0.5 1.5 0" /> {/* Hand 2 */}
    <path d="M11.5 17c0.5 0.5 1 0.5 1.5 0" /> {/* Hand 3 */}
    <path d="M14.5 17c0.5 0.5 1 0.5 1.5 0" /> {/* Hand 4 */}
    <path d="M17 17c0.5 0.5 1.5 0.5 2 0" /> {/* Hand 5 */}
  </svg>
);

export const Icons = {
  logo: Parachute,
  menu: Menu,
  close: X,
};
