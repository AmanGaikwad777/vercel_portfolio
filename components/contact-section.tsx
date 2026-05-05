"use client"

import { useRef, useEffect, useState } from "react"
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { useParallaxContext } from "./parallax-provider"

export function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden flex items-center"
    >
      <div
        className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 130}px, ${
            sectionProgress * 150 + cursorY * 80
          }px)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 110}px, ${
            -sectionProgress * 120 + cursorY * 60
          }px)`,
        }}
      />

      <div
        className="absolute top-1/3 left-10 w-3 h-40 bg-primary opacity-50"
        style={{
          transform: `rotate(${-12 + cursorX * 25}deg) scaleY(${sectionProgress})`,
          transformOrigin: "top",
        }}
      />
      <div
        className="absolute bottom-1/4 right-20 w-2 h-32 bg-secondary opacity-50"
        style={{
          transform: `rotate(${12 + cursorY * 20}deg) scaleY(${sectionProgress})`,
          transformOrigin: "bottom",
        }}
      />

      <div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{
          transform: `translateY(${(1 - sectionProgress) * 60}px)`,
          opacity: sectionProgress,
        }}
      >
        <span className="text-primary font-mono text-sm tracking-wider">05</span>
        <h2
          className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
          style={{
            transform: `translateY(${cursorY * -25}px) translateX(${
              cursorX * -15
            }px)`,
          }}
        >
          Let&apos;s Work
          <span className="text-primary"> Together</span>
        </h2>

        <p
          className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          style={{
            transform: `translateX(${cursorX * -20}px)`,
          }}
        >
          I&apos;m currently looking for opportunities in AI/ML Engineering, Data
          Science, and Computer Vision. Whether you have a question or just want
          to say hi, I&apos;ll try my best to get back to you!
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            transform: `translateY(${(1 - sectionProgress) * 25}px)`,
          }}
        >
          <a
            href="mailto:aman@example.com"
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-all duration-150"
            style={{
              transform: `perspective(500px) rotateY(${cursorX * 8}deg) rotateX(${
                cursorY * -5
              }deg)`,
            }}
          >
            Say Hello
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150" />
          </a>

          <a
            href="/resume.pdf"
            className="flex items-center gap-2 px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-150"
            style={{
              transform: `perspective(500px) rotateY(${
                cursorX * -8
              }deg) rotateX(${cursorY * 5}deg)`,
            }}
          >
            Download Resume
          </a>
        </div>

        <div
          className="mt-16 flex items-center justify-center gap-8"
          style={{
            transform: `translateY(${(1 - sectionProgress) * 40}px)`,
          }}
        >
          {[
            {
              href: "https://github.com/amangaikwad",
              icon: Github,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/amangaikwad",
              icon: Linkedin,
              label: "LinkedIn",
            },
            {
              href: "mailto:aman@example.com",
              icon: Mail,
              label: "Email",
            },
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex flex-col items-center gap-2"
              style={{
                transform: `translateX(${
                  cursorX * (index - 1) * 25
                }px) translateY(${cursorY * 15}px)`,
              }}
            >
              <div className="p-4 rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-150 group-hover:scale-110">
                <social.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        <div
          className="mt-24 pt-8 border-t border-border"
          style={{
            opacity: sectionProgress,
          }}
        >
          <p className="text-sm text-muted-foreground">
            Designed & Built by{" "}
            <span className="text-foreground font-medium">Aman Gaikwad</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  )
}