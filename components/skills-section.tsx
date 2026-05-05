"use client"

import { useRef, useEffect, useState } from "react"
import { useParallaxContext } from "./parallax-provider"

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C++", "Dart", "HTML/CSS"],
    color: "primary",
  },
  {
    title: "ML/DL Frameworks",
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "XGBoost"],
    color: "secondary",
  },
  {
    title: "Data & Analytics",
    skills: ["Pandas", "NumPy", "SQL", "MySQL", "Power BI"],
    color: "primary",
  },
  {
    title: "App Development",
    skills: ["Flutter", "Firebase", "REST APIs", "State Management"],
    color: "secondary",
  },
  {
    title: "Tools & Cloud",
    skills: ["Git/GitHub", "Linux", "Jupyter", "Google Colab", "VS Code"],
    color: "primary",
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { mouseXPercent, mouseYPercent, scrollY } = useParallaxContext()
  const [sectionTop, setSectionTop] = useState(0)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

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
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Paint splashes - fast response */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 130}px, ${sectionProgress * 200 + cursorY * 70}px)`,
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-primary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 100}px, ${-sectionProgress * 160 + cursorY * 60}px)`,
        }}
      />

      {/* Paint strokes */}
      <div 
        className="absolute top-40 right-0 w-40 h-1.5 bg-primary opacity-60"
        style={{
          transform: `scaleX(${sectionProgress * 1.5}) rotate(${cursorY * 10}deg)`,
          transformOrigin: "right",
        }}
      />
      <div 
        className="absolute bottom-1/4 left-0 w-24 h-1.5 bg-secondary opacity-60"
        style={{
          transform: `scaleX(${sectionProgress * 2}) rotate(${-cursorX * 15}deg)`,
          transformOrigin: "left",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div 
          className="text-center mb-16"
          style={{
            transform: `translateY(${(1 - sectionProgress) * 45}px) translateX(${cursorX * -20}px)`,
            opacity: sectionProgress,
          }}
        >
          <span className="text-secondary font-mono text-sm tracking-wider">04</span>
          <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3
            const isHovered = hoveredCategory === index
            
            return (
              <div
                key={category.title}
                className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-150"
                style={{
                  transform: `
                    perspective(1000px) 
                    rotateY(${isHovered ? cursorX * 15 : cursorX * 3}deg) 
                    rotateX(${isHovered ? cursorY * -12 : cursorY * -2}deg)
                    translateX(${(col - 1) * (1 - sectionProgress) * 40}px)
                    translateY(${(1 - sectionProgress) * (50 + row * 30)}px)
                    scale(${isHovered ? 1.05 : 1})
                  `,
                  opacity: sectionProgress,
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Top color accent */}
                <div
                  className={`absolute top-0 left-6 right-6 h-1 rounded-b ${
                    category.color === "primary" ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{
                    transform: `scaleX(${sectionProgress})`,
                  }}
                />

                <span
                  className={`text-5xl font-bold opacity-10 absolute top-4 right-4 ${
                    category.color === "primary" ? "text-primary" : "text-secondary"
                  }`}
                  style={{
                    transform: `translateX(${cursorX * -15}px)`,
                  }}
                >
                  0{index + 1}
                </span>

                <h3
                  className={`text-lg font-semibold mb-4 ${
                    category.color === "primary" ? "text-primary" : "text-secondary"
                  }`}
                >
                  {category.title}
                </h3>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 group/skill"
                      style={{
                        transform: `translateX(${(1 - sectionProgress) * (15 + skillIndex * 4)}px) translateX(${cursorX * (3 + skillIndex)}px)`,
                        opacity: sectionProgress,
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-transform duration-150 group-hover/skill:scale-150 ${
                          category.color === "primary" ? "bg-primary" : "bg-secondary"
                        }`}
                      />
                      <span className="text-muted-foreground group-hover/skill:text-foreground transition-colors duration-150">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
