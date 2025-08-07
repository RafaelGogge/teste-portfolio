"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/hooks/use-i18n"
import { languages, type Language } from "@/lib/i18n"

export function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
        aria-label="Selecionar idioma (Language Selector)"
        data-testid="language-selector"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{languages[language].flag}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50"
          >
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as Language)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-3 ${
                  language === code ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
