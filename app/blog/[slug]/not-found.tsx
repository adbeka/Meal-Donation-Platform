import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostNotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-10">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <FileQuestion className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-bold">Article Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, the blog post you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/blog">Back to Blog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
