import { Suspense } from "react"
import { getImpactData } from "../actions/impact-actions"
import { ImpactDashboard } from "@/components/impact-dashboard"
import { ImpactDashboardSkeleton } from "@/components/impact-dashboard-skeleton"

export const metadata = {
  title: "Impact Dashboard | MealShare",
  description: "See the environmental and social impact of MealShare in reducing food waste and helping communities.",
}

export default async function ImpactPage() {
  const { success, impact, error } = await getImpactData()

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impact Dashboard</h1>
          <p className="text-gray-500">See how MealShare is making a difference</p>
        </div>

        <Suspense fallback={<ImpactDashboardSkeleton />}>
          {success ? (
            <ImpactDashboard impact={impact} />
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <p>Error loading impact data: {error}</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
