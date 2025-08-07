"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  Plus,
  Minus,
  Eye,
  Volume2,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/hooks/use-accessibility";
import { useI18n } from "@/hooks/use-i18n";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const {
    fontSize,
    highContrast,
    reducedMotion,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetAccessibility,
  } = useAccessibility();

  return (
    <>
      {/* Accessibility Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-background/80 hover:bg-background text-foreground hover:text-primary border border-border shadow"
        aria-label={t("accessibility.title")}
        title={t("accessibility.title")}
      >
        <Accessibility className="h-4 w-4" />
      </Button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background border border-border rounded-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                    <Accessibility className="h-5 w-5" />
                    {t("accessibility.title")}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-primary"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Font Size */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("accessibility.fontSize")} {fontSize}px
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decreaseFontSize}
                        className="h-8 w-8 bg-transparent"
                        aria-label={t("accessibility.decreaseFontSize")}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={increaseFontSize}
                        className="h-8 w-8 bg-transparent"
                        aria-label={t("accessibility.increaseFontSize")}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("accessibility.toggleContrast")}
                    </span>
                    <Button
                      variant={highContrast ? "default" : "outline"}
                      size="sm"
                      onClick={toggleHighContrast}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-3 w-3" />
                      {highContrast
                        ? t("accessibility.active")
                        : t("accessibility.inactive")}
                    </Button>
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {t("accessibility.reduceMotion")}
                    </span>
                    <Button
                      variant={reducedMotion ? "default" : "outline"}
                      size="sm"
                      onClick={toggleReducedMotion}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-3 w-3" />
                      {reducedMotion
                        ? t("accessibility.active")
                        : t("accessibility.inactive")}
                    </Button>
                  </div>

                  {/* Reset */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={resetAccessibility}
                      className="w-full flex items-center gap-2 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t("accessibility.reset")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
