"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Palette,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Zap,
  Moon,
  Sun,
  Monitor,
  MousePointer,
  Keyboard,
  Accessibility,
  Type,
  Contrast,
  Focus,
  Languages,
  Save,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAccessibility } from "@/hooks/use-accessibility";

interface SettingsConfig {
  // Aparência
  theme: "dark" | "light" | "system";
  colorScheme: "default" | "purple" | "blue" | "green" | "orange";
  animations: boolean;
  reducedMotion: boolean;
  particleEffects: boolean;

  // Som
  soundEffects: boolean;
  soundVolume: number;

  // Acessibilidade
  highContrast: boolean;
  largeText: boolean;
  focusIndicators: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  clickSounds: boolean;

  // Performance
  performanceMode: boolean;
  autoSave: boolean;

  // Idioma
  language: "pt" | "en";
}

const defaultSettings: SettingsConfig = {
  theme: "dark",
  colorScheme: "default",
  animations: true,
  reducedMotion: false,
  particleEffects: true,
  soundEffects: true,
  soundVolume: 50,
  highContrast: false,
  largeText: false,
  focusIndicators: true,
  screenReader: false,
  keyboardNavigation: true,
  clickSounds: false,
  performanceMode: false,
  autoSave: true,
  language: "pt",
};

export function AdvancedSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsConfig>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("portfolio-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }
  }, []);

  // Aplicar configurações ao documento
  useEffect(() => {
    const root = document.documentElement;

    // Aplicar esquema de cores
    root.setAttribute("data-color-scheme", settings.colorScheme);

    // Aplicar configurações de acessibilidade
    if (settings.highContrast) {
      root.setAttribute("data-high-contrast", "true");
    } else {
      root.removeAttribute("data-high-contrast");
    }

    if (settings.largeText) {
      root.setAttribute("data-large-text", "true");
    } else {
      root.removeAttribute("data-large-text");
    }

    if (settings.reducedMotion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }

    // Aplicar modo de performance
    if (settings.performanceMode) {
      root.setAttribute("data-performance-mode", "true");
    } else {
      root.removeAttribute("data-performance-mode");
    }
  }, [settings]);

  const updateSetting = <K extends keyof SettingsConfig>(
    key: K,
    value: SettingsConfig[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);

    if (settings.autoSave) {
      setTimeout(() => saveSettings(), 1000);
    }
  };

  const saveSettings = () => {
    localStorage.setItem("portfolio-settings", JSON.stringify(settings));
    setHasChanges(false);
    announceToScreenReader("Configurações salvas com sucesso");
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("portfolio-settings");
    setHasChanges(false);
    announceToScreenReader("Configurações restauradas para o padrão");
  };

  const colorSchemes = [
    { id: "default", name: "Padrão", color: "hsl(245, 95%, 68%)" },
    { id: "purple", name: "Roxo", color: "hsl(291, 70%, 58%)" },
    { id: "blue", name: "Azul", color: "hsl(217, 91%, 60%)" },
    { id: "green", name: "Verde", color: "hsl(142, 76%, 36%)" },
    { id: "orange", name: "Laranja", color: "hsl(43, 96%, 56%)" },
  ];

  return (
    <>
      {/* Botão de Configurações */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Abrir configurações"
        >
          <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Modal de Configurações */}
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

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        Configurações Avançadas
                      </h2>
                      <p className="text-muted-foreground">
                        Personalize sua experiência
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasChanges && (
                      <Badge variant="secondary" className="animate-pulse">
                        Alterações pendentes
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                  <Tabs defaultValue="appearance" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="appearance">
                        <Palette className="w-4 h-4 mr-2" />
                        Aparência
                      </TabsTrigger>
                      <TabsTrigger value="accessibility">
                        <Accessibility className="w-4 h-4 mr-2" />
                        Acessibilidade
                      </TabsTrigger>
                      <TabsTrigger value="audio">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Áudio
                      </TabsTrigger>
                      <TabsTrigger value="performance">
                        <Zap className="w-4 h-4 mr-2" />
                        Performance
                      </TabsTrigger>
                    </TabsList>

                    {/* Aba Aparência */}
                    <TabsContent value="appearance" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            Esquema de Cores
                          </CardTitle>
                          <CardDescription>
                            Escolha o esquema de cores do portfólio
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {colorSchemes.map((scheme) => (
                              <motion.button
                                key={scheme.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  updateSetting("colorScheme", scheme.id as any)
                                }
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  settings.colorScheme === scheme.id
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-full mx-auto mb-2"
                                  style={{ backgroundColor: scheme.color }}
                                />
                                <span className="text-sm font-medium">
                                  {scheme.name}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Animações e Efeitos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">Animações</label>
                              <p className="text-sm text-muted-foreground">
                                Habilitar animações suaves
                              </p>
                            </div>
                            <Switch
                              checked={settings.animations}
                              onCheckedChange={(checked) =>
                                updateSetting("animations", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Efeitos de Partícula
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Efeitos visuais decorativos
                              </p>
                            </div>
                            <Switch
                              checked={settings.particleEffects}
                              onCheckedChange={(checked) =>
                                updateSetting("particleEffects", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Movimento Reduzido
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Para usuários sensíveis a movimento
                              </p>
                            </div>
                            <Switch
                              checked={settings.reducedMotion}
                              onCheckedChange={(checked) =>
                                updateSetting("reducedMotion", checked)
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Aba Acessibilidade */}
                    <TabsContent value="accessibility" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            Visual
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Alto Contraste
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Aumenta o contraste para melhor legibilidade
                              </p>
                            </div>
                            <Switch
                              checked={settings.highContrast}
                              onCheckedChange={(checked) =>
                                updateSetting("highContrast", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Texto Grande
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Aumenta o tamanho do texto
                              </p>
                            </div>
                            <Switch
                              checked={settings.largeText}
                              onCheckedChange={(checked) =>
                                updateSetting("largeText", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Indicadores de Foco
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Destaca elementos focados
                              </p>
                            </div>
                            <Switch
                              checked={settings.focusIndicators}
                              onCheckedChange={(checked) =>
                                updateSetting("focusIndicators", checked)
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Keyboard className="w-5 h-5" />
                            Navegação
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Navegação por Teclado
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Navegação completa via teclado
                              </p>
                            </div>
                            <Switch
                              checked={settings.keyboardNavigation}
                              onCheckedChange={(checked) =>
                                updateSetting("keyboardNavigation", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Leitor de Tela
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Otimizações para leitores de tela
                              </p>
                            </div>
                            <Switch
                              checked={settings.screenReader}
                              onCheckedChange={(checked) =>
                                updateSetting("screenReader", checked)
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Aba Áudio */}
                    <TabsContent value="audio" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Volume2 className="w-5 h-5" />
                            Configurações de Som
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Efeitos Sonoros
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Sons de hover e clique
                              </p>
                            </div>
                            <Switch
                              checked={settings.soundEffects}
                              onCheckedChange={(checked) =>
                                updateSetting("soundEffects", checked)
                              }
                            />
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="font-medium">Volume</label>
                              <span className="text-sm text-muted-foreground">
                                {settings.soundVolume}%
                              </span>
                            </div>
                            <Slider
                              value={[settings.soundVolume]}
                              onValueChange={([value]) =>
                                updateSetting("soundVolume", value)
                              }
                              max={100}
                              step={5}
                              disabled={!settings.soundEffects}
                              className="w-full"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Sons de Clique
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Feedback sonoro para cliques
                              </p>
                            </div>
                            <Switch
                              checked={settings.clickSounds}
                              onCheckedChange={(checked) =>
                                updateSetting("clickSounds", checked)
                              }
                              disabled={!settings.soundEffects}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Aba Performance */}
                    <TabsContent value="performance" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Otimizações
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Modo Performance
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Reduz animações para melhor performance
                              </p>
                            </div>
                            <Switch
                              checked={settings.performanceMode}
                              onCheckedChange={(checked) =>
                                updateSetting("performanceMode", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">
                                Salvamento Automático
                              </label>
                              <p className="text-sm text-muted-foreground">
                                Salva configurações automaticamente
                              </p>
                            </div>
                            <Switch
                              checked={settings.autoSave}
                              onCheckedChange={(checked) =>
                                updateSetting("autoSave", checked)
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Idioma
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Select
                            value={settings.language}
                            onValueChange={(value) =>
                              updateSetting("language", value as "pt" | "en")
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt">🇧🇷 Português</SelectItem>
                              <SelectItem value="en">🇺🇸 English</SelectItem>
                            </SelectContent>
                          </Select>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
                  <Button
                    variant="outline"
                    onClick={resetSettings}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restaurar Padrão
                  </Button>

                  <div className="flex items-center gap-3">
                    {!settings.autoSave && (
                      <Button
                        onClick={saveSettings}
                        disabled={!hasChanges}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvar
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
