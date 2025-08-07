"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessibilityContextType {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  increaseFontSize: () => void
  decreaseFontSize: () => void
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  resetAccessibility: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize")
    const savedHighContrast = localStorage.getItem("highContrast")
    const savedReducedMotion = localStorage.getItem("reducedMotion")

    if (savedFontSize) setFontSize(Number.parseInt(savedFontSize))
    if (savedHighContrast) setHighContrast(savedHighContrast === "true")
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === "true")
  }, [])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
    localStorage.setItem("fontSize", fontSize.toString())
  }, [fontSize])

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", highContrast.toString())
  }, [highContrast])

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }
    localStorage.setItem("reducedMotion", reducedMotion.toString())
  }, [reducedMotion])

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12))
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev)
  }

  const resetAccessibility = () => {
    setFontSize(16)
    setHighContrast(false)
    setReducedMotion(false)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        reducedMotion,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleReducedMotion,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
