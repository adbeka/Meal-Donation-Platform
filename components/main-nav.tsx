"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isRestaurantOwner = user?.user_metadata?.is_restaurant_owner

  const navItems = [
    {
      name: "Find Restaurants",
      href: "/restaurants",
    },
    {
      name: "Track Pickups",
      href: "/pickups",
    },
    {
      name: "Donations",
      href: "/donations",
    },
    {
      name: "History",
      href: "/history",
    },
    {
      name: "Impact",
      href: "/impact",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "About Us",
      href: "/about",
    },
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href || pathname?.startsWith(`${item.href}/`)
                ? "text-foreground font-semibold"
                : "text-foreground/60",
            )}
          >
            {item.name}
          </Link>
        ))}
        {isRestaurantOwner && (
          <Link
            href="/restaurant/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/restaurant") ? "text-foreground font-semibold" : "text-foreground/60",
            )}
          >
            Restaurant Dashboard
          </Link>
        )}
      </nav>
    </div>
  )
}
