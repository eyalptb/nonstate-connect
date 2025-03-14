import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"

interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

interface NavbarProps {
  mainNav?: MainNavItem[]
}

const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Impact",
    href: "/impact",
  },
  {
    title: "Funding",
    href: "/funding",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Messaging",
    href: "/messaging",
  },
  {
    title: "Integration Hub",
    href: "/integration-hub",
  },
];

export function Navbar({ mainNav, }: NavbarProps) {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNav?.length ? (
              mainNav.map(
                (item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      item.disabled && "pointer-events-none opacity-50"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              )
            ) : null}
          </nav>
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border-2 border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url || `https://avatar.vercel.sh/${user?.email}.png`} alt={user?.email || "Avatar"} />
                    <AvatarFallback>{profile?.first_name?.[0] || profile?.last_name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in" className="text-sm font-medium hover:underline">
              Sign In
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            {isMenuOpen ? (
              <Icons.close className="h-6 w-6" />
            ) : (
              <Icons.menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden p-4">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {mainNav?.length ? (
              mainNav.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    item.disabled && "pointer-events-none opacity-50"
                  )}
                >
                  {item.title}
                </Link>
              ))
            ) : null}
            <ModeToggle />
            {user ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/profile">Profile</Link>
                <button onClick={() => signOut()}>Logout</button>
              </>
            ) : (
              <Link href="/sign-in">Sign In</Link>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}
