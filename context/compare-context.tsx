"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

type Package = {
  id: string
  title: string
  [key: string]: any
}

interface CompareContextType {
  packagesToCompare: Package[]
  addToCompare: (pkg: Package) => void
  removeFromCompare: (id: string) => void
  isInCompare: (id: string) => boolean
  clearCompare: () => void
}

export const CompareContext = createContext<CompareContextType>({
  packagesToCompare: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
})

interface CompareProviderProps {
  children: ReactNode
}

export const CompareProvider = ({ children }: CompareProviderProps) => {
  const [packagesToCompare, setPackagesToCompare] = useState<Package[]>([])
  const { toast } = useToast()

  // Load saved packages from localStorage on initial render
  useEffect(() => {
    const savedPackages = localStorage.getItem("packagesToCompare")
    if (savedPackages) {
      try {
        setPackagesToCompare(JSON.parse(savedPackages))
      } catch (error) {
        console.error("Error parsing saved packages:", error)
      }
    }
  }, [])

  // Save packages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("packagesToCompare", JSON.stringify(packagesToCompare))
  }, [packagesToCompare])

  const addToCompare = (pkg: Package) => {
    if (packagesToCompare.length >= 4) {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 4 packages at a time. Please remove one to add another.",
        variant: "destructive",
      })
      return
    }

    if (!isInCompare(pkg.id)) {
      setPackagesToCompare([...packagesToCompare, pkg])
    }
  }

  const removeFromCompare = (id: string) => {
    setPackagesToCompare(packagesToCompare.filter((pkg) => pkg.id !== id))
  }

  const isInCompare = (id: string) => {
    return packagesToCompare.some((pkg) => pkg.id === id)
  }

  const clearCompare = () => {
    setPackagesToCompare([])
  }

  return (
    <CompareContext.Provider
      value={{
        packagesToCompare,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}
