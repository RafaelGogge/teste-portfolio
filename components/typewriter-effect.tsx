"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  texts?: string[]
  text?: string
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
  loop?: boolean
}

export function TypewriterEffect({
  texts = [],
  text = "",
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
  loop = true,
}: TypewriterEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Use either texts array or single text
  const textArray = texts.length > 0 ? texts : text ? [text] : [""]

  useEffect(() => {
    if (textArray.length === 0 || !textArray[currentTextIndex]) return

    const timeout = setTimeout(
      () => {
        const fullText = textArray[currentTextIndex] || ""

        if (!isDeleting) {
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.slice(0, currentText.length + 1))
          } else {
            if (textArray.length > 1 && loop) {
              setTimeout(() => setIsDeleting(true), pauseTime)
            }
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, textArray, speed, deleteSpeed, pauseTime, loop])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {currentText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-primary transition-opacity duration-100`}>|</span>
    </span>
  )
}

export default TypewriterEffect