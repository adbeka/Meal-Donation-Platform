import Image from "next/image"
import Link from "next/link"
import { Leaf, Users, Heart, Award, Globe, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About Us | MealShare",
  description: "Learn about MealShare's mission to reduce food waste and fight hunger",
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="text-green-600">MealShare</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Connecting surplus food with those who need it most, one meal at a time.
          </p>
          <div className="flex justify-center">
            <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-96">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Team working together"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-lg text-muted-foreground">
              MealShare was founded with a simple but powerful mission: to reduce food waste while addressing food
              insecurity in our communities.
            </p>
            <p className="mb-6 text-lg text-muted-foreground">
              Every day, restaurants and cafes throw away perfectly good food while many people struggle to put meals on
              the table. We bridge this gap by connecting those with surplus food to those who need it most.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Reduce Food Waste</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <span>Feed Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span>Build Connections</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl sm:h-80">
            <Image src="/placeholder.svg?height=400&width=600" alt="Food donation" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="mb-16 rounded-xl bg-green-50 p-8">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Impact</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">10,000+</h3>
              <p className="text-center text-muted-foreground">Meals Saved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">500+</h3>
              <p className="text-center text-muted-foreground">Restaurant Partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">5,000+</h3>
              <p className="text-center text-muted-foreground">CO₂ Emissions Prevented</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Sam Rivera",
              role: "Head of Operations",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Taylor Kim",
              role: "Community Manager",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Jordan Patel",
              role: "Restaurant Relations",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="rounded-xl bg-green-600 p-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Join Our Mission</h2>
          <p className="mb-6 text-lg">
            Whether you're a restaurant with surplus food or someone looking to make a difference, there's a place for
            you in the MealShare community.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
