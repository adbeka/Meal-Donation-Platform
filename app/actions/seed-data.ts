"use server"

import { createServerClient } from "@/lib/supabase"

export async function seedSampleData(userId: string) {
  const supabase = createServerClient()

  try {
    // Insert sample restaurants
    const { data: restaurantsData, error: restaurantsError } = await supabase
      .from("restaurants")
      .insert([
        {
          owner_id: userId,
          name: "Green Leaf Cafe",
          description: "Organic cafe with surplus pastries and sandwiches",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          phone: "(555) 123-4567",
          email: "contact@greenleafcafe.com",
          image_url: "/placeholder.svg?height=200&width=300",
          is_active: true,
        },
        {
          owner_id: userId,
          name: "Pasta Paradise",
          description: "Italian restaurant with extra pasta dishes and bread",
          address: "456 Oak Ave",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          phone: "(555) 987-6543",
          email: "contact@pastaparadise.com",
          image_url: "/placeholder.svg?height=200&width=300",
          is_active: true,
        },
        {
          owner_id: userId,
          name: "Sunrise Bakery",
          description: "Fresh bakery with surplus bread and pastries",
          address: "789 Pine St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          phone: "(555) 456-7890",
          email: "contact@sunrisebakery.com",
          image_url: "/placeholder.svg?height=200&width=300",
          is_active: true,
        },
        {
          owner_id: userId,
          name: "Harvest Bowl",
          description: "Healthy bowl restaurant with extra prepared meals",
          address: "101 Cedar Rd",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          phone: "(555) 234-5678",
          email: "contact@harvestbowl.com",
          image_url: "/placeholder.svg?height=200&width=300",
          is_active: true,
        },
      ])
      .select("id")

    if (restaurantsError) {
      throw restaurantsError
    }

    // Get the inserted restaurant IDs
    const restaurants = restaurantsData

    if (restaurants.length === 4) {
      // Insert sample food items for Green Leaf Cafe
      await supabase.from("food_items").insert([
        {
          restaurant_id: restaurants[0].id,
          name: "Assorted Pastries",
          description: "Mix of croissants, muffins, and danishes",
          quantity: 6,
          food_type: "Pastries",
          pickup_window_start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
          pickup_window_end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
          is_available: true,
        },
        {
          restaurant_id: restaurants[0].id,
          name: "Sandwiches",
          description: "Vegetarian and turkey sandwiches",
          quantity: 4,
          food_type: "Sandwiches",
          pickup_window_start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
        {
          restaurant_id: restaurants[0].id,
          name: "Fresh Salads",
          description: "Garden and Caesar salads",
          quantity: 2,
          food_type: "Salads",
          pickup_window_start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
      ])

      // Insert sample food items for Pasta Paradise
      await supabase.from("food_items").insert([
        {
          restaurant_id: restaurants[1].id,
          name: "Pasta Dishes",
          description: "Spaghetti, fettuccine, and penne pasta",
          quantity: 8,
          food_type: "Pasta",
          pickup_window_start: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
          pickup_window_end: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
          is_available: true,
        },
        {
          restaurant_id: restaurants[1].id,
          name: "Bread Rolls",
          description: "Garlic and plain dinner rolls",
          quantity: 12,
          food_type: "Bread",
          pickup_window_start: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
        {
          restaurant_id: restaurants[1].id,
          name: "Tiramisu",
          description: "Classic Italian dessert",
          quantity: 4,
          food_type: "Desserts",
          pickup_window_start: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
      ])

      // Insert sample food items for Sunrise Bakery
      await supabase.from("food_items").insert([
        {
          restaurant_id: restaurants[2].id,
          name: "Bread Loaves",
          description: "Sourdough, whole wheat, and rye bread",
          quantity: 10,
          food_type: "Bread",
          pickup_window_start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          pickup_window_end: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), // 26 hours from now
          is_available: true,
        },
        {
          restaurant_id: restaurants[2].id,
          name: "Pastry Box",
          description: "Assorted pastries and cookies",
          quantity: 24,
          food_type: "Pastries",
          pickup_window_start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
        {
          restaurant_id: restaurants[2].id,
          name: "Birthday Cakes",
          description: "Chocolate and vanilla cakes",
          quantity: 2,
          food_type: "Cakes",
          pickup_window_start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
      ])

      // Insert sample food items for Harvest Bowl
      await supabase.from("food_items").insert([
        {
          restaurant_id: restaurants[3].id,
          name: "Grain Bowls",
          description: "Quinoa and rice bowls with vegetables",
          quantity: 8,
          food_type: "Bowls",
          pickup_window_start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
          pickup_window_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
          is_available: true,
        },
        {
          restaurant_id: restaurants[3].id,
          name: "Green Salads",
          description: "Mixed greens with various toppings",
          quantity: 6,
          food_type: "Salads",
          pickup_window_start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
        {
          restaurant_id: restaurants[3].id,
          name: "Veggie Wraps",
          description: "Hummus and vegetable wraps",
          quantity: 4,
          food_type: "Wraps",
          pickup_window_start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
          pickup_window_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          is_available: true,
        },
      ])
    }

    return { success: true }
  } catch (error) {
    console.error("Error seeding data:", error)
    return { success: false, error }
  }
}
