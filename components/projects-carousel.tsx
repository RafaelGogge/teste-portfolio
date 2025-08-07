"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Star,
  Clock,
  Shield,
  Lock,
  Zap,
  Info,
  ArrowUpRight,
  Grid3X3,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/use-i18n";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  isPrivate?: boolean;
  priority?: "high" | "medium" | "low";
  category?: string;
  status?: string;
  developmentTime?: string;
  features?: string[];
  impact?: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const priorityConfig = {
  high: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    icon: Star,
    label: "Alta",
  },
  medium: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: Clock,
    label: "Média",
  },
  low: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: Clock,
    label: "Baixa",
  },
};

const statusConfig = {
  "Em produção": {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    pulse: true,
  },
  Concluído: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    pulse: false,
  },
  "Em desenvolvimento": {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    pulse: true,
  },
};

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { t } = useI18n();

  // Auto-scroll do carrossel
  useEffect(() => {
    if (isPlaying && !isGridView && !selectedProject && !isHoveringCard) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev: number) => (prev + 1) % projects.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isGridView, selectedProject, isHoveringCard, projects.length]);

  // Bloquear scroll do body quando modal está aberto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleProjectHover = (project: Project | null) => {
    setIsHoveringCard(!!project);
    // Removido: não abre mais o modal no hover
  };

  const handleProjectClick = (project: Project) => {
    if (isGridView) {
      // No grid view, apenas navegar para o link se não for privado
      if (!project.isPrivate && project.liveUrl !== "#") {
        window.open(project.liveUrl, "_blank", "noopener,noreferrer");
      }
    } else {
      // No carrossel, abrir modal do projeto
      setSelectedProject(project);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProjectAccess = (url: string, isPrivate: boolean) => {
    if (isPrivate || url === "#" || !url) {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX =
      "changedTouches" in event
        ? event.changedTouches[0].clientX
        : event.clientX;
    const dragDistance = dragStart - clientX;
    const threshold = 100;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Swipe left - next slide
        setCurrentIndex((prev: number) => (prev + 1) % projects.length);
      } else {
        // Swipe right - previous slide
        setCurrentIndex(
          (prev: number) => (prev - 1 + projects.length) % projects.length
        );
      }
    }

    setIsDragging(false);
    setDragStart(0);
  };

  // Carrossel View
  if (!isGridView) {
    return (
      <div className="relative w-full overflow-hidden">
        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-muted/50 border border-border hover:bg-muted"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isPlaying ? "Pausar" : "Play"}
          </Button>
          <Button
            onClick={() => setIsGridView(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-muted/50 border border-border hover:bg-muted"
          >
            <Grid3X3 className="w-4 h-4" />
            Ver Grid
          </Button>
        </div>

        {/* Carrossel */}
        <div
          className="relative h-80 overflow-hidden rounded-2xl carousel-container"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <motion.div
            className="flex h-full"
            animate={{
              x: `-${currentIndex * 100}%`,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="min-w-full h-full relative cursor-pointer group carousel-item"
                onMouseEnter={() => handleProjectHover(project)}
                onMouseLeave={() => handleProjectHover(null)}
                onClick={() => handleProjectClick(project)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(event: any, info: { offset: { x: number } }) => {
                  if (Math.abs(info.offset.x) > 100) {
                    if (info.offset.x > 0) {
                      setCurrentIndex(
                        (prev: number) =>
                          (prev - 1 + projects.length) % projects.length
                      );
                    } else {
                      setCurrentIndex(
                        (prev: number) => (prev + 1) % projects.length
                      );
                    }
                  }
                }}
              >
                {/* Background Image */}
                <motion.img
                  src={project.image || "/placeholder.svg?height=320&width=800"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    project.isPrivate ? "grayscale opacity-70" : ""
                  }`}
                  style={{
                    filter:
                      isHoveringCard && selectedProject === project
                        ? "brightness(1.1) saturate(1.2)"
                        : "brightness(0.9) saturate(1)",
                  }}
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                {/* Private Project Overlay */}
                {project.isPrivate && (
                  <>
                    {/* Overlay sutil sempre visível */}
                    <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-[1px]" />

                    {/* Badge pequeno no canto */}
                    <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-warning/80 backdrop-blur-sm rounded-lg text-xs font-semibold text-warning-foreground shadow-lg">
                        <Lock className="w-3 h-3" />
                        <span>Privado</span>
                      </div>
                    </div>

                    {/* Informação completa apenas no hover */}
                    <div className="absolute inset-0 bg-warning/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Lock className="w-12 h-12 text-warning mx-auto" />
                        <p className="text-warning font-bold">
                          Projeto Privado
                        </p>
                        <p className="text-warning/90 text-sm px-4">
                          Acesso restrito - Funcionários SESA
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Project stats */}
                    <div className="flex flex-wrap gap-4">
                      {project.category && (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30">
                          {project.category}
                        </span>
                      )}
                      {project.developmentTime && (
                        <span className="px-3 py-1 bg-muted/50 text-foreground/80 text-sm rounded-full border border-border">
                          {project.developmentTime}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/20">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">
                        Clique para explorar
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted hover:bg-muted/70"
              }`}
            />
          ))}
        </div>

        {/* Modal do projeto */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-background/98 backdrop-blur-xl border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
                style={{ position: "relative" }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[85vh]">
                  {/* Header */}
                  <div className="relative">
                    <img
                      src={
                        selectedProject.image ||
                        "/placeholder.svg?height=300&width=600"
                      }
                      alt={selectedProject.title}
                      className={`w-full h-48 object-cover rounded-t-2xl ${
                        selectedProject.isPrivate ? "grayscale opacity-50" : ""
                      }`}
                    />
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>

                    {selectedProject.isPrivate && (
                      <div className="absolute inset-0 flex items-center justify-center bg-amber-500/30 backdrop-blur-sm rounded-t-2xl">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                          <p className="text-amber-300 font-semibold">
                            Projeto Privado
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Tecnologias
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-muted/60 text-foreground/80 border border-border"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    {selectedProject.features &&
                      selectedProject.features.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            Features
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedProject.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground/80 text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Impact */}
                    {selectedProject.impact && (
                      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-success text-sm leading-relaxed">
                            {selectedProject.impact}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      {selectedProject.liveUrl &&
                        selectedProject.liveUrl !== "#" &&
                        !selectedProject.isPrivate && (
                          <Button
                            onClick={() =>
                              handleProjectAccess(
                                selectedProject.liveUrl,
                                selectedProject.isPrivate || false
                              )
                            }
                            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-foreground"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo ao Vivo
                          </Button>
                        )}
                      {selectedProject.githubUrl &&
                        selectedProject.githubUrl !== "#" &&
                        selectedProject.githubUrl !== "" && (
                          <Button
                            onClick={() =>
                              handleProjectAccess(
                                selectedProject.githubUrl,
                                false
                              )
                            }
                            variant="outline"
                            className="flex-1 border border-border hover:bg-muted"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Código
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Grid View
  return (
    <div className="space-y-8">
      {/* Header do Grid */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Todos os Projetos</h3>
          <p className="text-zinc-400">Visualização completa dos projetos</p>
        </div>
        <Button
          onClick={() => setIsGridView(false)}
          variant="outline"
          size="sm"
          className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-700/50"
        >
          Voltar ao Carrossel
        </Button>
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
          >
            <div className="bg-gradient-to-br from-background/95 to-muted/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full flex flex-col">
              {/* Header com imagem */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                  src={project.image || "/placeholder.svg?height=280&width=500"}
                  alt={project.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    project.isPrivate ? "grayscale opacity-50" : ""
                  }`}
                />

                {/* Priority badge */}
                {project.priority && priorityConfig[project.priority] && (
                  <div className="absolute top-4 left-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                        priorityConfig[project.priority].bg
                      } ${
                        priorityConfig[project.priority].border
                      } border backdrop-blur-xl`}
                    >
                      {project.priority === "high" && (
                        <Star
                          className={`w-3 h-3 ${
                            priorityConfig[project.priority].color
                          }`}
                        />
                      )}
                      {project.priority === "medium" && (
                        <Clock
                          className={`w-3 h-3 ${
                            priorityConfig[project.priority].color
                          }`}
                        />
                      )}
                      {project.priority === "low" && (
                        <Clock
                          className={`w-3 h-3 ${
                            priorityConfig[project.priority].color
                          }`}
                        />
                      )}
                      <span
                        className={`text-xs font-semibold ${
                          priorityConfig[project.priority].color
                        }`}
                      >
                        {priorityConfig[project.priority].label}
                      </span>
                    </div>
                  </div>
                )}

                {/* Status badge */}
                {project.status &&
                  statusConfig[project.status as keyof typeof statusConfig] && (
                    <div className="absolute top-4 right-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                          statusConfig[
                            project.status as keyof typeof statusConfig
                          ].bg
                        } ${
                          statusConfig[
                            project.status as keyof typeof statusConfig
                          ].border
                        } border backdrop-blur-xl`}
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full ${statusConfig[
                            project.status as keyof typeof statusConfig
                          ].color.replace("text-", "bg-")}`}
                          animate={
                            statusConfig[
                              project.status as keyof typeof statusConfig
                            ].pulse
                              ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span
                          className={`text-xs font-semibold ${
                            statusConfig[
                              project.status as keyof typeof statusConfig
                            ].color
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  )}

                {/* Development time badge */}
                {project.developmentTime && (
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/80 border border-zinc-600/50 backdrop-blur-xl">
                      <Calendar className="w-3 h-3 text-zinc-300" />
                      <span className="text-xs font-medium text-zinc-300">
                        {project.developmentTime}
                      </span>
                    </div>
                  </div>
                )}

                {/* Private project overlay */}
                {project.isPrivate && (
                  <>
                    {/* Overlay sutil sempre visível */}
                    <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-[1px]" />

                    {/* Badge pequeno no canto */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/80 backdrop-blur-sm rounded-lg text-xs font-semibold text-amber-100 shadow-lg">
                        <Lock className="w-3 h-3" />
                        <span>Privado</span>
                      </div>
                    </div>

                    {/* Informação completa apenas no hover */}
                    <div className="absolute inset-0 bg-amber-500/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Lock className="w-10 h-10 text-amber-400 mx-auto" />
                        <p className="text-amber-300 font-bold">
                          Projeto Privado
                        </p>
                        <p className="text-amber-200/90 text-sm px-4">
                          Acesso restrito - Funcionários SESA
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
              </div>

              {/* Content completo */}
              <div className="p-6 space-y-5 flex-grow flex flex-col">
                {/* Título e categoria */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors flex-1 mr-3">
                      {project.title}
                    </h3>
                    {project.isPrivate && (
                      <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                    )}
                  </div>

                {project.category && (
                  <span className="inline-block px-3 py-1.5 bg-muted/80 text-foreground/80 text-xs rounded-lg font-semibold border border-border">
                    {project.category}
                  </span>
                )}
                </div>

                {/* Descrição completa */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex-grow space-y-4">
                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          Features principais:
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features
                          .slice(0, 4)
                          .map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              <span className="text-foreground/80 text-xs line-clamp-1">
                                {feature}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Impact */}
                  {project.impact && (
                    <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <p className="text-success text-xs leading-relaxed font-medium line-clamp-2">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Technologies completas */}
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-foreground">
                      Tecnologias:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies
                        .slice(0, 5)
                        .map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            className="bg-muted/60 text-foreground/80 text-xs border border-border hover:bg-muted transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.technologies.length > 5 && (
                        <Badge className="bg-muted/60 text-foreground/80 text-xs border border-border">
                          +{project.technologies.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-zinc-700/50">
                  {project.liveUrl &&
                    project.liveUrl !== "#" &&
                    !project.isPrivate && (
                      <Button
                        onClick={() =>
                          handleProjectAccess(
                            project.liveUrl,
                            project.isPrivate || false
                          )
                        }
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo ao Vivo
                      </Button>
                    )}
                  {project.githubUrl &&
                    project.githubUrl !== "#" &&
                    project.githubUrl !== "" && (
                      <Button
                        onClick={() =>
                          handleProjectAccess(project.githubUrl, false)
                        }
                        variant="outline"
                        className="flex-1 border-zinc-700 hover:bg-zinc-800"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </Button>
                    )}
                  {(!project.liveUrl || project.liveUrl === "#") &&
                    (!project.githubUrl ||
                      project.githubUrl === "" ||
                      project.githubUrl === "#") &&
                    project.isPrivate && (
                      <div className="flex-1 text-center py-2 text-amber-400 text-sm font-medium">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Acesso Restrito
                      </div>
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
