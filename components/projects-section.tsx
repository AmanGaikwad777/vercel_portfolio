"use client"

import { useRef, useEffect, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { useParallaxContext } from "./parallax-provider"

const githubProfile = "https://github.com/AmanGaikwad777"

const projects = [
  {
    title: "Real/Fake Image Classifier",
    description:
      "Computer vision model using EfficientNet to classify real vs AI-generated images with high accuracy.",
    skills: ["EfficientNet", "TensorFlow", "Computer Vision"],
    category: "CV",
    color: "primary",
    link: "https://github.com/AmanGaikwad777/Real-and-Fake-Image-Classifier",
  },
  {
    title: "Dog Breed Classifier",
    description:
      "120-breed classification system using MobileNetV2 transfer learning for accurate dog breed identification.",
    skills: ["MobileNetV2", "Transfer Learning", "Keras"],
    category: "CV",
    color: "secondary",
    link: "https://github.com/AmanGaikwad777/DogBreedClassification",
  },
  {
    title: "LLM-Powered BDD Testing",
    description:
      "Automated testing framework integrating Ollama LLM with Playwright for intelligent behavior-driven development.",
    skills: ["Ollama", "Playwright", "LLM"],
    category: "AI",
    color: "primary",
    link: "https://github.com/AmanGaikwad777/LLM-BDD-Testing",
  },
  {
    title: "SMS Spam Classification",
    description:
      "NLP pipeline for detecting spam messages using machine learning techniques and text processing.",
    skills: ["NLP", "Scikit-Learn", "Text Classification"],
    category: "NLP",
    color: "secondary",
    link: "https://github.com/AmanGaikwad777/SMS_Dataset_Creation_and_Spam_Classification_Work_in_progress",
  },
  {
    title: "Disease Prediction System",
    description:
      "Symptom-based disease prediction model helping users understand potential health conditions.",
    skills: ["ML", "Healthcare AI", "Scikit-Learn"],
    category: "Health",
    color: "primary",
    link: "https://github.com/AmanGaikwad777/disease_predictor",
  },
  {
    title: "Hand Gesture Recognition",
    description:
      "Real-time gesture recognition pipeline using DenseNet and Inception for human-computer interaction.",
    skills: ["DenseNet", "Deep Learning", "Real-time CV"],
    category: "CV",
    color: "secondary",
    link: "https://github.com/AmanGaikwad777/HGR_Using_DenseNet_Inception",
  },
  {
    title: "Flutter Applications Suite",
    description:
      "Production-ready mobile apps including Todo, E-commerce, Habit Tracker with Firebase backends.",
    skills: ["Flutter", "Firebase", "REST API"],
    category: "Mobile",
    color: "primary",
    link: "https://github.com/AmanGaikwad777",
  },
  {
    title: "Automated ML Pipeline",
    description:
      "End-to-end ML pipeline driven by JSON configuration for automated model training and deployment.",
    skills: ["MLOps", "Python", "Automation"],
    category: "MLOps",
    color: "secondary",
    link: "https://github.com/AmanGaikwad777/Automated-Machine-Learning-Pipeline-with-JSON-driven-Configuration",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { mouseXPercent, mouseYPercent, scrollY } = useParallaxContext()
  const [sectionTop, setSectionTop] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            (scrollY - sectionTop + windowHeight * 0.8) /
              (windowHeight * 1.2)
          )
        )
      : 0

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div
        className="absolute top-20 right-20 w-[600px] h-[600px] bg-primary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${-cursorX * 120}px, ${
            sectionProgress * 200 + cursorY * 80
          }px)`,
        }}
      />
      <div
        className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-secondary/12 rounded-full blur-3xl"
        style={{
          transform: `translate(${cursorX * 100}px, ${
            -sectionProgress * 180 + cursorY * 60
          }px)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div
          className="text-center mb-16"
          style={{
            transform: `translateY(${(1 - sectionProgress) * 50}px)`,
            opacity: sectionProgress,
          }}
        >
          <span className="text-primary font-mono text-sm tracking-wider">
            03
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const row = Math.floor(index / 2)
            const col = index % 2
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                onClick={() => window.open(project.link, "_blank")}
                className="group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-150 cursor-pointer"
                style={{
                  transform: `
                    perspective(1000px)
                    rotateY(${isHovered ? cursorX * 12 : cursorX * 3}deg)
                    rotateX(${isHovered ? cursorY * -10 : cursorY * -2}deg)
                    translateX(${
                      col === 0
                        ? (1 - sectionProgress) * -50
                        : (1 - sectionProgress) * 50
                    }px)
                    translateY(${(1 - sectionProgress) * (40 + row * 25)}px)
                    scale(${isHovered ? 1.03 : 1})
                  `,
                  opacity: sectionProgress,
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${
                    project.color === "primary"
                      ? "text-primary bg-primary/20"
                      : "text-secondary bg-secondary/20"
                  }`}
                >
                  {project.category}
                </span>

                <div className="pr-16">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded hover:bg-primary/20 hover:text-primary transition-all duration-150"
                      style={{
                        transform: `translateX(${
                          cursorX * (3 + skillIndex * 2)
                        }px)`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <Github
                    className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(githubProfile, "_blank")
                    }}
                  />
                  <ExternalLink
                    className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.link, "_blank")
                    }}
                  />
                </div>

                <div
                  className={`absolute bottom-0 left-6 right-6 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ${
                    project.color === "primary"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}