"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Cloud,
  Shield,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  Terminal,
  Cpu,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const coursesData = {
  frontend: {
    title: "Desenvolvimento Frontend",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    terminalPrompt: "frontend@dev:~$",
    courses: [
      {
        title: "React.js Completo",
        institution: "Origamid",
        duration: 36,
        status: "completed",
        certificate: "https://www.origamid.com/certificate/123456",
        description:
          "Curso completo de React.js com hooks, context API, styled-components e testes unitários.",
        skills: [
          "React",
          "JavaScript ES6+",
          "Hooks",
          "Context API",
          "Styled Components",
        ],
        completedDate: "2024-03-15",
      },
      {
        title: "TypeScript para React",
        institution: "Udemy",
        duration: 20,
        status: "completed",
        certificate: "https://www.udemy.com/certificate/123456",
        description:
          "Desenvolvimento de aplicações React com TypeScript, tipagem avançada e melhores práticas.",
        skills: [
          "TypeScript",
          "React",
          "Interfaces",
          "Generics",
          "Tipos Avançados",
        ],
        completedDate: "2024-02-10",
      },
      {
        title: "Next.js e Vercel",
        institution: "Rocketseat",
        duration: 15,
        status: "inProgress",
        certificate: null,
        description:
          "Framework React para produção com SSG, SSR, API Routes e deploy na Vercel.",
        skills: ["Next.js", "SSG", "SSR", "API Routes", "Vercel"],
        startDate: "2024-04-01",
      },
    ],
  },
  backend: {
    title: "Desenvolvimento Backend",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    terminalPrompt: "backend@server:~$",
    courses: [
      {
        title: "Node.js Fundamentals",
        institution: "Alura",
        duration: 40,
        status: "completed",
        certificate: "https://www.alura.com.br/certificate/123456",
        description:
          "Fundamentos do Node.js, APIs REST, middlewares e integração com bancos de dados.",
        skills: ["Node.js", "Express", "APIs REST", "Middlewares", "NPM"],
        completedDate: "2024-01-20",
      },
      {
        title: "Python para Desenvolvedores",
        institution: "Curso em Vídeo",
        duration: 120,
        status: "completed",
        certificate: "https://www.cursoemvideo.com/certificate/123456",
        description:
          "Python completo desde o básico até POO, tratamento de erros e módulos avançados.",
        skills: ["Python", "POO", "Módulos", "Tratamento de Erros", "Bibliotecas"],
        completedDate: "2023-11-30",
      },
      {
        title: "Django REST Framework",
        institution: "Udemy",
        duration: 25,
        status: "inProgress",
        certificate: null,
        description:
          "Desenvolvimento de APIs robustas com Django REST Framework e autenticação JWT.",
        skills: ["Django", "DRF", "APIs", "JWT", "PostgreSQL"],
        startDate: "2024-04-10",
      },
    ],
  },
  cloud: {
    title: "Cloud Computing & DevOps",
    icon: Cloud,
    color: "from-purple-500 to-violet-500",
    terminalPrompt: "devops@cloud:~$",
    courses: [
      {
        title: "AWS Cloud Practitioner",
        institution: "AWS Training",
        duration: 30,
        status: "completed",
        certificate: "https://aws.amazon.com/certificate/123456",
        description:
          "Fundamentos da AWS, serviços principais, segurança e modelos de precificação.",
        skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation"],
        completedDate: "2024-02-28",
      },
      {
        title: "Docker e Kubernetes",
        institution: "KodeKloud",
        duration: 50,
        status: "inProgress",
        certificate: null,
        description:
          "Containerização com Docker e orquestração com Kubernetes em produção.",
        skills: ["Docker", "Kubernetes", "Containers", "Orquestração", "DevOps"],
        startDate: "2024-03-20",
      },
    ],
  },
  security: {
    title: "Segurança da Informação",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    terminalPrompt: "security@cyber:~$",
    courses: [
      {
        title: "Cybersecurity Fundamentals",
        institution: "Cisco Networking Academy",
        duration: 70,
        status: "completed",
        certificate: "https://www.netacad.com/certificate/123456",
        description:
          "Fundamentos de cibersegurança, ameaças, vulnerabilidades e contramedidas.",
        skills: [
          "Cybersecurity",
          "Network Security",
          "Risk Assessment",
          "Incident Response",
        ],
        completedDate: "2023-12-15",
      },
      {
        title: "Ethical Hacking",
        institution: "Udemy",
        duration: 35,
        status: "inProgress",
        certificate: null,
        description:
          "Técnicas de hacking ético, testes de penetração e análise de vulnerabilidades.",
        skills: [
          "Penetration Testing",
          "Vulnerability Assessment",
          "Kali Linux",
          "OWASP",
        ],
        startDate: "2024-04-05",
      },
    ],
  },
};

export function CoursesSelector() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof coursesData>("frontend");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const currentCategory = coursesData[selectedCategory];

  useEffect(() => {
    // Simulate terminal startup
    setTerminalLines([
      "$ system_init --course-tracker",
      "Loading course database...",
      "Database connected successfully.",
      `Active profile: ${currentCategory.title}`,
      "Ready for input.",
    ]);
  }, [selectedCategory]);

  const handleCategorySwitch = (category: keyof typeof coursesData) => {
    setIsTyping(true);
    const newCategory = coursesData[category];
    
    setTimeout(() => {
      setTerminalLines(prev => [
        ...prev,
        `$ switch_profile --target=${category}`,
        `Switching to ${newCategory.title}...`,
        "Profile loaded successfully.",
      ]);
      setSelectedCategory(category);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Terminal-style Category Selector */}
      <div className="relative bg-black rounded-lg border border-green-500/30 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 border-b border-green-500/30">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-green-400 text-sm font-mono ml-4">
            course-manager v2.1.0
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 h-48 font-mono text-sm text-green-400 overflow-y-auto">
          {terminalLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="mb-1"
            >
              {line}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-green-400"
            />
          )}
        </div>

        {/* Category Buttons as Terminal Commands */}
        <div className="border-t border-green-500/30 p-4 bg-zinc-900/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.entries(coursesData).map(([key, category]) => {
              const CategoryIcon = category.icon;
              const isActive = selectedCategory === key;

              return (
                <motion.button
                  key={key}
                  onClick={() => handleCategorySwitch(key as keyof typeof coursesData)}
                  className={`flex items-center gap-2 p-3 rounded border transition-all duration-300 ${
                    isActive
                      ? "bg-green-500/20 border-green-500/50 text-green-300"
                      : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:border-green-500/30 hover:text-green-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Terminal className="h-4 w-4" />
                  <span className="text-xs font-mono">./{key}</span>
                  <CategoryIcon className="h-4 w-4" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Courses Timeline */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Timeline Header */}
        <div className="flex items-center gap-4 mb-8 p-6 rounded-lg bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50">
          <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${currentCategory.color} flex items-center justify-center relative`}>
            <currentCategory.icon className="h-8 w-8 text-white" />
            <div className="absolute -inset-1 rounded-lg border border-blue-400/30 animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{currentCategory.title}</h3>
            <p className="text-zinc-400 font-mono">{currentCategory.terminalPrompt}</p>
          </div>
          <div className="ml-auto">
            <Cpu className="h-8 w-8 text-blue-400 animate-spin-slow" />
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500" />

          {currentCategory.courses.map((course, index) => {
            const StatusIcon = course.status === "completed" ? CheckCircle : PlayCircle;
            const isCompleted = course.status === "completed";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-8 ml-16"
              >
                {/* Timeline Node */}
                <div className={`absolute -left-10 top-6 w-4 h-4 rounded-full border-2 ${
                  isCompleted 
                    ? "bg-green-500 border-green-400" 
                    : "bg-blue-500 border-blue-400 animate-pulse"
                }`} />

                {/* Course Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                  
                  <div className="relative p-6 bg-zinc-800/80 rounded-lg border border-zinc-700/50 hover:border-blue-500/50 transition-all duration-300">
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <StatusIcon className={`h-5 w-5 ${isCompleted ? "text-green-400" : "text-blue-400"}`} />
                          <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                        </div>
                        <p className="text-zinc-400 text-sm mb-2">{course.institution}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration} {t("courses.hours")}</span>
                        </div>
                        {course.certificate && (
                          <div className="flex items-center gap-1 text-xs text-yellow-400">
                            <Award className="h-3 w-3" />
                            <span>Certificado</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Course Description */}
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Course Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50">
                      <div className="text-xs text-zinc-500 font-mono">
                        {isCompleted 
                          ? `Concluído em: ${course.completedDate}`
                          : `Iniciado em: ${course.startDate}`
                        }
                      </div>
                      
                      {course.certificate && (
                        <motion.a
                          href={course.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors text-xs"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Award className="h-3 w-3" />
                          Ver Certificado
                          <ChevronRight className="h-3 w-3" />
                        </motion.a>
                      )}
                    </div>

                    {/* Progress Indicator for In Progress */}
                    {!isCompleted && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-blue-400">Em andamento</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full animate-pulse" style={{ width: "65%" }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
          "Interfaces",
          "Generics",
          "Tipos Avançados",
        ],
      },
      {
        title: "Next.js e Vercel",
        institution: "Rocketseat",
        duration: 15,
        status: "inProgress",
        certificate: null,
        description:
          "Framework React para produção com SSG, SSR, API Routes e deploy na Vercel.",
        skills: ["Next.js", "SSG", "SSR", "API Routes", "Vercel"],
      },
    ],
  },
  backend: {
    title: "Desenvolvimento Backend",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    courses: [
      {
        title: "Node.js Fundamentals",
        institution: "Alura",
        duration: 40,
        status: "completed",
        certificate: "https://www.alura.com.br/certificate/123456",
        description:
          "Fundamentos do Node.js, APIs REST, middlewares e integração com bancos de dados.",
        skills: ["Node.js", "Express", "APIs REST", "Middlewares", "NPM"],
      },
      {
        title: "Python para Desenvolvedores",
        institution: "Curso em Vídeo",
        duration: 120,
        status: "completed",
        certificate: "https://www.cursoemvideo.com/certificate/123456",
        description:
          "Python completo desde o básico até POO, tratamento de erros e módulos avançados.",
        skills: [
          "Python",
          "POO",
          "Módulos",
          "Tratamento de Erros",
          "Bibliotecas",
        ],
      },
      {
        title: "Django REST Framework",
        institution: "Udemy",
        duration: 25,
        status: "inProgress",
        certificate: null,
        description:
          "Desenvolvimento de APIs robustas com Django REST Framework e autenticação JWT.",
        skills: ["Django", "DRF", "APIs", "JWT", "PostgreSQL"],
      },
    ],
  },
  cloud: {
    title: "Cloud Computing & DevOps",
    icon: Cloud,
    color: "from-purple-500 to-violet-500",
    courses: [
      {
        title: "AWS Cloud Practitioner",
        institution: "AWS Training",
        duration: 30,
        status: "completed",
        certificate: "https://aws.amazon.com/certificate/123456",
        description:
          "Fundamentos da AWS, serviços principais, segurança e modelos de precificação.",
        skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation"],
      },
      {
        title: "Docker e Kubernetes",
        institution: "KodeKloud",
        duration: 50,
        status: "inProgress",
        certificate: null,
        description:
          "Containerização com Docker e orquestração com Kubernetes em produção.",
        skills: [
          "Docker",
          "Kubernetes",
          "Containers",
          "Orquestração",
          "DevOps",
        ],
      },
    ],
  },
  security: {
    title: "Segurança da Informação",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    courses: [
      {
        title: "Cybersecurity Fundamentals",
        institution: "Cisco Networking Academy",
        duration: 70,
        status: "completed",
        certificate: "https://www.netacad.com/certificate/123456",
        description:
          "Fundamentos de cibersegurança, ameaças, vulnerabilidades e contramedidas.",
        skills: [
          "Cybersecurity",
          "Network Security",
          "Risk Assessment",
          "Incident Response",
        ],
      },
      {
        title: "Ethical Hacking",
        institution: "Udemy",
        duration: 35,
        status: "inProgress",
        certificate: null,
        description:
          "Técnicas de hacking ético, testes de penetração e análise de vulnerabilidades.",
        skills: [
          "Penetration Testing",
          "Vulnerability Assessment",
          "Kali Linux",
          "OWASP",
        ],
      },
    ],
  },
};

export function CoursesSelector() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof coursesData>("frontend");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const currentCategory = coursesData[selectedCategory];
  const IconComponent = currentCategory.icon;

  const getStatusIcon = (status: string) => {
    return status === "completed" ? CheckCircle : PlayCircle;
  };

  const getStatusColor = (status: string) => {
    return status === "completed" ? "text-green-400" : "text-blue-400";
  };

  return (
    <div className="space-y-8">
      {/* Category Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(coursesData).map(([key, category]) => {
          const CategoryIcon = category.icon;
          const isActive = selectedCategory === key;

          return (
            <motion.button
              key={key}
              onClick={() =>
                setSelectedCategory(key as keyof typeof coursesData)
              }
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "border-primary/50 bg-background/80"
                  : "border-border bg-background/60 hover:border-primary/30"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                >
                  <CategoryIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm text-center">
                  {category.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Courses List */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur opacity-25"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentCategory.color} flex items-center justify-center`}
            >
              <IconComponent className="h-8 w-8 text-white" />
            </div>

            <div>
              <h3 className="text-2xl font-bold">{currentCategory.title}</h3>
              <p className="text-zinc-400">
                {currentCategory.courses.length}{" "}
                {currentCategory.courses.length === 1 ? "curso" : "cursos"}
              </p>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            {currentCategory.courses.map((course, index) => {
              const StatusIcon = getStatusIcon(course.status);
              const isExpanded =
                expandedCourse === `${selectedCategory}-${index}`;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-zinc-700/50 rounded-lg overflow-hidden bg-zinc-800/30"
                >
                  <button
                    onClick={() =>
                      setExpandedCourse(
                        isExpanded ? null : `${selectedCategory}-${index}`
                      )
                    }
                    className="w-full p-6 text-left hover:bg-zinc-700/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <StatusIcon
                            className={`h-5 w-5 ${getStatusColor(
                              course.status
                            )}`}
                          />
                          <h4 className="text-lg font-semibold">
                            {course.title}
                          </h4>
                        </div>

                        <p className="text-zinc-400 text-sm mb-2">
                          {course.institution}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {course.duration} {t("courses.hours")}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className={getStatusColor(course.status)}>
                              {course.status === "completed"
                                ? t("courses.completed")
                                : t("courses.inProgress")}
                            </span>
                          </div>

                          {course.certificate && (
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-yellow-500">
                                {t("courses.certificate")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <BookOpen className="h-5 w-5 text-zinc-400" />
                      </motion.div>
                    </div>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-zinc-700/30"
                    >
                      <div className="pt-4 space-y-4">
                        <p className="text-zinc-300 leading-relaxed">
                          {course.description}
                        </p>

                        <div>
                          <h5 className="font-semibold mb-3 text-blue-400">
                            Tecnologias e Conceitos:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {course.certificate && (
                          <div className="pt-2">
                            <a
                              href={course.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
                            >
                              <Award className="h-4 w-4" />
                              Ver Certificado
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
