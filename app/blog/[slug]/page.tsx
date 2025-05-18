import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarIcon, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// This would normally come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "How MealShare Helped Reduce Food Waste by 30% in Downtown Restaurants",
    content: `
      <p>Food waste is a significant problem in the restaurant industry. According to recent studies, restaurants throw away approximately 22 to 33 billion pounds of food each year in the United States alone. This waste has environmental, economic, and social implications.</p>
      
      <p>In downtown areas, where restaurants are concentrated, the problem can be even more acute. That's where MealShare comes in. Our platform connects restaurants with surplus food to individuals and organizations that can put it to good use.</p>
      
      <h2>The Downtown Initiative</h2>
      
      <p>Six months ago, MealShare launched a targeted initiative in the downtown area, partnering with 25 restaurants of various sizes and cuisines. The goal was simple: reduce food waste while helping feed those in need.</p>
      
      <p>The results have been remarkable. In just half a year, participating restaurants have reduced their food waste by an average of 30%. This translates to thousands of pounds of food saved from landfills and instead directed to people who need it.</p>
      
      <h2>How It Works</h2>
      
      <p>The process is straightforward. Restaurants use the MealShare app to list surplus food items at the end of the day or during slow periods. Users can then reserve these items for pickup at a specified time.</p>
      
      <p>For restaurants, this means less waste and a potential tax deduction for donated food. For users, it means access to quality food at reduced prices or, in some cases, for free if they qualify for assistance programs.</p>
      
      <h2>Success Stories</h2>
      
      <p>Cafe Bella, a popular Italian restaurant downtown, used to throw away about 15 pounds of food daily. Owner Maria Rossi says, "Since joining MealShare, we've reduced our waste by almost 90%. It feels good knowing our food is going to people who appreciate it rather than the trash."</p>
      
      <p>Similarly, Green Bowl, a vegan eatery, has found that the platform helps them manage inventory better. "We can now predict our needs more accurately," says chef Sam Lee. "And when we do have extras, we know they'll find a good home."</p>
      
      <h2>Environmental Impact</h2>
      
      <p>The environmental benefits are substantial. Food waste in landfills produces methane, a greenhouse gas 25 times more potent than carbon dioxide. By diverting food from landfills, the downtown initiative has prevented the equivalent of approximately 45 tons of CO2 from entering the atmosphere.</p>
      
      <h2>Looking Ahead</h2>
      
      <p>Given the success of the downtown initiative, MealShare is planning to expand to other neighborhoods in the coming months. The goal is to create a citywide network of restaurants and users, all working together to reduce waste and fight hunger.</p>
      
      <p>"This is just the beginning," says Alex Johnson, founder of MealShare. "We envision a future where no good food goes to waste, and everyone has access to nutritious meals."</p>
      
      <p>If you're a restaurant owner interested in joining MealShare, or if you want to start picking up surplus food, download our app today and be part of the solution.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "May 15, 2024",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Alex Johnson is the founder and CEO of MealShare. With a background in food service and environmental science, Alex is passionate about creating sustainable solutions to food waste and hunger.",
    readTime: "5 min read",
    category: "Success Stories",
    slug: "reduce-food-waste-downtown",
    relatedPosts: [2, 4, 6],
  },
  {
    id: 2,
    title: "5 Ways You Can Fight Food Insecurity in Your Community",
    content: `Content for post 2`,
    image: "/placeholder.svg?height=400&width=600",
    date: "May 10, 2024",
    author: "Sam Rivera",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Sam Rivera is the Head of Operations at MealShare.",
    readTime: "4 min read",
    category: "Tips & Guides",
    slug: "fight-food-insecurity",
    relatedPosts: [1, 3, 5],
  },
  {
    id: 3,
    title: "MealShare Partners with City Council to Expand Food Rescue Program",
    content: `Content for post 3`,
    image: "/placeholder.svg?height=400&width=600",
    date: "May 5, 2024",
    author: "Taylor Kim",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Taylor Kim is the Community Manager at MealShare.",
    readTime: "3 min read",
    category: "News",
    slug: "city-council-partnership",
    relatedPosts: [1, 2, 4],
  },
  {
    id: 4,
    title: "From Waste to Plate: The Journey of Surplus Food",
    content: `Content for post 4`,
    image: "/placeholder.svg?height=400&width=600",
    date: "April 28, 2024",
    author: "Jordan Patel",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Jordan Patel is the Restaurant Relations Manager at MealShare.",
    readTime: "6 min read",
    category: "Behind the Scenes",
    slug: "waste-to-plate-journey",
    relatedPosts: [1, 3, 6],
  },
  {
    id: 5,
    title: "Meet the Heroes: Volunteers Making MealShare Possible",
    content: `Content for post 5`,
    image: "/placeholder.svg?height=400&width=600",
    date: "April 20, 2024",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Alex Johnson is the founder and CEO of MealShare.",
    readTime: "4 min read",
    category: "Community",
    slug: "volunteer-heroes",
    relatedPosts: [2, 3, 6],
  },
  {
    id: 6,
    title: "The Environmental Impact of Food Waste: Why MealShare Matters",
    content: `Content for post 6`,
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2024",
    author: "Sam Rivera",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Sam Rivera is the Head of Operations at MealShare.",
    readTime: "5 min read",
    category: "Education",
    slug: "environmental-impact",
    relatedPosts: [1, 4, 5],
  },
]

export async function generateMetadata({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found | MealShare Blog",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | MealShare Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post.relatedPosts.map((id) => blogPosts.find((post) => post.id === id)).filter(Boolean)

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <div className="mb-8">
          <Badge className="mb-4" variant="outline">
            {post.category}
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* Social Share */}
        <div className="mb-8 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>
        </div>

        {/* Post Content */}
        <div className="prose prose-green mx-auto mb-12 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author Bio */}
        <div className="mb-12 rounded-xl bg-green-50 p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-24 sm:w-24">
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">{post.author}</h3>
              <p className="text-muted-foreground">{post.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="mb-2 line-clamp-2 text-sm font-bold">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-green-600">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{relatedPost.author}</span>
                    <span>{relatedPost.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-xl bg-green-50 p-6">
          <div className="text-center">
            <h3 className="mb-2 text-xl font-bold">Enjoyed this article?</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter to get the latest updates on food rescue and community initiatives.
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
        </div>
      </div>
    </div>
  )
}
