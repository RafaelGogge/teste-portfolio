"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Shield,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  ExternalLink,
  Zap,
  Star,
  TrendingUp,
  Server,
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const coursesData = [
	{
		id: "iniciante-em-programacao-alura",
		title: "Formação Iniciante em Programação G9 - ONE",
		institution: "Oracle + Alura",
		duration: 76,
		status: "completed",
		category: "fullstack",
		level: "beginner",
		certificate:
			"https://cursos.alura.com.br/degree/certificate/dc253c15-c6c2-4583-8e69-d759b9f7726a",
		description:
			"Formação completa em lógica de programação, Git/GitHub, fundamentos de HTML, CSS e introdução à Inteligência Artificial e Engenharia de Prompt. Foco em projetos práticos, responsividade e colaboração em equipe.",
		skills: ["JavaScript", "Git", "GitHub", "HTML", "CSS", "IA", "Prompt"],
		color: "#61dafb",
		progress: 100,
	},
	{
		id: "html-css-flexbox-alura",
		title: "HTML e CSS: Classes, Posicionamento e Flexbox",
		institution: "Oracle + Alura",
		duration: 8,
		status: "completed",
		category: "frontend",
		level: "beginner",
		certificate:
			"https://cursos.alura.com.br/certificate/b4e712dd-ba5f-4006-bdc4-48aeca5a593c",
		description:
			"Curso prático de HTML e CSS abordando seletores, posicionamento de elementos, estilos de texto, manipulação de botões e espaçamento. Todas as atividades concluídas.",
		skills: ["HTML", "CSS", "Flexbox", "Seletores", "Posicionamento"],
		color: "#e34c26",
		progress: 100,
	},
	{
		id: "html-css-header-footer-variaveis",
		title: "HTML e CSS: Cabeçalho, Footer e Variáveis CSS",
		institution: "Oracle + Alura",
		duration: 6,
		status: "completed",
		category: "frontend",
		level: "beginner",
		certificate:
			"https://cursos.alura.com.br/certificate/934fa577-11f0-4008-9993-1fac51bdccce",
		description:
			"Curso prático de HTML e CSS com foco em layout, header, footer, navegação entre páginas e aplicação de variáveis CSS. Todas as atividades concluídas.",
		skills: ["HTML", "CSS", "Layout", "Header", "Footer", "Variáveis CSS"],
		color: "#e34c26",
		progress: 100,
	},
	{
		id: "html-css-responsividade-publicacao",
		title: "HTML e CSS: trabalhando com responsividade e publicação de projetos",
		institution: "Oracle + Alura",
		duration: 6,
		status: "completed",
		category: "frontend",
		level: "beginner",
		certificate:
			"https://cursos.alura.com.br/certificate/7d4c1ad4-5839-43fe-9ca7-b903f258a86d",
		description:
			"Curso prático de HTML e CSS abordando unidades de medida, adaptação de elementos, responsividade e publicação de projetos no GitHub. Todas as atividades concluídas.",
		skills: ["HTML", "CSS", "Responsividade", "GitHub"],
		color: "#e34c26",
		progress: 100,
	},
	{
		id: "html-css-ambientes-estrutura-tags",
		title:
			"HTML e CSS: ambientes de desenvolvimento, estrutura de arquivos e tags",
		institution: "Oracle + Alura",
		duration: 8,
		status: "completed",
		category: "frontend",
		level: "beginner",
		certificate:
			"https://cursos.alura.com.br/certificate/4bd27e70-910f-41e1-b536-7dda3861e09b",
		description:
			"Curso prático de HTML e CSS com foco em VSCode, documentação, layout, tags semânticas e estilização avançada. Todas as atividades concluídas.",
		skills: ["HTML", "CSS", "VSCode", "Layout", "Tags Semânticas"],
		color: "#e34c26",
		progress: 100,
	},
];

const categories = [
	{
		id: "all",
		label: "Todos",
		icon: Star,
		color: "#f59e0b",
	},
	{
		id: "fullstack",
		label: "Fullstack",
		icon: Server,
		color: "#3b82f6",
	},
	{
		id: "frontend",
		label: "Frontend",
		icon: Code2,
		color: "#e34c26",
	},
	{
		id: "backend",
		label: "Backend",
		icon: Database,
		color: "#10b981",
	},
	{
		id: "devops",
		label: "DevOps",
		icon: Cloud,
		color: "#8b5cf6",
	},
	{
		id: "security",
		label: "Segurança",
		icon: Shield,
		color: "#ef4444",
	},
];

export function HologramCourses() {
	const { t } = useI18n();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [showAll, setShowAll] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);

	const filteredCourses = coursesData.filter((course) =>
		selectedCategory === "all" || course.category === selectedCategory
	);
	const coursesToShow = showAll ? filteredCourses : filteredCourses.slice(0, 6);

	const getStatusIcon = (status: string) => {
		return status === "completed" ? CheckCircle : PlayCircle;
	};

	const getStatusColor = (status: string) => {
		return status === "completed" ? "#10b981" : "#3b82f6";
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case "beginner":
				return "#10b981";
			case "intermediate":
				return "#f59e0b";
			case "advanced":
				return "#ef4444";
			default:
				return "#6b7280";
		}
	};

	return (
		<div className="space-y-8">
			{/* Holographic Header */}
			<div className="relative">
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl"
					animate={{
						opacity: [0.5, 0.8, 0.5],
						scale: [1, 1.02, 1],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				<div className="relative bg-background/70 backdrop-blur-sm border border-border rounded-2xl p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
							<TrendingUp className="w-6 h-6 text-foreground" />
						</div>
						<div>
							<h3 className="text-xl font-bold text-foreground">
								Sistema de Aprendizado
							</h3>
							<p className="text-muted-foreground text-sm">
								{filteredCourses.length} cursos •{" "}
								{coursesData.filter((c) => c.status === "completed").length}{" "}
								concluídos
							</p>
						</div>
					</div>
					{/* Progress Ring */}
					<div className="relative w-16 h-16">
						<svg
							className="w-16 h-16 transform -rotate-90"
							viewBox="0 0 64 64"
						>
							<circle
								cx="32"
								cy="32"
								r="28"
								stroke="rgba(59, 130, 246, 0.2)"
								strokeWidth="6"
								fill="none"
							/>
							<motion.circle
								cx="32"
								cy="32"
								r="28"
								stroke="#3b82f6"
								strokeWidth="6"
								fill="none"
								strokeLinecap="round"
								initial={{ pathLength: 0 }}
								animate={{
									pathLength:
										coursesData.filter((c) => c.status === "completed")
											.length / coursesData.length,
								}}
								transition={{ duration: 2, ease: "easeOut" }}
								style={{
									pathLength:
										coursesData.filter((c) => c.status === "completed")
											.length / coursesData.length,
									strokeDasharray: "175.929",
								}}
							/>
						</svg>
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-xs font-bold text-primary">
								{Math.round(
									(coursesData.filter((c) => c.status === "completed")
										.length /
										coursesData.length) *
										100
								)}
								%
							</span>
						</div>
					</div>
				</div>

				{/* Category Filter */}
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => {
						const IconComponent = category.icon;
						const isActive = selectedCategory === category.id;

						return (
							<motion.button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
									isActive
										? "border-primary/50 bg-primary/20 text-primary"
										: "border-border bg-muted/50 text-muted-foreground hover:border-border/70"
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<IconComponent
									className="w-4 h-4"
									style={{ color: isActive ? "var(--primary)" : category.color }}
								/>
								<span className="text-sm font-medium">{category.label}</span>
							</motion.button>
						);
					})}
				</div>
			</div>

			{/* Courses Grid */}
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
				layout
			>
				<AnimatePresence mode="popLayout">
					{coursesToShow.map((course, index) => {
						const StatusIcon = getStatusIcon(course.status);
						return (
							<motion.div
								key={course.id}
								layout
								initial={{ opacity: 0, scale: 0.8, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.8, y: -20 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
									layout: { duration: 0.3 },
								}}
								className="group"
							>
								<motion.div
									className="relative bg-background/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-border/70 transition-all duration-300"
									style={{
										boxShadow: `0 4px 20px ${course.color}20`,
									}}
									whileHover={{
										y: -5,
										boxShadow: `0 8px 30px ${course.color}30`,
									}}
									onClick={() =>
										setSelectedCourse(
											selectedCourse === course.id ? null : course.id
										)
									}
								>
									{/* Holographic Effect */}
									<motion.div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										style={{
											background: `linear-gradient(45deg, ${course.color}10, transparent, ${course.color}10)`,
										}}
										animate={{
											backgroundPosition: ["0% 0%", "100% 100%"],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											repeatType: "reverse",
										}}
									/>

									{/* Progress Bar */}
									<div className="absolute top-0 left-0 right-0 h-1 bg-border/60">
										<motion.div
											className="h-full"
											style={{ backgroundColor: course.color }}
											initial={{ width: 0 }}
											animate={{ width: `${course.progress}%` }}
											transition={{ duration: 1, delay: index * 0.1 }}
										/>
									</div>

									<div className="p-6">
										{/* Header */}
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-2">
													<StatusIcon
														className="w-5 h-5"
														style={{ color: getStatusColor(course.status) }}
													/>
													<span
														className="text-xs font-medium px-2 py-1 rounded-full"
														style={{
															backgroundColor: `${getLevelColor(
																course.level
															)}20`,
															color: getLevelColor(course.level),
														}}
													>
														{course.level}
													</span>
												</div>

												<h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
													{course.title}
												</h3>

												<p className="text-sm text-muted-foreground mb-2">
													{course.institution}
												</p>
											</div>

											<div className="flex items-center gap-2 text-muted-foreground">
												<Clock className="w-4 h-4" />
												<span className="text-sm">{course.duration}h</span>
											</div>
										</div>

										{/* Description */}
										<p className="text-sm text-foreground/80 mb-4 line-clamp-2">
											{course.description}
										</p>

										{/* Skills */}
										<div className="flex flex-wrap gap-1 mb-4">
											{course.skills.slice(0, 3).map((skill) => (
												<span
													key={skill}
													className="text-xs px-2 py-1 bg-muted/50 text-foreground/80 rounded border border-border"
												>
													{skill}
												</span>
											))}
											{course.skills.length > 3 && (
												<span className="text-xs px-2 py-1 text-muted-foreground">
													+{course.skills.length - 3}
												</span>
											)}
										</div>

										{/* Actions */}
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div
													className="w-3 h-3 rounded-full"
													style={{
														backgroundColor: getStatusColor(course.status),
													}}
												/>
												<span className="text-xs text-muted-foreground">
													{course.status === "completed"
														? "Concluído"
														: "Em andamento"}
												</span>
											</div>

											{course.certificate && (
												<motion.a
													href={course.certificate}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													<Award className="w-3 h-3" />
													<span>Certificado</span>
													<ExternalLink className="w-3 h-3" />
												</motion.a>
											)}
										</div>
									</div>

									{/* Expanded Details */}
									<AnimatePresence>
										{selectedCourse === course.id && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3 }}
												className="border-t border-border bg-background/50 p-4"
											>
												<h4 className="text-sm font-semibold mb-2 text-primary">
													Todas as Tecnologias:
												</h4>
												<div className="flex flex-wrap gap-1">
													{course.skills.map((skill) => (
														<span
															key={skill}
															className="text-xs px-2 py-1 bg-primary/20 text-primary rounded border border-primary/30"
														>
															{skill}
														</span>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</motion.div>
						);
					})}
				</AnimatePresence>
				{filteredCourses.length > 6 && (
					<div className="absolute left-0 right-0 flex justify-center mt-6 pointer-events-none">
						<div className="flex justify-center w-full pointer-events-auto">
							<button
								className="px-6 py-2 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-primary/80 transition-colors"
								onClick={() => setShowAll((prev) => !prev)}
							>
								{showAll ? "Mostrar menos" : "Mostrar mais"}
							</button>
						</div>
					</div>
				)}
			</motion.div>

			{/* Modal de cursos completos da formação */}
			<AnimatePresence>
				{showModal && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-background rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-border overflow-y-auto max-h-[80vh]"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
						>
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-bold text-foreground">
									Todos os cursos da formação "{categories.find(c => c.id === selectedCategory)?.label || "Todos"}"
								</h3>
								<button
									className="px-4 py-1 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
									onClick={() => setShowModal(false)}
								>
									Fechar
								</button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
								{filteredCourses.map((course, index) => {
									const StatusIcon = getStatusIcon(course.status);
									return (
										<motion.div
											key={course.id}
											layout
											initial={{ opacity: 0, scale: 0.8, y: 20 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.8, y: -20 }}
											transition={{
												duration: 0.4,
												delay: index * 0.05,
												layout: { duration: 0.3 },
											}}
											className="group"
										>
											<motion.div
												className="relative bg-background/70 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-border/70 transition-all duration-300"
												style={{
													boxShadow: `0 4px 20px ${course.color}20`,
												}}
												whileHover={{
													y: -5,
													boxShadow: `0 8px 30px ${course.color}30`,
												}}
												onClick={() =>
													setSelectedCourse(
														selectedCourse === course.id ? null : course.id
													)
												}
											>
												{/* Holographic Effect */}
												<motion.div
													className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
													style={{
														background: `linear-gradient(45deg, ${course.color}10, transparent, ${course.color}10)`,
													}}
													animate={{
														backgroundPosition: ["0% 0%", "100% 100%"],
													}}
													transition={{
														duration: 3,
														repeat: Infinity,
														repeatType: "reverse",
													}}
												/>
												{/* Progress Bar */}
												<div className="absolute top-0 left-0 right-0 h-1 bg-border/60">
													<motion.div
														className="h-full"
														style={{ backgroundColor: course.color }}
														initial={{ width: 0 }}
														animate={{ width: `${course.progress}%` }}
														transition={{ duration: 1, delay: index * 0.05 }}
													/>
												</div>
												<div className="p-6">
													{/* Header */}
													<div className="flex items-start justify-between mb-4">
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-2">
																<StatusIcon
																	className="w-5 h-5"
																	style={{ color: getStatusColor(course.status) }}
																/>
																<span
																	className="text-xs font-medium px-2 py-1 rounded-full"
																	style={{
																		backgroundColor: `${getLevelColor(course.level)}20`,
																		color: getLevelColor(course.level),
																	}}
																>
																	{course.level}
																</span>
															</div>
															<h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
																{course.title}
															</h3>
															<p className="text-sm text-muted-foreground mb-2">
																{course.institution}
															</p>
														</div>
														<div className="flex items-center gap-2 text-muted-foreground">
															<Clock className="w-4 h-4" />
															<span className="text-sm">{course.duration}h</span>
														</div>
													</div>
													{/* Description */}
													<p className="text-sm text-foreground/80 mb-4 line-clamp-2">
														{course.description}
													</p>
													{/* Skills */}
													<div className="flex flex-wrap gap-1 mb-4">
														{course.skills.slice(0, 3).map((skill) => (
															<span
																key={skill}
																className="text-xs px-2 py-1 bg-muted/50 text-foreground/80 rounded border border-border"
															>
																{skill}
															</span>
														))}
														{course.skills.length > 3 && (
															<span className="text-xs px-2 py-1 text-muted-foreground">
																+{course.skills.length - 3}
															</span>
														)}
													</div>
													{/* Actions */}
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<div
																className="w-3 h-3 rounded-full"
																style={{ backgroundColor: getStatusColor(course.status) }}
															/>
															<span className="text-xs text-muted-foreground">
																{course.status === "completed" ? "Concluído" : "Em andamento"}
															</span>
														</div>
														{course.certificate && (
															<motion.a
																href={course.certificate}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
															>
																<Award className="w-3 h-3" />
																<span>Certificado</span>
																<ExternalLink className="w-3 h-3" />
															</motion.a>
														)}
													</div>
												</div>
												{/* Expanded Details */}
												<AnimatePresence>
													{selectedCourse === course.id && (
														<motion.div
															initial={{ height: 0, opacity: 0 }}
															animate={{ height: "auto", opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															transition={{ duration: 0.3 }}
															className="border-t border-border bg-background/50 p-4"
														>
															<h4 className="text-sm font-semibold mb-2 text-primary">
																Todas as Tecnologias:
															</h4>
															<div className="flex flex-wrap gap-1">
																{course.skills.map((skill) => (
																	<span
																		key={skill}
																		className="text-xs px-2 py-1 bg-primary/20 text-primary rounded border border-primary/30"
																	>
																		{skill}
																	</span>
																))}
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</motion.div>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
