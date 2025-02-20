"use client";

import { ImagesData } from "@/components/ImageOverlay";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  images: ImagesData[];
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "The Tempest",
    description: "Opening in April 2025",
    images: [
      {
        id: "1-1",
        src: "/projects/ecommerce-1.jpg",
        alt: "E-commerce main view",
      },
      {
        id: "1-2",
        src: "/projects/ecommerce-2.jpg",
        alt: "E-commerce product page",
      },
      {
        id: "1-3",
        src: "/projects/ecommerce-3.jpg",
        alt: "E-commerce checkout",
      },
    ],
    technologies: [
      "#StageManager",
      "#SetCrew",
      "#Shakespeare",
      "#DonaldSandley",
    ],
  },
  {
    id: 2,
    title: "Silent Sky",
    description: "Fall 2024 Straight Play in a Planetarium",
    images: [
      { id: "2-1", src: "/projects/portfolio-1.jpg", alt: "Portfolio home" },
      { id: "2-2", src: "/projects/portfolio-2.jpg", alt: "Portfolio about" },
      { id: "2-3", src: "/projects/portfolio-3.jpg", alt: "Portfolio contact" },
    ],
    technologies: [
      "#StageManager",
      "#CostumeCrew",
      "#PropsCrew",
      "#ChelseaReynolds",
    ],
  },
  {
    id: 3,
    title: "Tomorrow The Island Dies",
    description: "A world-premiere musical written by Ryan Scott Oliver",
    images: [
      { id: "3-1", src: "/projects/task-1.jpg", alt: "Task dashboard" },
      { id: "3-2", src: "/projects/task-2.jpg", alt: "Task details" },
      { id: "3-3", src: "/projects/task-3.jpg", alt: "Task calendar" },
    ],
    technologies: ["#AudioCrew", "#MicTech", "#QLab", "ChelseaReynolds"],
  },
  {
    id: 4,
    title: "Too Much Light Makes The Baby Go Blind",
    description: "30 plays in 60 minutes",
    images: [
      { id: "4-1", src: "/projects/weather-1.jpg", alt: "Weather main view" },
      { id: "4-2", src: "/projects/weather-2.jpg", alt: "Weather forecast" },
      { id: "4-3", src: "/projects/weather-3.jpg", alt: "Weather maps" },
    ],
    technologies: ["#LightingCrew", "#LightBoardOperator"],
  },
  {
    id: 5,
    title: "Lucky Stiff",
    description: "A deadman leaves his fortune to his nephew",
    images: [
      { id: "5-1", src: "/projects/social-1.jpg", alt: "Analytics dashboard" },
      { id: "5-2", src: "/projects/social-2.jpg", alt: "Analytics graphs" },
      { id: "5-3", src: "/projects/social-3.jpg", alt: "Analytics reports" },
    ],
    technologies: ["#LightingCrew", "#LightBoardOperator", "#ConstructionCrew"],
  },
  {
    id: 6,
    title: "The Lion, The Witch, and The Wardrobe",
    description:
      "A theater for youth production based off the C.S. Lewis novel",
    images: [
      { id: "6-1", src: "/projects/ai-1.jpg", alt: "AI generator interface" },
      { id: "6-2", src: "/projects/ai-2.jpg", alt: "Generated images" },
      { id: "6-3", src: "/projects/ai-3.jpg", alt: "Settings panel" },
    ],
    technologies: [
      "#AssistantStageManager",
      "#LightingCrew",
      "#ConstructionCrew",
    ],
  },
];

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<number>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.id.split("-")[1]);
            setActiveProject(projectId);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    projects.forEach((project) => {
      const element = document.getElementById(`project-${project.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="container min-w-full">
      {/* Navigation dots */}
      <div className="fixed left-0 top-1/2 translate-y-[-50%] z-50">
        {projects.map((project, index) => (
          <div
            key={index}
            className="h-3 group flex items-center cursor-pointer"
            onClick={() => {
              document.getElementById(`project-${project.id}`)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <div
              className={`w-5 h-1 transition-all duration-100 ease-in
                ${
                  activeProject === project.id
                    ? "w-8 h-1 bg-primary"
                    : "bg-primary group-hover:w-6 group-hover:h-1"
                }`}
            />
            <div className="hidden group-hover:block ml-4 bg-gray-800 text-white px-2 py-1 rounded text-sm">
              {project.title}
            </div>
          </div>
        ))}
      </div>

      {/* Project sections */}
      {projects.map((project) => (
        <section
          key={project.id}
          id={`project-${project.id}`}
          className="flex min-h-screen justify-center  md:w-full p-4 sm:p-8 md:p-20"
        >
          <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-8 lg:gap-4">
            <div className="flex flex-col gap-4 lg:w-1/2 justify-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex w-full md:w-1/2 items-center justify-center">
              {/* <ImageOverlay images={project.images} /> */}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
