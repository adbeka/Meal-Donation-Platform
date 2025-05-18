import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-64" />
        <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
      </section>

      {/* Featured Post */}
      <section className="mb-12">
        <div className="overflow-hidden rounded-xl">
          <Skeleton className="aspect-[2/1] w-full" />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <Skeleton className="aspect-[16/9] w-full" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-5/6" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div className="border-t p-6 pt-4">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="rounded-xl bg-green-50 p-8">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto mb-4 h-8 w-64" />
          <Skeleton className="mx-auto mb-6 h-4 w-full" />
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </section>
    </div>
  )
}
