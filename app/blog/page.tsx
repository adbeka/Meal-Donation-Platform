import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog | MealShare",
  description: "Latest news, success stories, and updates from MealShare",
}

const blogPosts = [
  {
    id: 1,
    title: "How MealShare Helped Reduce Food Waste by 30% in Downtown Restaurants",
    excerpt:
      "Learn how local restaurants partnered with MealShare to significantly reduce their food waste while helping the community.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2024",
    author: "Alex Johnson",
    readTime: "5 min read",
    category: "Success Stories",
    slug: "reduce-food-waste-downtown",
  },
  {
    id: 2,
    title: "5 Ways You Can Fight Food Insecurity in Your Community",
    excerpt:
      "Discover practical steps you can take today to help combat food insecurity and make a difference in your local area.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 10, 2024",
    author: "Sam Rivera",
    readTime: "4 min read",
    category: "Tips & Guides",
    slug: "fight-food-insecurity",
  },
  {
    id: 3,
    title: "MealShare Partners with City Council to Expand Food Rescue Program",
    excerpt:
      "Exciting news about our new partnership with the City Council to reach more communities and save more food from going to waste.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 5, 2024",
    author: "Taylor Kim",
    readTime: "3 min read",
    category: "News",
    slug: "city-council-partnership",
  },
  {
    id: 4,
    title: "From Waste to Plate: The Journey of Surplus Food",
    excerpt:
      "Follow the journey of surplus food from restaurant kitchens to the plates of those who need it most through MealShare's platform.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 28, 2024",
    author: "Jordan Patel",
    readTime: "6 min read",
    category: "Behind the Scenes",
    slug: "waste-to-plate-journey",
  },
  {
    id: 5,
    title: "Meet the Heroes: Volunteers Making MealShare Possible",
    excerpt:
      "Spotlight on the dedicated volunteers who help make food pickups and deliveries happen every day across the city.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 20, 2024",
    author: "Alex Johnson",
    readTime: "4 min read",
    category: "Community",
    slug: "volunteer-heroes",
  },
  {
    id: 6,
    title: "The Environmental Impact of Food Waste: Why MealShare Matters",
    excerpt:
      "Explore the environmental consequences of food waste and how platforms like MealShare are making a difference.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2024",
    author: "Sam Rivera",
    readTime: "5 min read",
    category: "Education",
    slug: "environmental-impact",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          MealShare <span className="text-green-600">Blog</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Stories, updates, and insights from our mission to reduce food waste and fight hunger.
        </p>
      </section>

      {/* Featured Post */}
      <section className="mb-12">
        <div className="overflow-hidden rounded-xl">
          <div className="relative">
            <div className="aspect-[2/1] w-full">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Featured blog post"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
              <Badge className="mb-3 bg-green-600 hover:bg-green-700">Featured</Badge>
              <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                How MealShare is Transforming Food Rescue in Urban Areas
              </h2>
              <p className="mb-4 max-w-2xl text-white/90 sm:text-lg">
                An in-depth look at how our platform is changing the way cities think about food waste and community
                support.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Alex Johnson</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>May 18, 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>7 min read</span>
                </div>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700" asChild>
                <Link href="/blog/transforming-food-rescue">Read Article</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full">
            All
          </Button>
          <Button variant="outline" className="rounded-full">
            Success Stories
          </Button>
          <Button variant="outline" className="rounded-full">
            News
          </Button>
          <Button variant="outline" className="rounded-full">
            Tips & Guides
          </Button>
          <Button variant="outline" className="rounded-full">
            Community
          </Button>
          <Button variant="outline" className="rounded-full">
            Education
          </Button>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-[16/9] relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="text-green-600">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-green-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6 pt-4">
                <Button
                  variant="ghost"
                  className="w-full text-green-600 hover:bg-green-50 hover:text-green-700"
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="rounded-xl bg-green-50 p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-muted-foreground">
            Stay updated with the latest news, success stories, and tips from MealShare.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
