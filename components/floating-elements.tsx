"use client"

import { useParallaxContext } from "./parallax-provider"
import { useMemo } from "react"

// Geometric shapes that appear/disappear based on scroll
function ScrollShape({ 
  type, 
  scrollTrigger, 
  scrollRange, 
  baseX, 
  baseY, 
  size, 
  color, 
  rotation 
}: { 
  type: "circle" | "ring" | "triangle" | "square" | "line" | "cross" | "diamond" | "arc"
  scrollTrigger: number
  scrollRange: number
  baseX: number
  baseY: number
  size: number
  color: "primary" | "secondary" | "white"
  rotation: number
}) {
  const { scrollProgress, mouseXPercent, mouseYPercent } = useParallaxContext()
  
  // Calculate visibility based on scroll position
  const distanceFromTrigger = Math.abs(scrollProgress - scrollTrigger)
  const opacity = Math.max(0, 1 - distanceFromTrigger / scrollRange)
  const scale = 0.3 + opacity * 0.7
  
  // Cursor influence
  const cursorOffsetX = (mouseXPercent - 0.5) * 30
  const cursorOffsetY = (mouseYPercent - 0.5) * 20
  
  const colorClass = color === "primary" 
    ? "bg-primary" 
    : color === "secondary" 
    ? "bg-secondary" 
    : "bg-white"
  
  const borderColorClass = color === "primary"
    ? "border-primary"
    : color === "secondary"
    ? "border-secondary"
    : "border-white"

  const style = {
    left: `${baseX + cursorOffsetX * (scrollTrigger + 0.5)}%`,
    top: `${baseY + cursorOffsetY * (scrollTrigger + 0.5)}%`,
    opacity,
    transform: `scale(${scale}) rotate(${rotation + scrollProgress * 180 + cursorOffsetX}deg)`,
  }

  if (type === "circle") {
    return (
      <div
        className={`absolute rounded-full ${colorClass}/60`}
        style={{ ...style, width: size, height: size }}
      />
    )
  }

  if (type === "ring") {
    return (
      <div
        className={`absolute rounded-full border-2 ${borderColorClass}/50 bg-transparent`}
        style={{ ...style, width: size, height: size }}
      />
    )
  }

  if (type === "triangle") {
    return (
      <div
        className="absolute"
        style={style}
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon 
            points="50,10 90,90 10,90" 
            fill="none" 
            stroke={color === "primary" ? "#f97316" : color === "secondary" ? "#3b82f6" : "#ffffff"}
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>
    )
  }

  if (type === "square") {
    return (
      <div
        className={`absolute border-2 ${borderColorClass}/40 bg-transparent`}
        style={{ ...style, width: size, height: size }}
      />
    )
  }

  if (type === "line") {
    return (
      <div
        className={`absolute ${colorClass}/50`}
        style={{ ...style, width: size, height: 2 }}
      />
    )
  }

  if (type === "cross") {
    return (
      <div className="absolute" style={style}>
        <div className={`absolute ${colorClass}/50`} style={{ width: size, height: 2, top: size / 2 - 1 }} />
        <div className={`absolute ${colorClass}/50`} style={{ width: 2, height: size, left: size / 2 - 1 }} />
      </div>
    )
  }

  if (type === "diamond") {
    return (
      <div
        className={`absolute border-2 ${borderColorClass}/40 bg-transparent`}
        style={{ ...style, width: size, height: size, transform: `${style.transform} rotate(45deg)` }}
      />
    )
  }

  if (type === "arc") {
    return (
      <div className="absolute" style={style}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path 
            d="M 10 50 Q 50 10 90 50" 
            fill="none" 
            stroke={color === "primary" ? "#f97316" : color === "secondary" ? "#3b82f6" : "#ffffff"}
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>
      </div>
    )
  }

  return null
}

// Data particles that stream across the screen
function DataStream({ scrollOffset, direction }: { scrollOffset: number, direction: "left" | "right" }) {
  const { scrollProgress, mouseXPercent } = useParallaxContext()
  
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.12,
      size: 2 + Math.random() * 3,
      yOffset: Math.random() * 20 - 10,
    })), [])

  const baseY = scrollOffset * 100
  const visibility = 1 - Math.abs(scrollProgress - scrollOffset) * 3
  
  if (visibility <= 0) return null

  return (
    <div 
      className="absolute w-full pointer-events-none"
      style={{ 
        top: `${baseY}%`, 
        opacity: Math.max(0, visibility),
      }}
    >
      {particles.map((particle) => {
        const xPos = direction === "left" 
          ? ((scrollProgress * 500 + particle.delay * 100) % 120) - 10
          : 110 - ((scrollProgress * 500 + particle.delay * 100) % 120)
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/60"
            style={{
              left: `${xPos + mouseXPercent * 5}%`,
              top: `${50 + particle.yOffset}%`,
              width: particle.size,
              height: particle.size,
            }}
          />
        )
      })}
    </div>
  )
}

// Code-like floating text elements
function FloatingCode({ text, scrollTrigger, x, y }: { text: string, scrollTrigger: number, x: number, y: number }) {
  const { scrollProgress, mouseXPercent, mouseYPercent } = useParallaxContext()
  
  const distance = Math.abs(scrollProgress - scrollTrigger)
  const opacity = Math.max(0, 1 - distance * 4)
  
  if (opacity <= 0) return null

  return (
    <div
      className="absolute font-mono text-xs text-primary/30 whitespace-nowrap"
      style={{
        left: `${x + (mouseXPercent - 0.5) * 20}%`,
        top: `${y + (mouseYPercent - 0.5) * 10}%`,
        opacity,
        transform: `translateY(${(scrollProgress - scrollTrigger) * 100}px)`,
      }}
    >
      {text}
    </div>
  )
}

// Neural network node connections
function NeuralNodes({ scrollTrigger }: { scrollTrigger: number }) {
  const { scrollProgress, mouseXPercent, mouseYPercent } = useParallaxContext()
  
  const distance = Math.abs(scrollProgress - scrollTrigger)
  const opacity = Math.max(0, 1 - distance * 3)
  
  if (opacity <= 0) return null

  const nodes = [
    { x: 10, y: 30 }, { x: 25, y: 50 }, { x: 15, y: 70 },
    { x: 40, y: 25 }, { x: 45, y: 55 }, { x: 35, y: 80 },
    { x: 60, y: 35 }, { x: 70, y: 60 }, { x: 55, y: 75 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg className="w-full h-full">
        {/* Connections */}
        {nodes.slice(0, 3).map((node, i) => 
          nodes.slice(3, 6).map((target, j) => (
            <line
              key={`${i}-${j}`}
              x1={`${node.x + (mouseXPercent - 0.5) * 5}%`}
              y1={`${node.y + (mouseYPercent - 0.5) * 3}%`}
              x2={`${target.x + (mouseXPercent - 0.5) * 8}%`}
              y2={`${target.y + (mouseYPercent - 0.5) * 5}%`}
              stroke="#f97316"
              strokeWidth="1"
              opacity="0.15"
            />
          ))
        )}
        {nodes.slice(3, 6).map((node, i) => 
          nodes.slice(6, 9).map((target, j) => (
            <line
              key={`mid-${i}-${j}`}
              x1={`${node.x + (mouseXPercent - 0.5) * 8}%`}
              y1={`${node.y + (mouseYPercent - 0.5) * 5}%`}
              x2={`${target.x + (mouseXPercent - 0.5) * 10}%`}
              y2={`${target.y + (mouseYPercent - 0.5) * 7}%`}
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.15"
            />
          ))
        )}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={`${node.x + (mouseXPercent - 0.5) * (5 + i * 2)}%`}
            cy={`${node.y + (mouseYPercent - 0.5) * (3 + i)}%`}
            r="4"
            fill={i < 3 ? "#f97316" : i < 6 ? "#ffffff" : "#3b82f6"}
            opacity="0.4"
          />
        ))}
      </svg>
    </div>
  )
}

// Grid pattern that fades in/out
function GridPattern({ scrollTrigger }: { scrollTrigger: number }) {
  const { scrollProgress, mouseXPercent, mouseYPercent } = useParallaxContext()
  
  const distance = Math.abs(scrollProgress - scrollTrigger)
  const opacity = Math.max(0, 0.15 - distance * 0.5)
  
  if (opacity <= 0) return null

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ 
        opacity,
        transform: `translate(${(mouseXPercent - 0.5) * 20}px, ${(mouseYPercent - 0.5) * 20}px)`,
      }}
    >
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// Binary rain effect
function BinaryRain({ scrollTrigger }: { scrollTrigger: number }) {
  const { scrollProgress, mouseXPercent } = useParallaxContext()
  
  const distance = Math.abs(scrollProgress - scrollTrigger)
  const opacity = Math.max(0, 1 - distance * 4)
  
  const columns = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      x: 5 + i * 8,
      speed: 0.5 + Math.random() * 0.5,
      chars: Array.from({ length: 6 }, () => Math.random() > 0.5 ? "1" : "0"),
    })), [])
  
  if (opacity <= 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none font-mono text-xs" style={{ opacity }}>
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute text-secondary/30 flex flex-col gap-1"
          style={{
            left: `${col.x + (mouseXPercent - 0.5) * 3}%`,
            top: `${((scrollProgress * col.speed * 200) % 150) - 50}%`,
          }}
        >
          {col.chars.map((char, j) => (
            <span key={j} style={{ opacity: 1 - j * 0.15 }}>{char}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function FloatingElements() {
  const { mouseXPercent, mouseYPercent, scrollProgress } = useParallaxContext()

  // Shapes configuration - appear at different scroll positions
  const shapes = [
    // Hero section shapes
    { type: "ring" as const, scrollTrigger: 0, scrollRange: 0.2, baseX: 85, baseY: 15, size: 60, color: "primary" as const, rotation: 0 },
    { type: "triangle" as const, scrollTrigger: 0.05, scrollRange: 0.15, baseX: 10, baseY: 70, size: 40, color: "secondary" as const, rotation: 15 },
    { type: "circle" as const, scrollTrigger: 0, scrollRange: 0.2, baseX: 90, baseY: 80, size: 12, color: "primary" as const, rotation: 0 },
    
    // About section shapes
    { type: "square" as const, scrollTrigger: 0.15, scrollRange: 0.15, baseX: 5, baseY: 20, size: 35, color: "secondary" as const, rotation: 10 },
    { type: "cross" as const, scrollTrigger: 0.2, scrollRange: 0.15, baseX: 92, baseY: 45, size: 30, color: "primary" as const, rotation: 0 },
    { type: "diamond" as const, scrollTrigger: 0.18, scrollRange: 0.15, baseX: 75, baseY: 85, size: 25, color: "white" as const, rotation: 0 },
    
    // Experience section shapes
    { type: "arc" as const, scrollTrigger: 0.35, scrollRange: 0.15, baseX: 8, baseY: 30, size: 80, color: "primary" as const, rotation: -20 },
    { type: "ring" as const, scrollTrigger: 0.4, scrollRange: 0.15, baseX: 88, baseY: 65, size: 45, color: "secondary" as const, rotation: 0 },
    { type: "line" as const, scrollTrigger: 0.38, scrollRange: 0.15, baseX: 20, baseY: 80, size: 100, color: "white" as const, rotation: -5 },
    
    // Projects section shapes
    { type: "triangle" as const, scrollTrigger: 0.55, scrollRange: 0.15, baseX: 92, baseY: 20, size: 50, color: "primary" as const, rotation: 45 },
    { type: "circle" as const, scrollTrigger: 0.5, scrollRange: 0.2, baseX: 5, baseY: 50, size: 20, color: "secondary" as const, rotation: 0 },
    { type: "square" as const, scrollTrigger: 0.6, scrollRange: 0.15, baseX: 85, baseY: 85, size: 30, color: "white" as const, rotation: 20 },
    
    // Skills section shapes
    { type: "cross" as const, scrollTrigger: 0.72, scrollRange: 0.15, baseX: 10, baseY: 25, size: 35, color: "secondary" as const, rotation: 15 },
    { type: "diamond" as const, scrollTrigger: 0.75, scrollRange: 0.15, baseX: 90, baseY: 40, size: 28, color: "primary" as const, rotation: 0 },
    { type: "arc" as const, scrollTrigger: 0.78, scrollRange: 0.15, baseX: 50, baseY: 90, size: 60, color: "white" as const, rotation: 180 },
    
    // Contact section shapes
    { type: "ring" as const, scrollTrigger: 0.9, scrollRange: 0.15, baseX: 15, baseY: 30, size: 55, color: "primary" as const, rotation: 0 },
    { type: "triangle" as const, scrollTrigger: 0.92, scrollRange: 0.15, baseX: 80, baseY: 70, size: 45, color: "secondary" as const, rotation: -30 },
    { type: "circle" as const, scrollTrigger: 0.95, scrollRange: 0.1, baseX: 50, baseY: 20, size: 15, color: "white" as const, rotation: 0 },
  ]

  // Code snippets that float by
  const codeSnippets = [
    { text: "const AI = await model.train()", scrollTrigger: 0.12, x: 5, y: 15 },
    { text: "import tensorflow as tf", scrollTrigger: 0.28, x: 75, y: 25 },
    { text: "predictions = model.predict(X)", scrollTrigger: 0.45, x: 8, y: 80 },
    { text: "accuracy: 0.9847", scrollTrigger: 0.62, x: 82, y: 70 },
    { text: "loss.backward()", scrollTrigger: 0.78, x: 12, y: 60 },
    { text: "deployed: true", scrollTrigger: 0.92, x: 70, y: 35 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large ambient paint blobs - faster movement */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]"
        style={{
          left: `${-15 + mouseXPercent * 30 + scrollProgress * 20}%`,
          top: `${-10 + mouseYPercent * 20}%`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[80px]"
        style={{
          right: `${-10 + (1 - mouseXPercent) * 25}%`,
          top: `${20 + (1 - mouseYPercent) * 15 + scrollProgress * 30}%`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[60px]"
        style={{
          left: `${40 + mouseXPercent * 15}%`,
          bottom: `${-5 + mouseYPercent * 10}%`,
        }}
      />

      {/* Grid patterns at specific scroll positions */}
      <GridPattern scrollTrigger={0.3} />
      <GridPattern scrollTrigger={0.7} />

      {/* Neural network visualization */}
      <NeuralNodes scrollTrigger={0.5} />

      {/* Binary rain effect */}
      <BinaryRain scrollTrigger={0.25} />
      <BinaryRain scrollTrigger={0.65} />

      {/* Data streams */}
      <DataStream scrollOffset={0.15} direction="right" />
      <DataStream scrollOffset={0.45} direction="left" />
      <DataStream scrollOffset={0.75} direction="right" />

      {/* Geometric shapes that appear/disappear */}
      {shapes.map((shape, i) => (
        <ScrollShape key={i} {...shape} />
      ))}

      {/* Floating code snippets */}
      {codeSnippets.map((snippet, i) => (
        <FloatingCode key={i} {...snippet} />
      ))}

      {/* Cursor trail dots */}
      <div
        className="absolute w-3 h-3 rounded-full bg-primary/50"
        style={{
          left: `${mouseXPercent * 100}%`,
          top: `${mouseYPercent * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-6 h-6 rounded-full border border-primary/30"
        style={{
          left: `${mouseXPercent * 100}%`,
          top: `${mouseYPercent * 100}%`,
          transform: "translate(-50%, -50%) scale(1.5)",
        }}
      />
    </div>
  )
}
