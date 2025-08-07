"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

interface AccessibilityContextType {
  // Configurações visuais
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  largeText: boolean
  focusIndicators: boolean
  
  // Configurações de som
  soundEnabled: boolean
  soundVolume: number
  
  // Configurações de navegação
  keyboardNavigation: boolean
  screenReaderMode: boolean
  
  // Estados do sistema
  announcements: string[]
  
  // Métodos de controle
  increaseFontSize: () => void
  decreaseFontSize: () => void
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  toggleLargeText: () => void
  toggleFocusIndicators: () => void
  toggleSound: () => void
  setSoundVolume: (volume: number) => void
  toggleKeyboardNavigation: () => void
  toggleScreenReaderMode: () => void
  announceToScreenReader: (message: string) => void
  playSound: (soundType: 'click' | 'hover' | 'success' | 'error') => void
  resetAccessibility: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

const DEFAULT_SETTINGS = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  largeText: false,
  focusIndicators: true,
  soundEnabled: false,
  soundVolume: 50,
  keyboardNavigation: true,
  screenReaderMode: false,
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(DEFAULT_SETTINGS.fontSize)
  const [highContrast, setHighContrast] = useState(DEFAULT_SETTINGS.highContrast)
  const [reducedMotion, setReducedMotion] = useState(DEFAULT_SETTINGS.reducedMotion)
  const [largeText, setLargeText] = useState(DEFAULT_SETTINGS.largeText)
  const [focusIndicators, setFocusIndicators] = useState(DEFAULT_SETTINGS.focusIndicators)
  const [soundEnabled, setSoundEnabled] = useState(DEFAULT_SETTINGS.soundEnabled)
  const [soundVolume, setSoundVolumeState] = useState(DEFAULT_SETTINGS.soundVolume)
  const [keyboardNavigation, setKeyboardNavigation] = useState(DEFAULT_SETTINGS.keyboardNavigation)
  const [screenReaderMode, setScreenReaderMode] = useState(DEFAULT_SETTINGS.screenReaderMode)
  const [announcements, setAnnouncements] = useState<string[]>([])
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const announcementTimerRef = useRef<NodeJS.Timeout>()

  // Carregar configurações salvas
  useEffect(() => {
    const loadSettings = () => {
      const settings = {
        fontSize: localStorage.getItem("accessibility-fontSize"),
        highContrast: localStorage.getItem("accessibility-highContrast"),
        reducedMotion: localStorage.getItem("accessibility-reducedMotion"),
        largeText: localStorage.getItem("accessibility-largeText"),
        focusIndicators: localStorage.getItem("accessibility-focusIndicators"),
        soundEnabled: localStorage.getItem("accessibility-soundEnabled"),
        soundVolume: localStorage.getItem("accessibility-soundVolume"),
        keyboardNavigation: localStorage.getItem("accessibility-keyboardNavigation"),
        screenReaderMode: localStorage.getItem("accessibility-screenReaderMode"),
      }

      if (settings.fontSize) setFontSize(Number.parseInt(settings.fontSize))
      if (settings.highContrast) setHighContrast(settings.highContrast === "true")
      if (settings.reducedMotion) setReducedMotion(settings.reducedMotion === "true")
      if (settings.largeText) setLargeText(settings.largeText === "true")
      if (settings.focusIndicators) setFocusIndicators(settings.focusIndicators === "true")
      if (settings.soundEnabled) setSoundEnabled(settings.soundEnabled === "true")
      if (settings.soundVolume) setSoundVolumeState(Number.parseInt(settings.soundVolume))
      if (settings.keyboardNavigation) setKeyboardNavigation(settings.keyboardNavigation === "true")
      if (settings.screenReaderMode) setScreenReaderMode(settings.screenReaderMode === "true")
    }

    loadSettings()

    // Detectar preferências do sistema
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches && !localStorage.getItem("accessibility-reducedMotion")) {
      setReducedMotion(true)
    }

    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    if (contrastQuery.matches && !localStorage.getItem("accessibility-highContrast")) {
      setHighContrast(true)
    }
  }, [])

  // Aplicar configurações de fonte
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--base-font-size', `${fontSize}px`)
    localStorage.setItem("accessibility-fontSize", fontSize.toString())
  }, [fontSize])

  // Aplicar alto contraste
  useEffect(() => {
    const root = document.documentElement
    if (highContrast) {
      root.setAttribute('data-high-contrast', 'true')
    } else {
      root.removeAttribute('data-high-contrast')
    }
    localStorage.setItem("accessibility-highContrast", highContrast.toString())
  }, [highContrast])

  // Aplicar movimento reduzido
  useEffect(() => {
    const root = document.documentElement
    if (reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true')
    } else {
      root.removeAttribute('data-reduced-motion')
    }
    localStorage.setItem("accessibility-reducedMotion", reducedMotion.toString())
  }, [reducedMotion])

  // Aplicar texto grande
  useEffect(() => {
    const root = document.documentElement
    if (largeText) {
      root.setAttribute('data-large-text', 'true')
    } else {
      root.removeAttribute('data-large-text')
    }
    localStorage.setItem("accessibility-largeText", largeText.toString())
  }, [largeText])

  // Aplicar indicadores de foco
  useEffect(() => {
    const root = document.documentElement
    if (focusIndicators) {
      root.setAttribute('data-focus-indicators', 'true')
    } else {
      root.removeAttribute('data-focus-indicators')
    }
    localStorage.setItem("accessibility-focusIndicators", focusIndicators.toString())
  }, [focusIndicators])

  // Aplicar navegação por teclado
  useEffect(() => {
    const root = document.documentElement
    if (keyboardNavigation) {
      root.setAttribute('data-keyboard-navigation', 'true')
    } else {
      root.removeAttribute('data-keyboard-navigation')
    }
    localStorage.setItem("accessibility-keyboardNavigation", keyboardNavigation.toString())
  }, [keyboardNavigation])

  // Aplicar modo leitor de tela
  useEffect(() => {
    const root = document.documentElement
    if (screenReaderMode) {
      root.setAttribute('data-screen-reader', 'true')
    } else {
      root.removeAttribute('data-screen-reader')
    }
    localStorage.setItem("accessibility-screenReaderMode", screenReaderMode.toString())
  }, [screenReaderMode])

  // Salvar configurações de som
  useEffect(() => {
    localStorage.setItem("accessibility-soundEnabled", soundEnabled.toString())
    localStorage.setItem("accessibility-soundVolume", soundVolume.toString())
  }, [soundEnabled, soundVolume])

  // Inicializar contexto de áudio
  useEffect(() => {
    if (soundEnabled && !audioContextRef.current) {
      try {
        audioContextRef.current = new AudioContext()
      } catch (error) {
        console.warn('AudioContext não suportado:', error)
      }
    }
  }, [soundEnabled])

  // Métodos de controle
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24))
    announceToScreenReader(`Tamanho da fonte aumentado para ${fontSize + 2}px`)
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12))
    announceToScreenReader(`Tamanho da fonte diminuído para ${fontSize - 2}px`)
  }

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev)
    announceToScreenReader(`Alto contraste ${!highContrast ? 'ativado' : 'desativado'}`)
  }

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev)
    announceToScreenReader(`Movimento reduzido ${!reducedMotion ? 'ativado' : 'desativado'}`)
  }

  const toggleLargeText = () => {
    setLargeText(prev => !prev)
    announceToScreenReader(`Texto grande ${!largeText ? 'ativado' : 'desativado'}`)
  }

  const toggleFocusIndicators = () => {
    setFocusIndicators(prev => !prev)
    announceToScreenReader(`Indicadores de foco ${!focusIndicators ? 'ativados' : 'desativados'}`)
  }

  const toggleSound = () => {
    setSoundEnabled(prev => !prev)
    announceToScreenReader(`Sons ${!soundEnabled ? 'ativados' : 'desativados'}`)
  }

  const setSoundVolume = (volume: number) => {
    setSoundVolumeState(volume)
    announceToScreenReader(`Volume ajustado para ${volume}%`)
  }

  const toggleKeyboardNavigation = () => {
    setKeyboardNavigation(prev => !prev)
    announceToScreenReader(`Navegação por teclado ${!keyboardNavigation ? 'ativada' : 'desativada'}`)
  }

  const toggleScreenReaderMode = () => {
    setScreenReaderMode(prev => !prev)
    announceToScreenReader(`Modo leitor de tela ${!screenReaderMode ? 'ativado' : 'desativado'}`)
  }

  // Anunciar para leitores de tela
  const announceToScreenReader = (message: string) => {
    setAnnouncements(prev => [...prev, message])
    
    // Limpar anúncio após 3 segundos
    if (announcementTimerRef.current) {
      clearTimeout(announcementTimerRef.current)
    }
    announcementTimerRef.current = setTimeout(() => {
      setAnnouncements([])
    }, 3000)
  }

  // Reproduzir sons
  const playSound = (soundType: 'click' | 'hover' | 'success' | 'error') => {
    if (!soundEnabled || !audioContextRef.current) return

    try {
      const context = audioContextRef.current
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      // Configurar som baseado no tipo
      const soundConfig = {
        click: { frequency: 800, duration: 0.1 },
        hover: { frequency: 600, duration: 0.05 },
        success: { frequency: 523, duration: 0.2 },
        error: { frequency: 200, duration: 0.3 },
      }

      const config = soundConfig[soundType]
      oscillator.frequency.setValueAtTime(config.frequency, context.currentTime)
      gainNode.gain.setValueAtTime((soundVolume / 100) * 0.1, context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + config.duration)

      oscillator.start()
      oscillator.stop(context.currentTime + config.duration)
    } catch (error) {
      console.warn('Erro ao reproduzir som:', error)
    }
  }

  const resetAccessibility = () => {
    setFontSize(DEFAULT_SETTINGS.fontSize)
    setHighContrast(DEFAULT_SETTINGS.highContrast)
    setReducedMotion(DEFAULT_SETTINGS.reducedMotion)
    setLargeText(DEFAULT_SETTINGS.largeText)
    setFocusIndicators(DEFAULT_SETTINGS.focusIndicators)
    setSoundEnabled(DEFAULT_SETTINGS.soundEnabled)
    setSoundVolumeState(DEFAULT_SETTINGS.soundVolume)
    setKeyboardNavigation(DEFAULT_SETTINGS.keyboardNavigation)
    setScreenReaderMode(DEFAULT_SETTINGS.screenReaderMode)
    
    // Limpar localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('accessibility-')) {
        localStorage.removeItem(key)
      }
    })
    
  const value: AccessibilityContextType = {
    fontSize,
    highContrast,
    reducedMotion,
    largeText,
    focusIndicators,
    soundEnabled,
    soundVolume,
    keyboardNavigation,
    screenReaderMode,
    announcements,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleLargeText,
    toggleFocusIndicators,
    toggleSound,
    setSoundVolume,
    toggleKeyboardNavigation,
    toggleScreenReaderMode,
    announceToScreenReader,
    playSound,
    resetAccessibility,
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {/* Região para anúncios de leitores de tela */}
      {announcements.length > 0 && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {announcements[announcements.length - 1]}
        </div>
      )}
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
