"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { ParallaxProvider } from "@/components/parallax-provider"
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="relative bg-background overflow-x-hidden">
        {/* Global floating paint elements that move with cursor and scroll */}
        <FloatingElements />
        
        <Navigation />
        
        {/* Sections with smooth transitions */}
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </ParallaxProvider>
  )
}
