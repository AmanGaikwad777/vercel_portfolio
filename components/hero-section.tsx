"use client"

import { useRef } from "react"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { useParallaxContext } from "./parallax-provider"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { mouseXPercent, mouseYPercent, scrollY } = useParallaxContext()

  // Direct cursor offset - no easing for instant response
  const cursorX = (mouseXPercent - 0.5) * 2
  const cursorY = (mouseYPercent - 0.5) * 2

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax paint splashes - fast movement */}
      <div
        className="absolute top-20 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 60}px, ${cursorY * 40 - scrollY * 0.5}px)`,
        }}
      />
      <div
        className="absolute top-40 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 80}px, ${cursorY * 60 - scrollY * 0.8}px)`,
        }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 50}px, ${-cursorY * 30 - scrollY * 0.3}px)`,
        }}
      />

      {/* Paint stroke accents - reactive */}
      <div 
        className="absolute top-1/4 left-10 w-2 h-32 bg-primary opacity-70"
        style={{
          transform: `rotate(${12 + cursorX * 20}deg) translateY(${-scrollY * 0.6}px)`,
        }}
      />
      <div 
        className="absolute top-1/3 right-20 w-3 h-24 bg-secondary opacity-60"
        style={{
          transform: `rotate(${-6 + cursorY * 25}deg) translateY(${-scrollY * 0.5}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-1.5 h-20 bg-primary opacity-50"
        style={{
          transform: `rotate(${45 + cursorX * 30}deg) translateY(${-scrollY * 0.4}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-2 h-16 bg-secondary opacity-50"
        style={{
          transform: `rotate(${-30 + cursorY * 20}deg) translateY(${-scrollY * 0.35}px)`,
        }}
      />

      {/* Content with cursor parallax */}
      <div 
        className="relative z-10 text-center px-6"
        style={{
          transform: `translate(${cursorX * -30}px, ${cursorY * -25 - scrollY * 0.15}px)`,
        }}
      >
        <div>
          <p 
            className="text-secondary font-mono text-sm md:text-base mb-4 tracking-wider"
            style={{
              transform: `translateX(${cursorX * 20}px)`,
              opacity: Math.max(0, 1 - scrollY / 300),
            }}
          >
            DATA SCIENCE & AI ENGINEER
          </p>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"
            style={{
              transform: `translateY(${cursorY * -20}px)`,
            }}
          >
            Aman
            <span className="text-primary"> Gaikwad</span>
          </h1>
          <p 
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{
              transform: `translateX(${cursorX * -15}px)`,
              opacity: Math.max(0, 1 - scrollY / 400),
            }}
          >
            Building intelligent systems that solve real-world problems.
            <br />
            <span className="text-foreground">ML Pipelines</span> /{" "}
            <span className="text-primary">Computer Vision</span> /{" "}
            <span className="text-secondary">Deep Learning</span>
          </p>
        </div>

        {/* Social Links */}
        <div 
          className="mt-10 flex items-center justify-center gap-6"
          style={{
            transform: `translateY(${cursorY * 25}px)`,
            opacity: Math.max(0, 1 - scrollY / 500),
          }}
        >
          <a
            href="https://github.com/amangaikwad777"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-150 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/amangaikwad777"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-150 hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:amangaikwad777@gmail.com"
            className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-150 hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll indicator */}
        <a 
          href="#about" 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          style={{
            opacity: Math.max(0, 1 - scrollY / 150),
          }}
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </div>

      {/* Bottom fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{
          opacity: Math.min(1, scrollY / 150),
        }}
      />
    </section>
  )
}
