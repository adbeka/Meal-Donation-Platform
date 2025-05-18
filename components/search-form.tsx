"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle search
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative px-2">
      <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-9 h-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
