"use client"

import { createContext, useContext, ReactNode } from "react"
import { useParallax } from "@/hooks/use-parallax"

interface ParallaxContextType {
  scrollY: number
  scrollProgress: number
  mouseX: number
  mouseY: number
  mouseXPercent: number
  mouseYPercent: number
}

const ParallaxContext = createContext<ParallaxContextType>({
  scrollY: 0,
  scrollProgress: 0,
  mouseX: 0,
  mouseY: 0,
  mouseXPercent: 0.5,
  mouseYPercent: 0.5,
})

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const parallax = useParallax()
  
  return (
    <ParallaxContext.Provider value={parallax}>
      {children}
    </ParallaxContext.Provider>
  )
}

export function useParallaxContext() {
  return useContext(ParallaxContext)
}
