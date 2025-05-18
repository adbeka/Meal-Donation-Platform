"use server"

import { createServerClient } from "@/lib/supabase"

type PickupData = {
  userId: string
  restaurantId: string
  foodItemId: string
  pickupTime: string
  notes?: string
}

export async function createPickup(data: PickupData) {
  const supabase = createServerClient()

  try {
    // Check if the food item is still available
    const { data: foodItem, error: foodItemError } = await supabase
      .from("food_items")
      .select("*")
      .eq("id", data.foodItemId)
      .eq("is_available", true)
      .single()

    if (foodItemError || !foodItem) {
      throw new Error("Food item is no longer available")
    }

    // Create the pickup
    const { data: pickup, error: pickupError } = await supabase
      .from("pickups")
      .insert({
        user_id: data.userId,
        restaurant_id: data.restaurantId,
        food_item_id: data.foodItemId,
        status: "scheduled",
        pickup_time: data.pickupTime,
        notes: data.notes,
      })
      .select()
      .single()

    if (pickupError) {
      throw pickupError
    }

    // Update the food item to mark it as reserved
    const { error: updateError } = await supabase
      .from("food_items")
      .update({ is_available: false })
      .eq("id", data.foodItemId)

    if (updateError) {
      throw updateError
    }

    return { success: true, pickup }
  } catch (error: any) {
    console.error("Error creating pickup:", error)
    throw new Error(error.message || "Failed to create pickup")
  }
}

export async function getUserPickups(userId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("pickups")
      .select(
        `
        *,
        restaurants:restaurant_id (
          name,
          address,
          city,
          state,
          zip,
          phone
        ),
        food_items:food_item_id (
          name,
          description,
          quantity,
          food_type
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, pickups: data }
  } catch (error: any) {
    console.error("Error fetching user pickups:", error)
    throw new Error(error.message || "Failed to fetch pickups")
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
