/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns Distance in miles
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180
  const radLon1 = (Math.PI * lon1) / 180
  const radLat2 = (Math.PI * lat2) / 180
  const radLon2 = (Math.PI * lon2) / 180

  // Haversine formula
  const dlon = radLon2 - radLon1
  const dlat = radLat2 - radLat1
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(dlon / 2), 2)
  const c = 2 * Math.asin(Math.sqrt(a))

  // Radius of earth in miles
  const r = 3956

  // Calculate the result
  return c * r
}

/**
 * Format distance in a human-readable way
 * @param distance Distance in miles
 * @returns Formatted distance string
 */
export function formatDistance(distance: number): string {
  if (distance < 0.1) {
    return "< 0.1 miles"
  } else if (distance < 1) {
    return `${(distance * 10).toFixed(0) / 10} miles`
  } else {
    return `${distance.toFixed(1)} miles`
  }
}
