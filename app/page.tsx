import Link from "next/link"
import { ArrowRight, Utensils, Truck, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                <span className="text-green-600">MealShare</span> - Fighting Hunger, Reducing Waste
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Connecting surplus food from restaurants with those who need it most. Join our community-driven platform
                to make a difference.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/restaurants">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">How MealShare Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              Our platform makes it easy to connect surplus food with those who need it most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center space-y-2 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Restaurants Share</h3>
              <p className="text-gray-500 text-center">
                Restaurants and cafes list their surplus food that would otherwise go to waste.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Charities Connect</h3>
              <p className="text-gray-500 text-center">
                Local charities and individuals in need can find and arrange pickups.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-green-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Communities Benefit</h3>
              <p className="text-gray-500 text-center">
                Food waste is reduced and people in need receive nutritious meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-green-600">10,000+</h3>
              <p className="text-gray-500 text-center">Meals Shared</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-green-600">500+</h3>
              <p className="text-gray-500 text-center">Participating Restaurants</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-green-600">200+</h3>
              <p className="text-gray-500 text-center">Local Charities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Ready to Make a Difference?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              Join MealShare today and help us create a world where good food feeds people, not landfills.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/restaurants">
                Find Restaurants <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
