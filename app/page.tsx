"use client";

import { CreativeHero } from "@/components/creative-hero";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { ContactForm } from "@/components/contact-form";
import { FloatingNav } from "@/components/floating-nav";
import { ScrollProgress } from "@/components/scroll-progress";
import { EducationSelector } from "@/components/education-selector";
import { TechRadarSkills } from "@/components/tech-radar-skills";
import { HologramCourses } from "@/components/hologram-courses";
import { Footer } from "@/components/footer";
import { useI18n } from "@/hooks/use-i18n";
import { motion } from "framer-motion";

import { useState } from "react";

export default function Home() {
  const { t } = useI18n();
  const [tab, setTab] = useState<'tech' | 'admin'>('tech');

  const projects = [
    {
      title: "Painel de Eventos SSVS",
      description:
        "Sistema institucional desenvolvido por mim e minha equipe na Secretaria de Estado da Saúde do Espírito Santo (SESA), voltado à Subsecretaria de Vigilância em Saúde (SSVS). A plataforma permite o controle completo de eventos oficiais e atividades internas, com dashboard administrativo personalizável, registro automatizado de ações, e um sistema de notificações inteligentes para apoio à gestão pública.",
      image: "/images/wiki-saude-sesa.png",
      technologies: [
        "Django",
        "Python",
        "JavaScript",
        "Bootstrap",
        "PostgreSQL",
      ],
      liveUrl: "#",
      githubUrl: "",
      isPrivate: true,
      priority: "high" as const,
      category: "Sistema Web",
      status: "Em produção",
      developmentTime: "4 meses",
      features: [
        "Dashboard administrativo responsivo",
        "Registro automatizado de eventos",
        "Sistema de notificações inteligentes",
        "Controle de permissões por perfil",
        "Exportação de dados e histórico",
        "Interface limpa e acessível",
      ],
      impact: "Centralização de 100% dos eventos institucionais da SSVS",
    },
    {
      title: "UniLab",
      description:
        "Sistema Automatizado de Gerenciamento de Horários para Agendamento de Laboratórios. Plataforma acadêmica criada para atender às demandas de gestão em laboratórios universitários. Oferece funcionalidades como agendamento inteligente de espaços e equipamentos, gestão de reservas em tempo real, painel administrativo detalhado e controle de usuários por perfil (professores, estudantes e equipe técnica). O sistema foi desenvolvido com foco em eficiência operacional e inovação tecnológica no ambiente educacional. Login de administrador: admin | Senha: admin",
      image: "/images/banners/unilab-banner.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"],
      liveUrl: "https://unilab-frontend.vercel.app",
      githubUrl: "https://github.com/RafaelGogge/unilab_frontend",
      priority: "high" as const,
      category: "Plataforma Educacional",
      status: "Concluído",
      developmentTime: "1 ano",
      features: [
        "Agendamento inteligente de laboratórios",
        "Painel administrativo com filtros",
        "Gerenciamento de usuários por papel",
        "Controle de disponibilidade em tempo real",
        "Automatização de processos acadêmicos",
        "Interface intuitiva e acessível",
      ],
      impact:
        "Sistema integrado para professores, funcionários e estudantes aumentando eficiência operacional em 60%",
    },
    {
      title: "Wiki Saúde SESA",
      description:
        "Plataforma colaborativa de gestão de conhecimento médico, projetada para uso interno por profissionais da saúde pública na SESA. Possui buscador inteligente de conteúdos, controle de versões, edição descentralizada por categorias e estrutura robusta para centralizar informações técnicas e normativas críticas, garantindo acesso rápido e confiável ao conhecimento institucional.",
      image: "/images/wiki-saude-sesa.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "Markdown", "Git"],
      liveUrl: "https://wiki.saude.es.gov.br",
      githubUrl: "",
      priority: "medium" as const,
      category: "Sistema Web",
      status: "Em produção",
      developmentTime: "4 meses",
      features: [
        "Organização de documentos técnicos",
        "Busca com filtros por categoria",
        "Edição colaborativa com controle de acesso",
        "Interface acessível (WCAG 2.1)",
        "Layout responsivo e hierarquia clara",
      ],
      impact: "Centralização de 500+ artigos médicos para 1000+ profissionais",
    },
    {
      title: "SecurityPass Pro",
      description:
        "Aplicação segura e moderna para criação e gerenciamento de senhas robustas, desenvolvida com suporte a Progressive Web App (PWA) e armazenamento local criptografado. O sistema oferece uma interface intuitiva com ênfase em usabilidade, segurança de dados e boas práticas de privacidade digital, sendo ideal para usuários que buscam praticidade e proteção em seus acessos.",
      image: "/images/banners/securitypass-banner.png",
      technologies: [
        "React",
        "TypeScript",
        "PWA",
        "Tailwind CSS",
        "Crypto API",
      ],
      liveUrl: "https://gerador-de-senhas-seguras-frontend.vercel.app",
      githubUrl:
        "https://github.com/RafaelGogge/gerador-de-senhas-seguras-frontend",
      priority: "medium" as const,
      category: "Aplicação PWA",
      status: "Concluído",
      developmentTime: "3 meses",
      features: [
        "Geração de senhas com critérios personalizados",
        "Armazenamento local criptografado",
        "Interface moderna com tema escuro/claro",
        "Efeitos visuais e temática futurista",
        "Botão para copiar e visualizar senhas",
        "API RESTful para validação de senhas",
      ],
      impact: "Geração de senhas 100% seguras com criptografia avançada",
    },
    {
      title: "Super Quiz Interativo",
      description:
        "Sistema de quiz educacional com mecânicas gamificadas, desenvolvido para aumentar o engajamento de estudantes e participantes em atividades formativas. Inclui pontuação dinâmica, ranking em tempo real, conquistas desbloqueáveis, e suporte para diferentes níveis de dificuldade. Ideal para uso em ambientes educacionais, palestras, treinamentos ou eventos.",
      image: "/images/banners/qualidadesoftware-banner.png",
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "LocalStorage",
      ],
      liveUrl: "https://super-quiz-qualidade-de-software.vercel.app/",
      githubUrl: "https://github.com/RafaelGogge/super-quiz-2",
      priority: "low" as const,
      category: "Quiz Interativo",
      status: "Concluído",
      developmentTime: "2 meses",
      features: [
        "Criação de quizzes com perguntas personalizadas",
        "Pontuação dinâmica por tempo de resposta",
        "Ranking de usuários em tempo real com nome e score",
        "Sistema de conquistas e progressão gamificada",
        "Feedback imediato ao usuário após cada resposta",
        "Visual responsivo e atrativo para uso educacional",
      ],
      impact: "Gamificação aumentou participação estudantil em 45%",
    },
    {
      title: "Quiz Master Web Service",
      description:
        "Plataforma avançada para criação, personalização e gerenciamento de questionários online, com foco em usabilidade e análise de desempenho. O sistema conta com templates prontos, controle de acesso por administrador, dashboard de analytics detalhado e estrutura modular para integração com outras plataformas. Projetado para aplicações educacionais, institucionais e corporativas.",
      image: "/images/banners/webservices-banner.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "Web APIs", "Chart.js"],
      liveUrl: "https://quiz-master-web-service.vercel.app",
      githubUrl: "https://github.com/RafaelGogge/QuizMaster-WebService",
      priority: "low" as const,
      category: "Quiz Interativo",
      status: "Concluído",
      developmentTime: "2 meses",
      features: [
        "Sistema para criação e gerenciamento de questionários web",
        "Interface administrativa com login e permissões",
        "Templates reutilizáveis e organizados por categoria",
        "Analytics simples por questão e usuário",
        "Exibição de relatórios e estatísticas via gráficos integrados",
      ],
      impact: "Criação de 50+ questionários com taxa de conclusão de 85%",
    },
  ];


  // Separação das experiências
  const techExperiences = [
    {
      title: t("experience.sesa.title"),
      company: t("experience.sesa.company"),
      period: "Mai 2024 - Presente",
      duration: "8 meses",
      location: "Vitória, ES",
      description: t("experience.sesa.description"),
      fullDescription:
        "Desenvolvimento e manutenção de sistemas web para o setor de saúde pública, focando na melhoria da experiência do usuário e otimização de processos administrativos. Trabalho com tecnologias modernas para criar soluções robustas e acessíveis que impactam diretamente a gestão de saúde pública no Espírito Santo.",
      technologies: [
        "Python",
        "Django",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "PostgreSQL",
        "Git",
      ],
      projects: [
        {
          name: "Painel de Eventos SSVS",
          description:
            "Painel institucional dinâmico para exibição de eventos da Subsecretaria de Vigilância em Saúde com filtros interativos e personalização visual",
          type: "Dashboard" as const,
          technologies: [
            "Python",
            "Django",
            "JavaScript",
            "Bootstrap",
            "PostgreSQL",
          ],
          impact:
            "Centralização de 100% dos eventos institucionais da SSVS, reduzindo em 60% o tempo de consulta",
          isPrivate: true,
        },
        {
          name: "Wiki Saúde SESA",
          description:
            "Plataforma de conhecimento médico com sistema de busca avançado e gestão de conteúdo colaborativo",
          type: "Plataforma" as const,
          technologies: ["Python", "Django", "PostgreSQL", "JavaScript"],
          impact:
            "Centralização de 500+ artigos médicos para 1000+ profissionais de saúde",
          link: "https://app.wiki.saude.es.gov.br/",
        },
      ],
      achievements: [
        "Melhoria de 40% na experiência do usuário em sistemas críticos de saúde",
        "Otimização de performance resultando em 30% menos tempo de carregamento",
        "Implementação de padrões de acessibilidade WCAG 2.1 em 100% dos projetos",
        "Colaboração com equipes multidisciplinares de 15+ profissionais",
        "Redução de 25% no tempo de desenvolvimento através de automações",
      ],
      current: true,
      priority: "principal" as const,
    },
    {
      title: t("experience.freelancer.title"),
      company: t("experience.freelancer.company"),
      period: "Jan 2024 - Presente",
      duration: "1 ano",
      location: "Vitória, ES - Remoto",
      description: t("experience.freelancer.description"),
      fullDescription:
        "Desenvolvimento de soluções personalizadas para diferentes segmentos, focando em automação, integração de sistemas e experiência do usuário. Trabalho com metodologias ágeis (Scrum/Kanban) e ferramentas modernas para entregar projetos de alta qualidade que geram valor real para os clientes.",
      technologies: [
        "JavaScript",
        "Python",
        "Django",
        "HTML5",
        "CSS3",
        "Git",
        "N8N",
      ],
      projects: [
        {
          name: "Security Pass Pro",
          description:
            "Sistema completo de controle de acesso e gestão de visitantes para empresas com dashboard administrativo",
          type: "Sistema Web" as const,
          technologies: [
            "Python",
            "Django",
            "PostgreSQL",
            "HTML5",
            "CSS3",
            "Bootstrap",
          ],
          impact:
            "Redução de 80% no tempo de cadastro de visitantes e controle 100% digital",
          link: "https://gerador-de-senhas-seguras-frontend.vercel.app",
        },
        {
          name: "UniChat",
          description:
            "Bot inteligente para automação de processos e atendimento automatizado com integração N8N",
          type: "Bot Telegram" as const,
          technologies: ["Python", "N8N"],
          impact:
            "Automatização de 90% das consultas básicas, reduzindo tempo de resposta em 75%",
          link: "https://t.me/SuporteUniChat_Bot",
        },
        {
          name: "UniLab - Gerenciamento Inteligente de Recursos Acadêmicos",
          description:
            "Plataforma educacional completa com sistema de agendamento, gestão de recursos e automação de processos para laboratório universitário",
          type: "Sistema Web" as const,
          technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
          impact:
            "Sistema integrado para professores, funcionários e estudantes aumentando eficiência operacional em 60%",
          link: "https://unilab-frontend.vercel.app",
        },
        {
          name: "Quiz Master Web Service",
          description:
            "Plataforma web para criação e gerenciamento de questionários interativos com analytics",
          type: "Quiz Interativo" as const,
          technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
          impact: "Criação de 50+ questionários com taxa de conclusão de 85%",
          link: "https://quiz-master-web-service.vercel.app",
        },
        {
          name: "Super Quiz Interativo",
          description:
            "Sistema de quiz gamificado com pontuação, ranking e competições educacionais",
          type: "Quiz Interativo" as const,
          technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
          impact: "Gamificação aumentou participação estudantil em 45%",
          link: "https://super-quiz-qualidade-de-software.vercel.app/",
        },
        {
          name: "Portfolio de Projetos",
          description:
            "Diversos projetos desenvolvidos para aprendizado e experimentação de novas tecnologias",
          type: "Plataforma" as const,
          technologies: ["Python", "JavaScript", "Django", "Git"],
          impact: "Aprimoramento contínuo e showcase de 20+ projetos técnicos",
          link: "https://github.com/rafaelgogge",
        },
      ],
      achievements: [
        "Entrega de 6+ projetos complexos com 100% de satisfação dos clientes",
        "Implementação de automações que reduziram trabalho manual em 70%",
        "Criação de soluções escaláveis para 5 segmentos diferentes de negócio",
        "Redução média de 50% nos custos operacionais dos clientes",
        "Desenvolvimento de APIs que processam 1000+ requisições/hora",
      ],
      current: true,
      priority: "secundário" as const,
    },
  ];

  const adminExperiences = [
    {
      title: t("experience.alliance.title"),
      company: t("experience.alliance.company"),
      period: "Mar 2023 - Jan 2025",
      duration: "1 ano e 10 meses",
      location: "Vitória, ES",
      description: t("experience.alliance.description"),
      fullDescription:
        "Gestão operacional de condomínios com foco em controle administrativo, coordenação de serviços de manutenção preventiva e corretiva, relacionamento com fornecedores e gestão de equipes terceirizadas. Responsável pelo acompanhamento de contratos, elaboração de relatórios gerenciais e otimização de processos operacionais para 12 condomínios residenciais.",
      technologies: [
        "Excel Avançado",
        "Gestão Condominial",
        "Controle Financeiro",
        "Coordenação de Equipes",
        "Relatórios Gerenciais",
      ],
      achievements: [
        "Gestão eficiente de 50+ contratos de fornecedores e prestadores de serviços",
        "Otimização de processos que reduziu custos administrativos em 20%",
        "Coordenação de equipes terceirizadas de 30+ profissionais",
        "Controle rigoroso que manteve 95% dos custos dentro do orçamento",
        "Implementação de melhorias que aumentaram satisfação dos condôminos em 35%",
        "Redução de 40% no tempo de resposta para manutenções preventivas",
      ],
      current: false,
    },
    {
      title: "Assistente Administrativo (Supplies)",
      company: "Escola Americana de Vitória",
      period: "Nov 2022 - Fev 2023",
      duration: "4 meses",
      location: "Vitória, ES",
      description:
        "Controle de suprimentos, aquisição de materiais, atendimento multilíngue (Português, Inglês e LIBRAS) e gestão de planilhas Excel.",
      fullDescription:
        "Responsável pelo controle de suprimentos e materiais escolares, atendimento multilíngue aos membros da comunidade escolar em três idiomas (Português, Inglês e LIBRAS), além da gestão de planilhas e documentos administrativos. Atuação direta com 800+ alunos e 150+ funcionários em ambiente internacional.",
      technologies: [
        "Excel Avançado",
        "Gestão de Suprimentos",
        "Atendimento Multilíngue",
        "LIBRAS",
        "Inglês Fluente",
      ],
      achievements: [
        "Atendimento trilíngue para 100% da comunidade escolar (Português, Inglês, LIBRAS)",
        "Otimização do controle de suprimentos reduzindo desperdício em 25%",
        "Melhoria na comunicação que aumentou satisfação em 40%",
        "Gestão de inventário de 1000+ itens escolares",
        "Implementação de sistema de controle que reduziu faltas de material em 60%",
      ],
      current: false,
    },
    {
      title: "Analista de Relacionamento - PicPay",
      company: "Sollo Brasil Contact Center",
      period: "Out 2020 - Ago 2021",
      duration: "11 meses",
      location: "Vitória, ES - Remoto",
      description:
        "Atendimento via chat Zendesk, atualização de dados cadastrais, conferência de documentos e controle de contas com foco em segurança e prevenção de fraudes.",
      fullDescription:
        "Atendimento especializado aos clientes PicPay via chat Zendesk, com foco em segurança e prevenção de fraudes. Responsável pela atualização de dados cadastrais, conferência de documentos e controle de contas suspeitas, garantindo a segurança das transações financeiras de milhares de usuários diariamente.",
      technologies: [
        "Zendesk",
        "Análise de Fraudes",
        "Atendimento Digital",
        "Segurança Financeira",
        "KPIs de Atendimento",
      ],
      achievements: [
        "Atendimento especializado para 200+ clientes/dia em plataforma fintech",
        "Taxa de resolução de 92% na primeira interação",
        "Prevenção de fraudes identificando 150+ casos suspeitos mensalmente",
        "Manutenção de NPS acima de 4.5/5.0 durante todo o período",
        "Redução de 30% no tempo médio de atendimento através de otimizações",
        "Treinamento de 8 novos colaboradores em procedimentos de segurança",
      ],
      current: false,
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-900 text-white dark:bg-zinc-900 dark:text-white light:bg-gradient-to-br light:from-slate-50 light:to-slate-200 light:text-zinc-900">
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section id="home">
        <CreativeHero />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title={t("about.title")}
            subtitle={t("about.subtitle")}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-300 leading-relaxed"
              >
                {t("about.description1")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 leading-relaxed"
              >
                {t("about.description2")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-300 leading-relaxed"
              >
                {t("about.description3")}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">RG</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title={t("experience.title")}
              subtitle={t("experience.subtitle")}
            />
          </motion.div>
      {/* Abas de Experiência */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="animate-slide-in-left"
      >
        <div className="flex gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'tech' ? 'border-blue-500 text-blue-400 bg-zinc-900' : 'border-transparent text-zinc-400 bg-zinc-800/50'}`}
            onClick={() => setTab('tech')}
          >
            Carreira em Tecnologia
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'admin' ? 'border-purple-500 text-purple-400 bg-zinc-900' : 'border-transparent text-zinc-400 bg-zinc-800/50'}`}
            onClick={() => setTab('admin')}
          >
            Carreira em Administração
          </button>
        </div>
        {tab === 'tech' ? (
          <Timeline items={techExperiences} />
        ) : (
          <Timeline items={adminExperiences} />
        )}
      </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title={t("projects.title")}
              subtitle={t("projects.subtitle")}
            />
          </motion.div>

          {/* Projects Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-zinc-300">
                {projects.filter((p) => p.status === "Em produção").length} em
                produção
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-sm text-zinc-300">
                {projects.filter((p) => p.status === "Concluído").length}{" "}
                concluídos
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/30">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-sm text-zinc-300">
                {projects.filter((p) => p.isPrivate).length} privado
                {projects.filter((p) => p.isPrivate).length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>

          {/* Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ProjectsCarousel projects={projects} />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title="Competências Técnicas"
              subtitle="Clique nas tecnologias no radar para explorar detalhes, projetos e nível de experiência"
            />
          </motion.div>

          {/* Tech Radar Skills - Clean and direct */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="animate-fade-in-scale"
          >
            <TechRadarSkills />
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title={t("education.title")}
            subtitle={t("education.subtitle")}
          />
          <EducationSelector />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 bg-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title={t("courses.title")}
            subtitle={t("courses.subtitle")}
          />
          <HologramCourses />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title={t("contact.title")}
              subtitle={t("contact.subtitle")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
