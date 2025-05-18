import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { HelpCircle, Users, Utensils, UserCircle, Package, HeartHandshake, Wrench } from "lucide-react"

export default function FAQLoading() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-10 space-y-2 text-center">
        <Skeleton className="mx-auto h-10 w-[300px]" />
        <Skeleton className="mx-auto h-6 w-[500px]" />
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">For Users</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">For Restaurants</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="pickups" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Pickups</span>
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4" />
            <span className="hidden md:inline">Donations</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden md:inline">Technical</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg border p-6 text-center">
        <Skeleton className="mx-auto h-6 w-[250px] mb-2" />
        <Skeleton className="mx-auto h-4 w-[400px] mb-4" />
        <Skeleton className="mx-auto h-10 w-[150px]" />
      </div>
    </div>
  )
}
