"use client"

import { useRef, useEffect, useState } from "react"
import { useParallaxContext } from "./parallax-provider"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { mouseXPercent, mouseYPercent, scrollY } = useParallaxContext()

  const [sectionTop, setSectionTop] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop)
      }
      setWindowHeight(window.innerHeight)
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  const cursorX = (mouseXPercent - 0.5) * 2
  const cursorY = (mouseYPercent - 0.5) * 2

  const sectionProgress =
    windowHeight > 0
      ? Math.max(
          0,
          Math.min(
            1,
            (scrollY - sectionTop + windowHeight * 0.8) / windowHeight
          )
        )
      : 0

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div
        className="absolute -top-20 right-0 w-[600px] h-[600px] bg-primary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 80}px, ${
            sectionProgress * 150 + cursorY * 50
          }px)`,
        }}
      />

      <div
        className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-secondary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 60}px, ${
            -sectionProgress * 120 + cursorY * 40
          }px)`,
        }}
      />

      <div
        className="absolute top-40 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-transparent opacity-70"
        style={{
          transform: `scaleX(${sectionProgress}) translateX(${cursorX * 40}px)`,
          transformOrigin: "left",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            style={{
              transform: `translateX(${cursorX * -40}px) translateY(${
                (1 - sectionProgress) * 30
              }px)`,
              opacity: sectionProgress,
            }}
          >
            <span className="text-primary font-mono text-sm tracking-wider">
              01
            </span>

            <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              About
              <span className="text-secondary"> Me</span>
            </h2>

            <div className="mt-8 relative">
              <div
                className="absolute -left-4 top-0 w-1 bg-primary"
                style={{
                  height: `${sectionProgress * 100}%`,
                }}
              />

              <p className="text-muted-foreground text-lg leading-relaxed pl-6">
                I&apos;m a builder-mindset engineer passionate about transforming
                complex data into intelligent systems.
              </p>
            </div>
          </div>

          <div
            className="space-y-6"
            style={{
              transform: `translateX(${cursorX * 30}px) translateY(${
                (1 - sectionProgress) * 50
              }px)`,
              opacity: sectionProgress,
            }}
          >
            <div
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-200"
              style={{
                transform: `perspective(1000px) rotateY(${
                  cursorX * 8
                }deg) rotateX(${cursorY * -8}deg)`,
              }}
            >
              <h3 className="text-primary font-semibold mb-3">Education</h3>
              <p className="text-foreground font-medium">
                B.Tech in Data Science and AI
              </p>
              <p className="text-muted-foreground">
                IIIT Dharwad | 2022 - 2026
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              My journey started with curiosity about how machines learn and
              evolved into deep expertise in end-to-end ML pipelines—from data
              cleaning and feature engineering to model deployment and
              evaluation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Coursework spanning{" "}
              <span className="text-primary">Data Analytics</span>,{" "}
              <span className="text-secondary">Machine Learning</span>,{" "}
              <span className="text-primary">Neural Networks</span>,{" "}
              <span className="text-secondary">NLP</span>, and{" "}
              <span className="text-primary">Computer Vision</span>.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "AI/ML Engineering",
                "Data Science",
                "Computer Vision",
                "Applied Research",
              ].map((interest, index) => (
                <span
                  key={interest}
                  className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-150 cursor-default"
                  style={{
                    transform: `translateY(${
                      (1 - sectionProgress) * (20 + index * 8)
                    }px) translateX(${cursorX * (10 + index * 5)}px)`,
                    opacity: sectionProgress,
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}