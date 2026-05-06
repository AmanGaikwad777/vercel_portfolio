"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useParallaxContext } from "./parallax-provider"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [windowHeight, setWindowHeight] = useState(0)
  const { scrollY, mouseXPercent } = useParallaxContext()
  const scrolled = scrollY > 50

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (windowHeight === 0) return

    const sections = navItems.map((item) => item.href.slice(1))
    const scrollPosition = scrollY + windowHeight / 3

    let newActiveSection = "home"

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i])

      if (section && section.offsetTop <= scrollPosition) {
        newActiveSection = sections[i]
        break
      }
    }

    setActiveSection((prev) =>
      prev !== newActiveSection ? newActiveSection : prev
    )
  }, [scrollY, windowHeight])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
      style={{
        transform: `translateY(${scrolled ? 0 : -2}px)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            style={{
              transform: `translateX(${(mouseXPercent - 0.5) * -8}px)`,
            }}
          >
            AG<span className="text-primary">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={{
                  transform: `translateY(${
                    (mouseXPercent - 0.5) * (index % 2 === 0 ? 3 : -3)
                  }px)`,
                }}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
                )}
              </a>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1t-XoIwnSwJynyeU81cEGPeX34-8Usqjt/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:scale-105 transition-all duration-300"
            style={{
              transform: `translateX(${(mouseXPercent - 0.5) * 8}px)`,
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}