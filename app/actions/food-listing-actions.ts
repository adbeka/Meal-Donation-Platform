"use server"

import { createServerClient } from "@/lib/supabase"

type FoodItemData = {
  id?: string
  restaurant_id: string
  name: string
  description: string
  quantity: number
  food_type: string
  pickup_window_start: string
  pickup_window_end: string
  is_available: boolean
}

export async function createFoodItem(data: FoodItemData) {
  const supabase = createServerClient()

  try {
    const { data: foodItem, error } = await supabase.from("food_items").insert(data).select().single()

    if (error) {
      throw error
    }

    return { success: true, foodItem }
  } catch (error: any) {
    console.error("Error creating food item:", error)
    throw new Error(error.message || "Failed to create food item")
  }
}

export async function updateFoodItem(id: string, data: Partial<FoodItemData>) {
  const supabase = createServerClient()

  try {
    const { data: foodItem, error } = await supabase.from("food_items").update(data).eq("id", id).select().single()

    if (error) {
      throw error
    }

    return { success: true, foodItem }
  } catch (error: any) {
    console.error("Error updating food item:", error)
    throw new Error(error.message || "Failed to update food item")
  }
}

export async function deleteFoodItem(id: string) {
  const supabase = createServerClient()

  try {
    const { error } = await supabase.from("food_items").delete().eq("id", id)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error: any) {
    console.error("Error deleting food item:", error)
    throw new Error(error.message || "Failed to delete food item")
  }
}

export async function getRestaurantFoodItems(restaurantId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("food_items")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, foodItems: data }
  } catch (error: any) {
    console.error("Error fetching food items:", error)
    throw new Error(error.message || "Failed to fetch food items")
  }
}

export async function getRestaurantPickups(restaurantId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("pickups")
      .select(`
        *,
        food_items (
          name,
          description,
          quantity,
          food_type
        ),
        profiles:user_id (
          full_name,
          phone,
          email:id
        )
      `)
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, pickups: data }
  } catch (error: any) {
    console.error("Error fetching pickups:", error)
    throw new Error(error.message || "Failed to fetch pickups")
  }
}

export async function getRestaurantById(restaurantId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("restaurants").select("*").eq("id", restaurantId).single()

    if (error) {
      throw error
    }

    return { success: true, restaurant: data }
  } catch (error: any) {
    console.error("Error fetching restaurant:", error)
    throw new Error(error.message || "Failed to fetch restaurant")
  }
}

export async function getUserRestaurant(userId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("restaurants").select("*").eq("owner_id", userId).single()

    if (error) {
      throw error
    }

    return { success: true, restaurant: data }
  } catch (error: any) {
    console.error("Error fetching user restaurant:", error)
    throw new Error(error.message || "Failed to fetch user restaurant")
  }
}

export async function getRestaurantStats(restaurantId: string) {
  const supabase = createServerClient()

  try {
    // Get total number of food items
    const { count: totalFoodItems, error: foodItemsError } = await supabase
      .from("food_items")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", restaurantId)

    if (foodItemsError) throw foodItemsError

    // Get total number of available food items
    const { count: availableFoodItems, error: availableError } = await supabase
      .from("food_items")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", restaurantId)
      .eq("is_available", true)

    if (availableError) throw availableError

    // Get total number of pickups
    const { count: totalPickups, error: pickupsError } = await supabase
      .from("pickups")
      .select("*", { count: "exact", head: true })
      .eq("restaurant_id", restaurantId)

    if (pickupsError) throw pickupsError

    // Get pickups by status
    const { data: pickupsByStatus, error: statusError } = await supabase
      .from("pickups")
      .select("status")
      .eq("restaurant_id", restaurantId)

    if (statusError) throw statusError

    const scheduledPickups = pickupsByStatus.filter((p) => p.status === "scheduled").length
    const inProgressPickups = pickupsByStatus.filter((p) => p.status === "in-progress").length
    const completedPickups = pickupsByStatus.filter((p) => p.status === "completed").length
    const cancelledPickups = pickupsByStatus.filter((p) => p.status === "cancelled").length

    return {
      success: true,
      stats: {
        totalFoodItems: totalFoodItems || 0,
        availableFoodItems: availableFoodItems || 0,
        totalPickups: totalPickups || 0,
        scheduledPickups,
        inProgressPickups,
        completedPickups,
        cancelledPickups,
      },
    }
  } catch (error: any) {
    console.error("Error fetching restaurant stats:", error)
    throw new Error(error.message || "Failed to fetch restaurant statistics")
  }
}

export async function updatePickupStatus(pickupId: string, status: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("pickups").update({ status }).eq("id", pickupId).select().single()

    if (error) {
      throw error
    }

    return { success: true, pickup: data }
  } catch (error: any) {
    console.error("Error updating pickup status:", error)
    throw new Error(error.message || "Failed to update pickup status")
  }
}
