"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface ParallaxState {
  scrollY: number
  scrollProgress: number
  mouseX: number
  mouseY: number
  mouseXPercent: number
  mouseYPercent: number
}

export function useParallax() {
  const [state, setState] = useState<ParallaxState>({
    scrollY: 0,
    scrollProgress: 0,
    mouseX: 0,
    mouseY: 0,
    mouseXPercent: 0.5,
    mouseYPercent: 0.5,
  })
  
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef<ParallaxState>(state)

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const animate = useCallback(() => {
    setState(prev => ({
      scrollY: lerp(prev.scrollY, targetRef.current.scrollY, 0.3),
      scrollProgress: lerp(prev.scrollProgress, targetRef.current.scrollProgress, 0.3),
      mouseX: lerp(prev.mouseX, targetRef.current.mouseX, 0.25),
      mouseY: lerp(prev.mouseY, targetRef.current.mouseY, 0.25),
      mouseXPercent: lerp(prev.mouseXPercent, targetRef.current.mouseXPercent, 0.25),
      mouseYPercent: lerp(prev.mouseYPercent, targetRef.current.mouseYPercent, 0.25),
    }))
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0
      
      targetRef.current = {
        ...targetRef.current,
        scrollY,
        scrollProgress,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        ...targetRef.current,
        mouseX: e.clientX,
        mouseY: e.clientY,
        mouseXPercent: e.clientX / window.innerWidth,
        mouseYPercent: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [animate])

  return state
}
