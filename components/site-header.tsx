"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-1 rounded-md">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl">MealShare</span>
          </Link>
        </div>
        <MainNav />
        <div className="flex items-center gap-2">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm" className="hidden md:flex">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button size="sm" className="hidden md:flex bg-green-600 hover:bg-green-700" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm" className="hidden md:flex">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild size="sm" className="hidden md:flex bg-green-600 hover:bg-green-700">
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
