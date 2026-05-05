"use client"

import { useRef, useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import { useParallaxContext } from "./parallax-provider"

const experiences = [
  {
    period: "2024",
    title: "Kaggle Competition",
    company: "Insurance Premium Prediction",
    description:
      "Developed and optimized predictive models using TabNet, Node, Random Forest, and XGBoost. Demonstrated expertise in hyperparameter tuning, feature engineering, and model evaluation.",
    skills: ["TabNet", "XGBoost", "Random Forest", "Python", "Feature Engineering"],
    color: "primary",
  },
  {
    period: "2024",
    title: "Data Analytics Simulation",
    company: "Accenture via Forage",
    description:
      "Cleaned, modeled, and analyzed 7 distinct datasets to derive actionable business insights. Presented complex data findings via professional PowerPoint presentations.",
    skills: ["Data Analysis", "Power BI", "SQL", "Data Visualization", "Business Intelligence"],
    color: "secondary",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { mouseXPercent, mouseYPercent, scrollY } = useParallaxContext()
  const [sectionTop, setSectionTop] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop)
      }
    }
    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  const cursorX = (mouseXPercent - 0.5) * 2
  const cursorY = (mouseYPercent - 0.5) * 2
  const sectionProgress = Math.max(0, Math.min(1, (scrollY - sectionTop + window.innerHeight * 0.8) / (window.innerHeight)))

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Paint splashes - fast response */}
      <div
        className="absolute top-40 left-0 w-[500px] h-[500px] bg-secondary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 100}px, ${sectionProgress * 180 + cursorY * 70}px)`,
        }}
      />
      <div
        className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-primary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 80}px, ${-sectionProgress * 150 + cursorY * 50}px)`,
        }}
      />

      {/* Paint stroke */}
      <div 
        className="absolute top-1/2 right-0 w-1/4 h-1 bg-gradient-to-l from-secondary to-transparent opacity-70"
        style={{
          transform: `scaleX(${sectionProgress}) translateX(${-cursorX * 50}px)`,
          transformOrigin: "right",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div 
          className="text-center mb-16"
          style={{
            transform: `translateY(${(1 - sectionProgress) * 40}px) translateX(${cursorX * -20}px)`,
            opacity: sectionProgress,
          }}
        >
          <span className="text-secondary font-mono text-sm tracking-wider">02</span>
          <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Experience
          </h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-200"
              style={{
                transform: `
                  perspective(1000px) 
                  rotateY(${cursorX * 5}deg) 
                  rotateX(${cursorY * -3}deg)
                  translateX(${index % 2 === 0 ? (1 - sectionProgress) * -60 : (1 - sectionProgress) * 60}px)
                  translateY(${(1 - sectionProgress) * (30 + index * 20)}px)
                `,
                opacity: sectionProgress,
              }}
            >
              {/* Color accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                  exp.color === "primary" ? "bg-primary" : "bg-secondary"
                }`}
                style={{
                  transform: `scaleY(${sectionProgress})`,
                  transformOrigin: "top",
                }}
              />

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 shrink-0">
                  <span
                    className={`text-4xl font-bold ${
                      exp.color === "primary" ? "text-primary" : "text-secondary"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    {exp.title}
                    <span className="text-muted-foreground font-normal">·</span>
                    <span
                      className={exp.color === "primary" ? "text-primary" : "text-secondary"}
                    >
                      {exp.company}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150 hover:scale-105 ${
                          exp.color === "primary"
                            ? "text-primary bg-primary/10"
                            : "text-secondary bg-secondary/10"
                        }`}
                        style={{
                          transform: `translateY(${(1 - sectionProgress) * (15 + skillIndex * 4)}px) translateX(${cursorX * (5 + skillIndex * 2)}px)`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
