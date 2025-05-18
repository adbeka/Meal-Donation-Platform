import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Post Header */}
        <div className="mb-8">
          <Skeleton className="mb-4 h-6 w-24" />
          <Skeleton className="mb-4 h-12 w-full" />
          <Skeleton className="mb-2 h-12 w-5/6" />
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <Skeleton className="aspect-[2/1] w-full" />
        </div>

        {/* Social Share */}
        <div className="mb-8 flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Post Content */}
        <div className="mb-12">
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-4 h-6 w-5/6" />
          <Skeleton className="mb-8 h-6 w-4/5" />

          <Skeleton className="mb-4 h-8 w-64" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-8 h-6 w-3/4" />

          <Skeleton className="mb-4 h-8 w-64" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-4 h-6 w-full" />
          <Skeleton className="mb-8 h-6 w-5/6" />
        </div>

        {/* Author Bio */}
        <div className="mb-12 rounded-xl bg-green-50 p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="w-full">
              <Skeleton className="mb-2 h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-8">
          <Skeleton className="mb-6 h-8 w-48" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border bg-card shadow-sm">
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="p-4">
                  <Skeleton className="mb-2 h-4 w-16" />
                  <Skeleton className="mb-2 h-5 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-xl bg-green-50 p-6">
          <div className="text-center">
            <Skeleton className="mx-auto mb-2 h-6 w-48" />
            <Skeleton className="mx-auto mb-4 h-4 w-full max-w-md" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
