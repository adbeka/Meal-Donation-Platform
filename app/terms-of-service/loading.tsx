import { Skeleton } from "@/components/ui/skeleton"

export default function TermsOfServiceLoading() {
  return (
    <div className="container max-w-3xl py-12">
      <Skeleton className="mb-8 h-12 w-48" />

      <div className="space-y-6">
        <Skeleton className="h-4 w-32" />

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
