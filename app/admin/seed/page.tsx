"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { seedSampleData } from "@/app/actions/seed-data"

export default function SeedDataPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSeedData = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await seedSampleData(user.id)

      if (result.success) {
        setSuccess(true)
      } else {
        setError("Failed to seed data. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Seed Data</h1>
            <p className="text-gray-500">Please log in to seed sample data</p>
          </div>
          <Button asChild className="w-fit bg-green-600 hover:bg-green-700">
            <a href="/login">Log in</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seed Data</h1>
          <p className="text-gray-500">Add sample data to your MealShare account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seed Sample Data</CardTitle>
            <CardDescription>
              This will create sample restaurants and food items associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-50 text-green-600 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Sample data has been successfully added to your account!</AlertDescription>
              </Alert>
            )}
            <p>
              This action will create 4 sample restaurants and their associated food items. This data will be linked to
              your account.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSeedData}
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading || success}
            >
              {isLoading ? "Seeding Data..." : success ? "Data Seeded" : "Seed Sample Data"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
