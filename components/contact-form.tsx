"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  FileText,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Calendar,
  Copy,
  ExternalLink,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/use-i18n";

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const { toast } = useToast();
  const { t, locale } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Armazenar erros de validação por campo
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dev.rafaelgogge@gmail.com",
      href: "mailto:dev.rafaelgogge@gmail.com",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      hoverColor: "hover:bg-blue-500/20",
      copyable: true,
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+55 27 99202-3575",
      href: "https://wa.me/5527992023575",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      hoverColor: "hover:bg-blue-500/20",
      copyable: false,
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Vitória, ES - Brasil",
      href: "https://maps.google.com/?q=Vitória,ES,Brasil",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      hoverColor: "hover:bg-blue-500/20",
      copyable: false,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/rafaelgogge",
      color: "text-foreground/60",
      hoverColor: "hover:text-primary",
      bgColor: "bg-background/80",
      hoverBgColor: "hover:bg-primary/10",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/rafaelgogge",
      color: "text-primary",
      hoverColor: "hover:text-primary/80",
      bgColor: "bg-primary/10",
      hoverBgColor: "hover:bg-primary/20",
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: "https://rafaelgogge.dev",
      color: "text-primary",
      hoverColor: "hover:text-primary/80",
      bgColor: "bg-primary/10",
      hoverBgColor: "hover:bg-primary/20",
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email inválido";
    }
    if (!formData.subject.trim()) newErrors.subject = "Assunto é obrigatório";
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
    // Limpa erro ao digitar
    if (errors[field]) {
      setErrors((prev: Record<string, string>) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      setFormStatus("error");
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      // Envia o formulário para a API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato. Retornarei em breve!",
          variant: "default",
        });
      } else {
        setFormStatus("error");
        const data = await response.json();
        toast({
          title: "Erro ao enviar mensagem",
          description: data.error || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Vamos conversar! 🚀
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Estou sempre aberto a novas oportunidades, projetos interessantes
              e colaborações. Entre em contato comigo através de qualquer um dos
              canais abaixo.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center space-x-4 p-4 rounded-lg ${item.bgColor} ${item.hoverColor} transition-all duration-300 group cursor-pointer`}
                onClick={() => {
                  if (item.copyable) {
                    copyToClipboard(item.value);
                  } else if (item.href) {
                    window.open(item.href, "_blank");
                  }
                }}
              >
                <div className={`p-3 rounded-lg ${item.bgColor} ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
                {item.copyable && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                )}
                {item.href && !item.copyable && (
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Redes Sociais
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-lg ${social.bgColor} ${social.hoverBgColor} ${social.color} ${social.hoverColor} transition-all duration-300 group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-white mb-6">
            Envie uma mensagem
          </h4>

          <div className="mb-6 p-4 bg-yellow-900/40 border border-yellow-700/40 rounded-lg text-yellow-300 text-center">
            Este formulário está temporariamente desabilitado enquanto o site está em produção.<br />
            Para entrar em contato, envie um e-mail diretamente para:
            <span className="block mt-2 font-semibold text-yellow-200 select-all">dev.rafaelgogge@gmail.com</span>
          </div>

          {/* Formulário desabilitado */}
          <form className="space-y-6 opacity-50 pointer-events-none select-none" aria-disabled="true">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="space-y-1 relative">
                <label htmlFor="name" className="sr-only">
                  Seu nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    disabled
                  />
                </div>
              </div>
              {/* Email */}
              <div className="space-y-1 relative">
                <label htmlFor="email" className="sr-only">
                  seu@email.com
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* Assunto */}
            <div className="space-y-1 relative">
              <label htmlFor="subject" className="sr-only">
                Assunto da mensagem
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="subject"
                  type="text"
                  placeholder="Assunto da mensagem"
                  disabled
                />
              </div>
            </div>
            {/* Mensagem */}
            <div className="space-y-1 relative">
              <label htmlFor="message" className="sr-only">
                Descreva sua proposta, projeto ou oportunidade...
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="message"
                  placeholder="Descreva sua proposta, projeto ou oportunidade..."
                  disabled
                />
              </div>
            </div>
            <motion.div>
              <Button type="submit" className="w-full" disabled>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
