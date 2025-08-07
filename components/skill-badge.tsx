"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: ReactNode
}

export function SkillBadge({ children, variant = "default", size = "md", className, icon }: SkillBadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 hover:scale-105"

  const variantClasses = {
    default: "bg-muted/10 text-muted-foreground hover:bg-muted/20",
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    accent: "bg-success/10 text-success hover:bg-success/20",
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <span className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </span>
  )
}

export default SkillBadge
