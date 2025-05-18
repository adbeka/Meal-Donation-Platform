"use server"

import { createServerClient } from "@/lib/supabase"

export async function getImpactData() {
  const supabase = createServerClient()

  try {
    // Get total number of completed pickups
    const { count: totalPickups, error: pickupsError } = await supabase
      .from("pickups")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed")

    if (pickupsError) throw pickupsError

    // Get total food items saved (from completed pickups)
    const { data: foodItems, error: foodItemsError } = await supabase
      .from("pickups")
      .select(`
        food_items (
          quantity,
          food_type
        )
      `)
      .eq("status", "completed")

    if (foodItemsError) throw foodItemsError

    // Calculate total food weight saved (assuming average weight per item)
    const totalFoodSaved = foodItems.reduce((total, pickup) => {
      const quantity = pickup.food_items?.quantity || 0
      // Assuming average weight of 0.5 kg per food item
      return total + quantity * 0.5
    }, 0)

    // Get total number of restaurants
    const { count: totalRestaurants, error: restaurantsError } = await supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true })

    if (restaurantsError) throw restaurantsError

    // Get total number of users
    const { count: totalUsers, error: usersError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    if (usersError) throw usersError

    // Calculate environmental impact based on food saved
    // Source: https://www.fao.org/3/bb144e/bb144e.pdf
    const co2Saved = totalFoodSaved * 2.5 // 2.5 kg of CO2 per kg of food waste
    const waterSaved = totalFoodSaved * 1000 // 1000 liters of water per kg of food waste
    const landSaved = totalFoodSaved * 0.001 // 0.001 hectares of land per kg of food waste

    // Calculate social impact
    const mealsProvided = totalFoodSaved * 2 // Assuming 0.5kg provides 2 meals

    // Get monthly data for the last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const { data: monthlyData, error: monthlyError } = await supabase
      .from("pickups")
      .select(`
        created_at,
        food_items (
          quantity
        )
      `)
      .eq("status", "completed")
      .gte("created_at", sixMonthsAgo.toISOString())
      .order("created_at", { ascending: true })

    if (monthlyError) throw monthlyError

    // Process monthly data
    const monthlyStats = processMonthlyData(monthlyData)

    // Get food type distribution
    const { data: foodTypes, error: foodTypesError } = await supabase
      .from("food_items")
      .select("food_type, quantity")
      .order("food_type", { ascending: true })

    if (foodTypesError) throw foodTypesError

    const foodTypeDistribution = processFoodTypeData(foodTypes)

    // Get regional impact
    const { data: regionalData, error: regionalError } = await supabase
      .from("restaurants")
      .select(`
        city,
        pickups!inner (
          status,
          food_items (
            quantity
          )
        )
      `)
      .eq("pickups.status", "completed")

    if (regionalError) throw regionalError

    const regionalImpact = processRegionalData(regionalData)

    return {
      success: true,
      impact: {
        totalPickups: totalPickups || 0,
        totalFoodSaved,
        totalRestaurants: totalRestaurants || 0,
        totalUsers: totalUsers || 0,
        environmental: {
          co2Saved,
          waterSaved,
          landSaved,
        },
        social: {
          mealsProvided,
        },
        monthlyStats,
        foodTypeDistribution,
        regionalImpact,
      },
    }
  } catch (error: any) {
    console.error("Error fetching impact data:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch impact data",
    }
  }
}

// Helper functions for data processing
function processMonthlyData(data: any[]) {
  const months: Record<string, { pickups: number; foodSaved: number; co2Saved: number }> = {}

  data.forEach((pickup) => {
    const date = new Date(pickup.created_at)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const quantity = pickup.food_items?.quantity || 0

    if (!months[monthYear]) {
      months[monthYear] = { pickups: 0, foodSaved: 0, co2Saved: 0 }
    }

    months[monthYear].pickups += 1
    months[monthYear].foodSaved += quantity * 0.5 // kg
    months[monthYear].co2Saved += quantity * 0.5 * 2.5 // kg of CO2
  })

  return Object.entries(months).map(([month, stats]) => ({
    month,
    ...stats,
  }))
}

function processFoodTypeData(data: any[]) {
  const foodTypes: Record<string, number> = {}

  data.forEach((item) => {
    const foodType = item.food_type
    const quantity = item.quantity || 0

    if (!foodTypes[foodType]) {
      foodTypes[foodType] = 0
    }

    foodTypes[foodType] += quantity
  })

  return Object.entries(foodTypes).map(([type, quantity]) => ({
    type,
    quantity,
  }))
}

function processRegionalData(data: any[]) {
  const regions: Record<string, { pickups: number; foodSaved: number }> = {}

  data.forEach((restaurant) => {
    const city = restaurant.city || "Unknown"

    if (!regions[city]) {
      regions[city] = { pickups: 0, foodSaved: 0 }
    }

    restaurant.pickups.forEach((pickup: any) => {
      regions[city].pickups += 1
      regions[city].foodSaved += (pickup.food_items?.quantity || 0) * 0.5 // kg
    })
  })

  return Object.entries(regions).map(([city, stats]) => ({
    city,
    ...stats,
  }))
}
