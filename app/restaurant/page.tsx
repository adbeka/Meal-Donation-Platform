"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RestaurantRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/restaurant/dashboard")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      <p className="ml-4">Redirecting to dashboard...</p>
    </div>
  )
}
