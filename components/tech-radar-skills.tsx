"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Database,
  Cloud,
  Cog,
  Zap,
  Target,
  Radio,
  Activity,
  Server,
  Power,
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const skillsData = {
  frontend: {
    title: "Front-End",
    icon: Monitor,
    color: "#3b82f6",
    angle: 300, // Posição superior esquerda
    skills: [
      { name: "React", level: 85, category: "framework" },
      { name: "TypeScript", level: 80, category: "language" },
      { name: "Next.js", level: 75, category: "framework" },
      { name: "Tailwind CSS", level: 90, category: "styling" },
      { name: "JavaScript", level: 85, category: "language" },
      { name: "HTML5", level: 95, category: "markup" },
      { name: "CSS3", level: 90, category: "styling" },
    ],
  },
  backend: {
    title: "Back-End",
    icon: Server,
    color: "#10b981",
    angle: 240, // Posição superior direita
    skills: [
      { name: "Node.js", level: 70, category: "runtime" },
      { name: "Python", level: 75, category: "language" },
      { name: "Django", level: 65, category: "framework" },
      { name: "Express", level: 60, category: "framework" },
      { name: "REST APIs", level: 80, category: "api" },
    ],
  },
  database: {
    title: "Banco de Dados",
    icon: Database,
    color: "#8b5cf6",
    angle: 180, // Posição esquerda
    skills: [
      { name: "PostgreSQL", level: 70, category: "relational" },
      { name: "MySQL", level: 65, category: "relational" },
      { name: "SQL", level: 75, category: "query" },
      { name: "Modelagem", level: 60, category: "design" },
    ],
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "#f59e0b",
    angle: 120, // Posição inferior esquerda
    skills: [
      { name: "AWS", level: 50, category: "platform" },
      { name: "Docker", level: 45, category: "container" },
      { name: "Git", level: 85, category: "vcs" },
      { name: "Linux", level: 60, category: "os" },
    ],
  },
  automation: {
    title: "Automação",
    icon: Cog,
    color: "#ef4444",
    angle: 60, // Posição inferior direita
    skills: [
      { name: "GitHub Actions", level: 55, category: "ci/cd" },
      { name: "Automação Web", level: 70, category: "scripting" },
      { name: "APIs", level: 75, category: "integration" },
    ],
  },
  tools: {
    title: "Ferramentas",
    icon: Zap,
    color: "#06b6d4",
    angle: 0, // Posição direita
    skills: [
      { name: "VS Code", level: 95, category: "editor" },
      { name: "Figma", level: 70, category: "design" },
      { name: "Photoshop", level: 60, category: "design" },
      { name: "Postman", level: 80, category: "testing" },
    ],
  },
};

const useResponsivePositions = () => {
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width <= 640) setScreenSize("small");
      else if (width <= 768) setScreenSize("medium");
      else if (width <= 1024) setScreenSize("large");
      else setScreenSize("xlarge");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const getRadius = () => {
    switch (screenSize) {
      case "small": return 110;
      case "medium": return 135;
      case "large": return 160;
      case "xlarge": return 180;
      default: return 160;
    }
  };

  // Função para calcular posição circular baseada no ângulo
  const getCircularPosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius - 40, // Desloca 40px para a esquerda
      y: Math.sin(radians) * radius - 30, // Desloca 30px para cima
    };
  };

  return { getRadius, screenSize, getCircularPosition };
};

export function TechRadarSkills() {
  const { t } = useI18n();
  const { getRadius, screenSize, getCircularPosition } = useResponsivePositions();
  
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [scannerAngle, setScannerAngle] = useState(285); // Inicia próximo ao frontend (300°)
  const [radarActive, setRadarActive] = useState(false);
  const [detectedAreas, setDetectedAreas] = useState<Set<string>>(new Set());
  const [blipAnimations, setBlipAnimations] = useState<Map<string, boolean>>(new Map());

  // Função para normalizar ângulos (0-360)
  const normalizeAngle = (angle: number) => {
    return ((angle % 360) + 360) % 360;
  };

  // Função para verificar se o scanner está detectando uma área
  const isAreaDetected = useCallback((areaAngle: number, scannerAngle: number) => {
    const normalizedScanner = normalizeAngle(scannerAngle);
    const normalizedArea = normalizeAngle(areaAngle);
    
    // Janela de detecção de ±25 graus para melhor experiência
    const detectionWindow = 25;
    
    // Calcular diferença mínima entre ângulos (considerando wrap-around)
    const diff = Math.abs(normalizedScanner - normalizedArea);
    const minDiff = Math.min(diff, 360 - diff);
    
    return minDiff <= detectionWindow;
  }, []);

  // Animação do scanner e detecção de áreas com timing melhorado
  useEffect(() => {
    if (!radarActive) return;

    const interval = setInterval(() => {
      setScannerAngle((prev: number) => {
        const newAngle = (prev + 2) % 360; // Velocidade aumentada para melhor visualização
        
        // Verificar detecção de áreas
        const currentlyDetected = new Set<string>();
        const newBlipAnimations = new Map<string, boolean>();
        
        Object.entries(skillsData).forEach(([key, area]) => {
          if (isAreaDetected(area.angle, newAngle)) {
            currentlyDetected.add(key);
            
            // Triggerar animação de blip se área foi recém-detectada
            if (!detectedAreas.has(key)) {
              newBlipAnimations.set(key, true);
              // Removes blip animation após 1.5 segundos
              setTimeout(() => {
                setBlipAnimations((prev: Map<string, boolean>) => {
                  const updated = new Map(prev);
                  updated.delete(key);
                  return updated;
                });
              }, 1500);
            }
          }
        });
        
        setDetectedAreas(currentlyDetected);
        setBlipAnimations((prev: Map<string, boolean>) => new Map([...prev, ...newBlipAnimations]));
        
        return newAngle;
      });
    }, 40); // Timing otimizado para fluidez

    return () => clearInterval(interval);
  }, [radarActive, detectedAreas, isAreaDetected]);

  const handleRadarToggle = () => {
    setRadarActive(!radarActive);
    if (!radarActive) {
      setDetectedAreas(new Set());
      setBlipAnimations(new Map());
      setScannerAngle(285); // Reset para próximo ao frontend
    }
  };

  const handleAreaClick = (areaKey: string) => {
    setSelectedArea((prev) => (prev === areaKey ? null : areaKey));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] md:min-h-[650px] relative bg-gradient-to-br from-background via-muted to-background rounded-3xl overflow-hidden p-4 md:p-6 backdrop-blur-xl border border-border/50">
      {/* Fundo tecnológico animado */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-muted/10" />

      {/* Header melhorado */}
      <div className="text-center mb-4 z-30 relative">
        <motion.h2
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-muted bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          🎯 Radar de Competências
        </motion.h2>
        
        <motion.div
          className="flex items-center justify-center gap-4 text-sm font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Status do sistema */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 backdrop-blur-sm ${
            radarActive 
              ? "bg-success/20 border-success/60 text-success shadow-lg shadow-success/20" 
              : "bg-warning/20 border-warning/60 text-warning shadow-lg shadow-warning/20"
          }`}>
            <motion.div 
              className={`w-3 h-3 rounded-full ${
                radarActive ? "bg-success" : "bg-warning"
              }`}
              animate={{
                scale: radarActive ? [1, 1.2, 1] : 1,
                opacity: radarActive ? [1, 0.5, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: radarActive ? Infinity : 0,
              }}
            />
            <span className="font-semibold">
              {radarActive ? "Sistema Online" : "Sistema Offline"}
            </span>
          </div>
          
          <div className="text-zinc-500">•</div>
          
          <div className="text-zinc-300 bg-zinc-800/50 px-3 py-2 rounded-full border border-zinc-600/50">
            {radarActive ? (
              <span className="text-yellow-300">
                ⚡ Detectadas: <span className="font-bold text-green-300">{detectedAreas.size}/6</span>
              </span>
            ) : (
              <span>👆 Clique para ativar</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Container do radar principal */}
      <div className="flex items-center justify-center w-full flex-1">
        <div className="relative w-full max-w-[350px] h-[350px] md:max-w-[450px] md:h-[450px] lg:max-w-[500px] lg:h-[500px] flex items-center justify-center">
          
          {/* Círculos concêntricos do radar com animação aprimorada */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                className={`absolute rounded-full border-2 ${
                  radarActive 
                    ? "border-green-400/40 shadow-lg shadow-green-400/20" 
                    : "border-zinc-600/30"
                }`}
                style={{
                  width: `${ring * 22}%`,
                  height: `${ring * 22}%`,
                  maxWidth: `${ring * 130}px`,
                  maxHeight: `${ring * 130}px`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: radarActive ? [0.2, 0.8, 0.2] : 0.3,
                }}
                transition={{
                  scale: { delay: ring * 0.15, duration: 1 },
                  opacity: {
                    duration: radarActive ? 2.5 : 0.5,
                    repeat: radarActive ? Infinity : 0,
                    delay: ring * 0.2,
                  },
                }}
              />
            ))}
          </div>

          {/* Linhas radiais melhoradas */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
              <motion.div
                key={angle}
                className={`absolute origin-bottom ${
                  radarActive
                    ? "bg-gradient-to-t from-green-400/50 via-blue-400/30 to-transparent"
                    : "bg-gradient-to-t from-zinc-500/20 via-zinc-400/10 to-transparent"
                }`}
                style={{
                  width: "1px",
                  height: "50%",
                  maxHeight: "300px",
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8 + (angle / 360) * 0.5, duration: 0.6 }}
              />
            ))}
          </div>

          {/* Scanner linha melhorado */}
          {radarActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute origin-bottom"
                style={{
                  width: "4px",
                  height: "50%",
                  maxHeight: "300px",
                  transform: `translate(-50%, -100%) rotate(${scannerAngle}deg)`,
                  background: "linear-gradient(to top, #00ff00, #00ff0060, transparent)",
                  filter: "drop-shadow(0 0 15px #00ff00) drop-shadow(0 0 25px #00ff0080)",
                  borderRadius: "2px",
                  left: "50%",
                  top: "50%",
                }}
              />
            </div>
          )}

          {/* Efeito de varredura aprimorado */}
          {radarActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute"
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "600px",
                  maxHeight: "600px",
                  transform: `rotate(${scannerAngle}deg)`,
                  background: `conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 0, 0.15) 30deg, rgba(0, 255, 0, 0.05) 60deg, transparent 90deg)`,
                  borderRadius: "50%",
                }}
              />
            </div>
          )}

          {/* Centro do radar com visual melhorado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={handleRadarToggle}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-700 group ${
                radarActive
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-2xl shadow-green-500/50"
                  : "bg-gradient-to-r from-zinc-600 to-zinc-700 shadow-xl shadow-zinc-700/50"
              }`}
              whileTap={{ scale: 0.9 }}
              style={{
                boxShadow: radarActive
                  ? "0 0 40px rgba(34, 197, 94, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                  : "0 0 25px rgba(113, 113, 122, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.05)",
              }}
            >
              <motion.div
                animate={{
                  rotate: radarActive ? 360 : 0,
                }}
                transition={{
                  rotate: {
                    duration: radarActive ? 3 : 0,
                    repeat: radarActive ? Infinity : 0,
                    ease: "linear",
                  },
                }}
              >
                {radarActive ? (
                  <Radio className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                ) : (
                  <Power className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                )}
              </motion.div>

              {/* Anéis de pulso */}
              {radarActive && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-3 border-green-300/60"
                    animate={{ 
                      scale: [1, 2.2, 1], 
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-300/40"
                    animate={{ 
                      scale: [1, 2.8, 1], 
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.8,
                    }}
                  />
                </>
              )}
            </motion.button>
          </div>

          {/* Áreas de competências com posicionamento circular perfeito */}
          {Object.entries(skillsData).map(([key, area]) => {
            const IconComponent = area.icon;
            const isDetected = detectedAreas.has(key);
            const isSelected = selectedArea === key;
            const isHovered = hoveredArea === key;
            const hasBlipAnimation = blipAnimations.has(key);
            
            // Centralização refinada: calcula o centro do container e ajusta o offset para todos os tamanhos
            const radius = getRadius();
            const circularPosition = getCircularPosition(area.angle, radius);
            // O valor de -50% centraliza perfeitamente, sem depender do tamanho do item

            return (
              <motion.div
                key={key}
                className={`absolute ${isSelected ? 'z-50' : 'z-20'}`}
                animate={{
                  left: `calc(50% + ${circularPosition.x}px)`,
                  top: `calc(50% + ${circularPosition.y}px)`,
                  scale: isDetected || isSelected || !radarActive ? 1 : 0.4,
                  opacity: isDetected || isSelected || !radarActive ? 1 : 0.4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.8
                }}
                initial={{
                  left: `calc(50% + ${circularPosition.x}px)`,
                  top: `calc(50% + ${circularPosition.y}px)`,
                  scale: 0,
                  opacity: 0
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                  width: isSelected ? 120 : (screenSize === "small" ? 70 : 80),
                  height: isSelected ? 120 : (screenSize === "small" ? 70 : 80),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.button
                  onClick={() => handleAreaClick(key)}
                  className="relative group focus:outline-none focus:ring-2 focus:ring-blue-400"
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Área ${area.title}`}
                  tabIndex={0}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Efeito blip aprimorado */}
                  {hasBlipAnimation && (
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${area.color}80 0%, ${area.color}40 30%, ${area.color}20 60%, transparent 80%)`,
                        filter: `drop-shadow(0 0 30px ${area.color}) drop-shadow(0 0 50px ${area.color}60)`,
                      }}
                      animate={{
                        scale: [0.5, 3, 0.5],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ 
                        duration: 1.8,
                        ease: "easeOut"
                      }}
                    />
                  )}

                  {/* Container da área melhorado */}
                  <motion.div
                    className={`relative rounded-full border-2 transition-all duration-500 backdrop-blur-md ${
                      isDetected || isSelected || isHovered
                        ? "border-white bg-zinc-800/95 shadow-2xl"
                        : radarActive
                        ? "border-zinc-600/50 bg-zinc-900/70"
                        : "border-zinc-600/70 bg-zinc-900/80"
                    } flex flex-col items-center justify-center`}
                    style={{
                      width: isSelected ? "120px" : (screenSize === "small" ? "70px" : "80px"),
                      height: isSelected ? "120px" : (screenSize === "small" ? "70px" : "80px"),
                      boxShadow: isDetected || isSelected || isHovered
                        ? `0 0 35px ${area.color}70, inset 0 0 20px ${area.color}20`
                        : `0 0 15px ${area.color}40`,
                    }}
                    animate={{
                      scale: isDetected && hasBlipAnimation ? [1, 1.3, 1] : 1,
                      boxShadow: isDetected 
                        ? `0 0 35px ${area.color}70, inset 0 0 20px ${area.color}20`
                        : `0 0 15px ${area.color}40`,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent
                      className={`${isSelected ? 'w-10 h-10 mb-2' : 'w-6 h-6 mb-1'} transition-all duration-500 ${
                        isDetected || isSelected ? "text-white" : "text-zinc-400"
                      }`}
                      style={{
                        color: isDetected || isSelected ? area.color : undefined,
                        filter: isDetected || isSelected 
                          ? `drop-shadow(0 0 12px ${area.color}) drop-shadow(0 0 20px ${area.color}60)` 
                          : "none",
                      }}
                    />
                    <span
                      className={`${isSelected ? 'text-sm' : 'text-xs'} font-semibold text-center leading-tight transition-all duration-500 ${
                        isDetected || isSelected ? "text-white" : "text-zinc-400"
                      }`}
                      style={{
                        fontSize: isSelected ? "14px" : (screenSize === "small" ? "9px" : "10px"),
                        textShadow: isDetected || isSelected 
                          ? `0 0 10px ${area.color}90, 0 0 20px ${area.color}60` 
                          : "none",
                      }}
                    >
                      {area.title}
                    </span>

                    {/* Indicador de detecção */}
                    {isDetected && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          boxShadow: [
                            "0 0 10px rgba(34, 197, 94, 0.6)",
                            "0 0 20px rgba(34, 197, 94, 0.8)",
                            "0 0 10px rgba(34, 197, 94, 0.6)"
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Popup de detalhes aprimorado - só aparece quando está selecionado e no centro */}
                  {selectedArea === key && (
                    <motion.div
                      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      aria-modal="true"
                      role="dialog"
                      tabIndex={-1}
                    >
                      <motion.div
                        className="relative bg-zinc-900/98 backdrop-blur-xl border border-zinc-600/60 rounded-2xl p-6 w-full max-w-md shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 pointer-events-auto"
                        initial={{ scale: 0.85, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.85, y: 40 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{ boxShadow: `0 20px 60px ${area.color}30, 0 0 0 1px ${area.color}40, inset 0 0 20px rgba(0,0,0,0.5)` }}
                        tabIndex={0}
                        aria-label={`Detalhes da área ${area.title}`}
                      >
                        <button
                          className="absolute top-2 right-2 text-zinc-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full"
                          onClick={() => setSelectedArea(null)}
                          aria-label="Fechar detalhes"
                          tabIndex={0}
                        >
                          ×
                        </button>
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="p-2 rounded-xl"
                            style={{ backgroundColor: `${area.color}20`, boxShadow: `inset 0 0 20px ${area.color}30` }}
                          >
                            <IconComponent className="w-6 h-6" style={{ color: area.color }} />
                          </div>
                          <h3 className="text-xl font-bold tracking-wide" style={{ color: area.color }}>
                            {area.title}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {area.skills.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              className="flex flex-col gap-1 bg-zinc-800/70 rounded-lg p-3 border border-zinc-700/50 shadow"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.08 }}
                            >
                              <span className="text-zinc-200 font-medium text-base flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full" style={{ background: area.color }} />
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="w-full h-2 bg-zinc-700/80 rounded-full overflow-hidden border border-zinc-600/50">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: area.color, boxShadow: `inset 0 0 10px ${area.color}60` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ delay: index * 0.08 + 0.2, duration: 0.8, ease: 'easeOut' }}
                                  />
                                </div>
                                <span className="text-xs font-bold w-10 text-right font-mono" style={{ color: area.color }}>
                                  {skill.level}%
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer com instruções aprimorado */}
      <motion.div
        className="text-center mt-4 z-30 space-y-3 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <p className="text-zinc-400 text-base leading-relaxed">
          {radarActive ? (
            <>
              <span className="text-green-400 font-semibold">Radar Ativo!</span> As competências acendem quando detectadas pelo scanner. Explore clicando nas áreas iluminadas!
            </>
          ) : (
            <>
              💡 <span className="text-blue-400 font-semibold">Pronto para explorar?</span> Ative o radar para ver minhas competências sendo detectadas em tempo real como um radar de verdade!
            </>
          )}
        </p>

        {!radarActive && (
          <motion.div
            className="inline-flex items-center gap-6 bg-gradient-to-r from-blue-500/15 to-purple-500/15 backdrop-blur-sm border border-blue-500/30 rounded-2xl px-8 py-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 }}
          >
            <div className="flex items-center gap-3 text-blue-300">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <span className="font-medium">Ativar Sistema</span>
            </div>
            <div className="w-px h-6 bg-blue-500/40"></div>
            <div className="flex items-center gap-3 text-purple-300">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-medium">Explorar Competências</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
