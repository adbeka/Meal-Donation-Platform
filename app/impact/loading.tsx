import { ImpactDashboardSkeleton } from "@/components/impact-dashboard-skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impact Dashboard</h1>
          <p className="text-gray-500">See how MealShare is making a difference</p>
        </div>

        <ImpactDashboardSkeleton />
      </div>
    </div>
  )
}
