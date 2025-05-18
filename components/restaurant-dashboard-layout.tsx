"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Utensils, Truck, Heart, History, User, Settings, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface RestaurantDashboardLayoutProps {
  children: React.ReactNode
}

export function RestaurantDashboardLayout({ children }: RestaurantDashboardLayoutProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const routes = [
    {
      href: "/restaurant/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
      active: pathname === "/restaurant/dashboard",
    },
    {
      href: "/restaurant/food-listings",
      label: "Food Listings",
      icon: <Utensils className="h-5 w-5 mr-3" />,
      active: pathname === "/restaurant/food-listings" || pathname.startsWith("/restaurant/food-listings/"),
    },
    {
      href: "/restaurant/pickups",
      label: "Manage Pickups",
      icon: <Truck className="h-5 w-5 mr-3" />,
      active: pathname === "/restaurant/pickups",
    },
    {
      href: "/donations",
      label: "Donations",
      icon: <Heart className="h-5 w-5 mr-3" />,
      active: pathname === "/donations",
    },
    {
      href: "/history",
      label: "History",
      icon: <History className="h-5 w-5 mr-3" />,
      active: pathname === "/history",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5 mr-3" />,
      active: pathname === "/profile",
    },
    {
      href: "/restaurant/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-3" />,
      active: pathname === "/restaurant/settings",
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-green-600">Restaurant Dashboard</h1>
        </div>
        <div className="flex-1 px-4 py-2">
          <nav className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  route.active ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="flex justify-around">
          {routes.slice(0, 5).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn("flex flex-col items-center py-2 px-3", route.active ? "text-green-600" : "text-gray-600")}
            >
              {route.icon.props.children}
              <span className="text-xs mt-1">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
