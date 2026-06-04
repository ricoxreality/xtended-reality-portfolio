"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Project type ───────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  index: string;        // "I", "II" etc
  title: string;
  category: string;
  year: string;
  description: string;
  shortDescription?: string; // Short context paragraph for the overview section
  youtubeUrl?: string;  // Full YouTube URL — admin pastes this
  youtubeId?: string;   // Extracted video ID
  thumbnailUrl?: string;// Auto-generated from youtubeId
  href?: string;        // Custom page route (e.g. "/work/nike-speed")
  tags: string[];       // ["Brand Film", "4K"]
  featured: boolean;    // Show in full-width slot
  visible: boolean;     // Toggle visibility without deleting
}

// ── Helpers ────────────────────────────────────────────────────────────────────
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getYoutubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function getYoutubeEmbed(id: string): string {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

// ── Default project data ───────────────────────────────────────────────────────
const defaultProjects: Project[] = [
  {
    id: "nike-speed",
    index: "I",
    title: "Untouchable",
    category: "Brand Film",
    year: "2025",
    description: "A visceral portrait of human performance at its limit — capturing impossible slow-motion clarity through generative AI.",
    shortDescription: "This campaign explores the boundary between human physiology and machine perception. By capturing micro-movements and augmenting them through our proprietary AI models, we visualized speed not just as motion, but as raw energy.",
    youtubeUrl: "",
    youtubeId: "",
    thumbnailUrl: "/projects/nike/boxer-eyes.jpg",
    href: "/work/nike-speed",
    tags: ["Brand Film", "AI Generation"],
    featured: true,
    visible: true,
  },
  {
    id: "ysl-meets-yakuza",
    index: "II",
    title: "YSL meets Yakuza",
    category: "Brand Film",
    year: "2025",
    description: "A dreamscape journey through impossible virtual architectures. Surreal fluid dynamics, hyper-real environments, no location budget.",
    shortDescription: "An experimental fashion film replacing runway models with digital avatars. We fused YSL's structured silhouettes with Yakuza's cinematic aggression, creating a unique aesthetic that bridges the gap between high fashion and gaming culture.",
    youtubeUrl: "",
    youtubeId: "",
    thumbnailUrl: "/images/ysl-yakuza.png",
    href: "/work/ysl-meets-yakuza",
    tags: ["Brand Film", "Experimental"],
    featured: true,
    visible: true,
  },
  {
    id: "the-syn",
    index: "III",
    title: "The Syn",
    category: "Concept Short Film",
    year: "2026",
    description: "A surreal exploration of dogma and devotion set against desolate, otherworldly landscapes.",
    shortDescription: "This concept short film visualizes a cryptic ritual unfolding in a barren wasteland. Combining striking color contrasts—vibrant crimson against muted greys—it delves into themes of blind faith and the monumental scale of ancient beliefs.",
    youtubeUrl: "",
    youtubeId: "",
    thumbnailUrl: "/projects/the-syn/path.jpg",
    href: "/work/the-syn",
    tags: ["Short Film", "Concept", "Cinematic"],
    featured: true,
    visible: true,
  },
  {
    id: "the-forest",
    index: "IV",
    title: "The Forest",
    category: "Short Film",
    year: "2026",
    description: "A post-apocalyptic eco sci-fi story about Kaï and Mara, two women trapped inside the last safe shelter in a poisoned earth.",
    shortDescription: "Kaï wants to know if the world outside is finally healing. Mara wants to keep everyone alive... but something darker is growing inside her. The forest is alive. But not everything alive is safe.",
    youtubeUrl: "",
    youtubeId: "",
    thumbnailUrl: "/projects/the-forest/environment.png",
    href: "/work/the-forest",
    tags: ["Cinematic", "Environment", "Characters"],
    featured: true,
    visible: true,
  },
];

// ── Context ────────────────────────────────────────────────────────────────────
interface ProjectContextType {
  projects: Project[];
  addProject: (p: Omit<Project, "id" | "index">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
  resetToDefault: () => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

const STORAGE_KEY = "xr_projects";

function reindex(projects: Project[]): Project[] {
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return projects.map((p, i) => ({
    ...p,
    index: numerals[i] ?? String(i + 1),
  }));
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(defaultProjects);
      }
    } catch {
      setProjects(defaultProjects);
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever projects change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, loaded]);

  const addProject = useCallback((p: Omit<Project, "id" | "index">) => {
    setProjects((prev) => {
      const youtubeId = p.youtubeUrl ? extractYoutubeId(p.youtubeUrl) ?? "" : "";
      const newProject: Project = {
        ...p,
        id: `p_${Date.now()}`,
        index: "I",
        youtubeId,
        thumbnailUrl: youtubeId ? getYoutubeThumbnail(youtubeId) : "",
      };
      return reindex([...prev, newProject]);
    });
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      reindex(
        prev.map((p) => {
          if (p.id !== id) return p;
          const merged = { ...p, ...updates };
          // Auto-extract YouTube ID if URL changed
          if (updates.youtubeUrl !== undefined) {
            const ytId = extractYoutubeId(updates.youtubeUrl ?? "") ?? "";
            merged.youtubeId = ytId;
            merged.thumbnailUrl = ytId ? getYoutubeThumbnail(ytId) : merged.thumbnailUrl;
          }
          return merged;
        })
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => reindex(prev.filter((p) => p.id !== id)));
  }, []);

  const reorderProjects = useCallback((newOrder: Project[]) => {
    setProjects(reindex(newOrder));
  }, []);

  const resetToDefault = useCallback(() => {
    setProjects(defaultProjects);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, reorderProjects, resetToDefault }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
