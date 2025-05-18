import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl">
        <Skeleton className="mb-8 h-12 w-48" />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-lg" />
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
