"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Palette,
  Volume2,
  VolumeX,
  Monitor,
  Moon,
  Sun,
  Zap,
  Globe,
  Save,
  RotateCcw,
  X,
  Slider as SliderIcon,
  Eye,
  Keyboard,
  MousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAccessibility } from "@/hooks/use-accessibility";

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");

  const {
    soundEnabled,
    soundVolume,
    reducedMotion,
    highContrast,
    toggleSound,
    setSoundVolume,
    toggleReducedMotion,
    toggleHighContrast,
    playSound,
    announceToScreenReader,
  } = useAccessibility();

  const [settings, setSettings] = useState({
    theme: "dark",
    language: "pt-BR",
    animations: !reducedMotion,
    autoSave: true,
    notifications: true,
    colorScheme: "default",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    playSound && playSound("click");
  };

  const handleVolumeChange = (value: number[]) => {
    setSoundVolume(value[0]);
    playSound && playSound("click");
  };

  const saveSettings = () => {
    localStorage.setItem("user-settings", JSON.stringify(settings));
    playSound && playSound("success");
    announceToScreenReader &&
      announceToScreenReader("Configurações salvas com sucesso");
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: "dark",
      language: "pt-BR",
      animations: true,
      autoSave: true,
      notifications: true,
      colorScheme: "default",
    };
    setSettings(defaultSettings);
    localStorage.setItem("user-settings", JSON.stringify(defaultSettings));
    playSound && playSound("success");
    announceToScreenReader &&
      announceToScreenReader("Configurações restauradas");
  };

  const tabs = [
    {
      id: "appearance",
      label: "Aparência",
      icon: Palette,
    },
    {
      id: "audio",
      label: "Áudio",
      icon: Volume2,
    },
    {
      id: "performance",
      label: "Performance",
      icon: Zap,
    },
    {
      id: "accessibility",
      label: "Acessibilidade",
      icon: Eye,
    },
  ];

  const colorSchemes = [
    { id: "default", name: "Padrão", colors: ["#3B82F6", "#8B5CF6"] },
    { id: "emerald", name: "Esmeralda", colors: ["#10B981", "#06B6D4"] },
    { id: "rose", name: "Rosa", colors: ["#F43F5E", "#EC4899"] },
    { id: "amber", name: "Âmbar", colors: ["#F59E0B", "#EF4444"] },
    { id: "violet", name: "Violeta", colors: ["#8B5CF6", "#A855F7"] },
  ];

  return (
    <>
      {/* Botão de Configurações na Navbar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsOpen(true);
          playSound && playSound("click");
          announceToScreenReader &&
            announceToScreenReader("Painel de configurações aberto");
        }}
        className="rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Abrir configurações"
        title="Configurações do Sistema"
      >
        <Settings className="h-4 w-4" />
      </Button>

      {/* Modal do Painel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Painel */}
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              className="fixed right-6 top-1/2 -translate-y-1/2 w-96 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Settings className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Configurações</h2>
                    <p className="text-sm text-muted-foreground">
                      Personalize o sistema
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    playSound && playSound("click");
                    announceToScreenReader &&
                      announceToScreenReader("Painel de configurações fechado");
                  }}
                  aria-label="Fechar painel"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      playSound && playSound("click");
                    }}
                    className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mx-auto mb-1" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Conteúdo */}
              <div className="max-h-[50vh] overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* Tab Aparência */}
                  {activeTab === "appearance" && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Esquema de Cores
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {colorSchemes.map((scheme) => (
                            <button
                              key={scheme.id}
                              onClick={() =>
                                handleSettingChange("colorScheme", scheme.id)
                              }
                              className={`p-3 rounded-lg border transition-all ${
                                settings.colorScheme === scheme.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-muted-foreground"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: scheme.colors[0] }}
                                />
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: scheme.colors[1] }}
                                />
                              </div>
                              <p className="text-xs font-medium">
                                {scheme.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">Animações</h3>
                        <Button
                          variant={settings.animations ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            handleSettingChange(
                              "animations",
                              !settings.animations
                            );
                            toggleReducedMotion();
                          }}
                          className="w-full"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {settings.animations ? "Ativadas" : "Desativadas"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Áudio */}
                  {activeTab === "audio" && (
                    <motion.div
                      key="audio"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Efeitos Sonoros
                        </h3>
                        <Button
                          variant={soundEnabled ? "default" : "outline"}
                          size="sm"
                          onClick={toggleSound}
                          className="w-full mb-4"
                        >
                          {soundEnabled ? (
                            <Volume2 className="w-4 h-4 mr-2" />
                          ) : (
                            <VolumeX className="w-4 h-4 mr-2" />
                          )}
                          {soundEnabled ? "Ativado" : "Desativado"}
                        </Button>

                        {soundEnabled && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Volume: {Math.round(soundVolume * 100)}%
                            </label>
                            <Slider
                              value={[soundVolume]}
                              onValueChange={handleVolumeChange}
                              max={1}
                              min={0}
                              step={0.1}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Performance */}
                  {activeTab === "performance" && (
                    <motion.div
                      key="performance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Salvamento Automático
                        </h3>
                        <Button
                          variant={settings.autoSave ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            handleSettingChange("autoSave", !settings.autoSave)
                          }
                          className="w-full"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {settings.autoSave ? "Ativado" : "Desativado"}
                        </Button>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Notificações
                        </h3>
                        <Button
                          variant={
                            settings.notifications ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            handleSettingChange(
                              "notifications",
                              !settings.notifications
                            )
                          }
                          className="w-full"
                        >
                          {settings.notifications ? "Ativadas" : "Desativadas"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Acessibilidade */}
                  {activeTab === "accessibility" && (
                    <motion.div
                      key="accessibility"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Alto Contraste
                        </h3>
                        <Button
                          variant={highContrast ? "default" : "outline"}
                          size="sm"
                          onClick={toggleHighContrast}
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {highContrast ? "Ativado" : "Desativado"}
                        </Button>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Movimento Reduzido
                        </h3>
                        <Button
                          variant={reducedMotion ? "default" : "outline"}
                          size="sm"
                          onClick={toggleReducedMotion}
                          className="w-full"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {reducedMotion ? "Ativado" : "Desativado"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSettings}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restaurar
                </Button>
                <Button
                  size="sm"
                  onClick={saveSettings}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
