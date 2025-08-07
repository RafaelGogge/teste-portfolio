"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`text-center mb-16 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative"
      >
        {title}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
