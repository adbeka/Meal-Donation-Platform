import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="mx-auto mb-6 h-12 w-64" />
          <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
          <Skeleton className="mx-auto h-64 w-full rounded-xl sm:h-80 md:h-96" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Skeleton className="mb-4 h-10 w-48" />
            <Skeleton className="mb-4 h-24 w-full" />
            <Skeleton className="mb-6 h-24 w-full" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-6 w-36" />
            </div>
          </div>
          <Skeleton className="h-64 rounded-xl sm:h-80" />
        </div>
      </section>

      {/* Impact Section */}
      <section className="mb-16 rounded-xl bg-green-50 p-8">
        <Skeleton className="mx-auto mb-8 h-10 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <Skeleton className="mb-4 h-14 w-14 rounded-full" />
                <Skeleton className="mb-2 h-8 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <Skeleton className="mx-auto mb-8 h-10 w-48" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="mx-auto mb-4 h-40 w-40 rounded-full" />
              <Skeleton className="mx-auto mb-1 h-6 w-32" />
              <Skeleton className="mx-auto h-4 w-24" />
            </div>
          ))}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="rounded-xl bg-green-100 p-8">
        <div className="mx-auto max-w-3xl text-center">
          <Skeleton className="mx-auto mb-4 h-10 w-64" />
          <Skeleton className="mx-auto mb-6 h-16 w-full max-w-2xl" />
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Skeleton className="mx-auto h-12 w-32 sm:mx-0" />
            <Skeleton className="mx-auto h-12 w-32 sm:mx-0" />
          </div>
        </div>
      </section>
    </div>
  )
}
