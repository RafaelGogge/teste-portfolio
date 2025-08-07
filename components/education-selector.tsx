"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Briefcase, ChevronDown } from "lucide-react"

const educationData = {
  ads: {
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "Centro Universitário Salesiano (UniSales)",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    periods: [
      {
        period: "1º Período",
        status: "Concluído",
        description:
          "Concluído com foco em lógica de programação, modelagem de sistemas, fundamentos de hardware e introdução à ética e à cidadania digital.",
        subjects: [
          "Modelagem de Sistemas e Levantamento de Requisitos",
          "Projeto de Organização e Infraestrutura de Computadores",
          "Lógica Digital na Resolução de Problemas",
          "Análise de Cálculos Variados com Álgebra",
          "Ética, Direitos Humanos e Valores Universais",
          "Aprendizagem para a Vida I",
          "Projeto Integrador de Extensão I",
        ],
        learnings: [
          "Levantamento de requisitos e modelagem de sistemas",
          "Componentes de hardware e infraestrutura de TI",
          "Circuitos lógicos e funcionamento digital",
          "Cálculos algébricos aplicados à computação",
          "Ética na tecnologia e valores universais",
        ],
      },
      {
        period: "2º Período",
        status: "Concluído",
        description:
          "Concluído com foco em estrutura de dados, banco de dados relacional, aritmética computacional e modelagem de processos de negócios.",
        subjects: [
          "Abstração em Estruturas de Dados",
          "Modelagem e Projeto de Banco de Dados",
          "Modelagem de Processo de Negócios",
          "Projeto de Aritmética Computacional e Representação de Dados",
          "Aprendizagem para a Vida II e III",
          "Relações Étnico-raciais e História e Cultura Afro-brasileira, Africana e Indígena",
          "Projetos Integradores de Extensão II e III",
        ],
        learnings: [
          "Listas, filas e pilhas em Java",
          "Modelagem relacional e linguagem SQL",
          "Criação e análise de processos de negócio",
          "Representação binária, hexadecimal e aritmética digital",
          "Diversidade, cultura e inclusão social em tecnologia",
        ],
      },
      {
        period: "3º Período",
        status: "Concluído",
        description:
          "Recém aprovado em todas as disciplinas do 3º período, com foco em desenvolvimento de software, estruturas de dados, cloud computing e qualidade de software.",
        subjects: [
          "Data Storytelling",
          "Construção em Estruturas de Dados",
          "Infraestrutura em Nuvem e Sistemas Distribuídos",
          "Projeto e Qualidade em Engenharia Software",
        ],
        learnings: [
          "Estruturas de Dados em Java",
          "Algoritmos de Ordenação e Grafos",
          "Cloud Computing e APIs REST",
          "Visualização de Dados e Estatística",
          "Testes de Software e Metodologias Ágeis",
        ],
      },
    ],
  },

  admin: {
    title: "Gestão da Tecnologia da Informação",
    institution: "Multivix",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
    periods: [
      {
        period: "1º Período",
        status: "Concluído",
        description:
          "Curso com foco em comunicação, fundamentos de hardware, lógica de programação e introdução à educação a distância.",
        subjects: [
          "Comunicação e Expressão",
          "Fundamentos de Hardware",
          "Algoritmo e Lógica de Programação",
          "Computação e Sociedade",
          "Introdução à Educação a Distância",
        ],
        learnings: [
          "Desenvolvimento de habilidades comunicativas",
          "Conhecimento básico de hardware de computadores",
          "Fundamentos de algoritmos e lógica de programação",
          "Entendimento do impacto da computação na sociedade",
          "Familiarização com modalidades de ensino a distância",
        ],
      },
      {
        period: "2º Período",
        status: "Cursando Agora",
        description:
          "Atualmente cursando com foco em sistemas de informação, sistemas operacionais, gestão ambiental, banco de dados, matemática aplicada, redes e direito digital.",
        subjects: [
          "Sistema de Informação",
          "Sistemas Operacionais",
          "Gestão Ambiental e Responsabilidade Social",
          "Banco de Dados",
          "Matemática Aplicada",
          "Rede de Computadores 1",
          "Direito Digital",
        ],
        learnings: [],
      },
    ],
  },
}

export function EducationSelector() {
  const [selectedCourse, setSelectedCourse] = useState<"ads" | "admin">("ads")
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null)

  const currentEducation = educationData[selectedCourse]
  const IconComponent = currentEducation.icon

  return (
    <div className="space-y-8">
      {/* Course Selector */}
      <div className="flex flex-col sm:flex-row gap-4">
        {Object.entries(educationData).map(([key, course]) => {
          const CourseIcon = course.icon
          const isActive = selectedCourse === key

          return (
            <motion.button
              key={key}
              onClick={() => setSelectedCourse(key as "ads" | "admin")}
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "border-purple-500/50 bg-zinc-800/80"
                  : "border-zinc-700/50 bg-zinc-800/30 hover:border-zinc-600/50"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center flex-shrink-0`}
                >
                  <CourseIcon className="h-6 w-6 text-white" />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-zinc-400">{course.institution}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Course Details */}
      <motion.div
        key={selectedCourse}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentEducation.color} flex items-center justify-center`}
            >
              <IconComponent className="h-8 w-8 text-white" />
            </div>

            <div>
              <h3 className="text-2xl font-bold">{currentEducation.title}</h3>
              <p className="text-zinc-400">{currentEducation.institution}</p>
            </div>
          </div>

          {/* Periods */}
          <div className="space-y-4">
            {currentEducation.periods.map((period, index) => (
              <motion.div
                key={period.period}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedPeriod(
                      expandedPeriod === period.period ? null : period.period
                    )
                  }
                  className="w-full p-4 bg-background/60 hover:bg-background/80 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentEducation.color} flex items-center justify-center text-sm font-bold text-primary-foreground`}
                    >
                      {period.period.charAt(0)}
                    </div>

                    <div className="text-left">
                      <h4 className="font-semibold text-foreground">{period.period}</h4>
                      <span
                        className={`text-sm ${
                          period.status.includes("Trancado")
                            ? "text-yellow-700 dark:text-yellow-300"
                            : "text-green-500 dark:text-green-400"
                        }`}
                      >
                        {period.status}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedPeriod === period.period ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedPeriod === period.period && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-background/70"
                  >
                    <p className="text-foreground/80 mb-6">{period.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-primary">
                          Disciplinas:
                        </h5>
                        <ul className="space-y-2">
                          {period.subjects.map((subject, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0"></div>
                              <span>{subject}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-3 text-primary">
                          Principais Aprendizados:
                        </h5>
                        <ul className="space-y-2">
                          {period.learnings.map((learning, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0"></div>
                              <span>{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
