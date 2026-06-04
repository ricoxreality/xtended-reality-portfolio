"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useProjects,
  ProjectProvider,
  extractYoutubeId,
  getYoutubeThumbnail,
  type Project,
} from "@/context/ProjectContext";

// ── Admin PIN — change this to whatever you want ───────────────────────────────
const ADMIN_PIN = "1234";

// ── Blank project template ─────────────────────────────────────────────────────
const blank: Omit<Project, "id" | "index"> = {
  title: "",
  category: "",
  year: new Date().getFullYear().toString(),
  description: "",
  youtubeUrl: "",
  youtubeId: "",
  thumbnailUrl: "",
  tags: [],
  featured: false,
  visible: true,
};

// ── Category options ───────────────────────────────────────────────────────────
const CATEGORIES = [
  "Brand Film",
  "Product Ad",
  "Fashion Editorial",
  "Social Campaign",
  "Experimental",
  "Music & Sound",
  "Other",
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function YoutubePreview({ youtubeUrl }: { youtubeUrl: string }) {
  const id = extractYoutubeId(youtubeUrl);
  if (!id) return null;
  const thumb = getYoutubeThumbnail(id);
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-white/10 aspect-video relative">
      <img src={thumb} alt="YouTube preview" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/60 bg-black/50 px-2 py-0.5 rounded">
        youtube.com/watch?v={id}
      </div>
    </div>
  );
}

// ── Project Form (create + edit) ───────────────────────────────────────────────
function ProjectForm({
  initial,
  onSave,
  onCancel,
  isEdit = false,
}: {
  initial: Omit<Project, "id" | "index">;
  onSave: (p: Omit<Project, "id" | "index">) => void;
  onCancel: () => void;
  isEdit?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [tagInput, setTagInput] = useState(initial.tags.join(", "));
  const [ytPreview, setYtPreview] = useState(initial.youtubeUrl ?? "");

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...form, tags, youtubeUrl: ytPreview });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grid: Title + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
            Project Title *
          </label>
          <input
            required
            className="admin-input"
            placeholder="e.g. Etheria"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
            Category *
          </label>
          <select
            required
            className="admin-input cursor-pointer appearance-none"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="" disabled>Select...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#1a1a1a] text-[#eeece6]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
            Year
          </label>
          <input
            className="admin-input"
            placeholder="2025"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
            Tags (comma-separated)
          </label>
          <input
            className="admin-input"
            placeholder="Brand Film, 4K, Experimental"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
          Short Description
        </label>
        <textarea
          rows={3}
          className="admin-input resize-none"
          placeholder="One sentence capturing the essence of the project."
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      {/* YouTube URL */}
      <div>
        <label className="block text-[10px] font-sans tracking-[0.15em] uppercase text-[#777] mb-2">
          YouTube URL
        </label>
        <input
          className="admin-input"
          placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
          value={ytPreview}
          onChange={(e) => setYtPreview(e.target.value)}
        />
        <YoutubePreview youtubeUrl={ytPreview} />
        {ytPreview && !extractYoutubeId(ytPreview) && (
          <p className="text-xs text-red-400 mt-1 font-sans">
            URL not recognized as a valid YouTube link.
          </p>
        )}
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => set("featured", !form.featured)}
            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
              form.featured ? "bg-[#eeece6]" : "bg-[#333]"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#111] transition-transform duration-300 ${
                form.featured ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-xs font-sans text-[#aaa] group-hover:text-[#eeece6] transition-colors">
            Featured (full-width)
          </span>
        </label>

        {/* Visible */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => set("visible", !form.visible)}
            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
              form.visible ? "bg-[#eeece6]" : "bg-[#333]"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#111] transition-transform duration-300 ${
                form.visible ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
          <span className="text-xs font-sans text-[#aaa] group-hover:text-[#eeece6] transition-colors">
            Visible on site
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/8">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#eeece6] text-[#111] text-xs font-sans font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white transition-colors"
        >
          {isEdit ? "Save Changes" : "Add Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-sans text-[#777] hover:text-[#eeece6] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Project Row ────────────────────────────────────────────────────────────────
function ProjectRow({
  project,
  onEdit,
  onDelete,
  onToggleVisible,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisible: () => void;
}) {
  const thumb = project.thumbnailUrl || (project.youtubeId ? getYoutubeThumbnail(project.youtubeId) : null);

  return (
    <div className="group grid grid-cols-12 items-center gap-4 py-4 border-b border-white/6 hover:border-white/12 transition-colors">
      {/* Thumbnail */}
      <div className="col-span-2 md:col-span-1">
        <div className="aspect-video rounded overflow-hidden bg-[#1a1a1a] border border-white/6">
          {thumb ? (
            <img src={thumb} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#333] text-[8px] font-mono">
              NO MEDIA
            </div>
          )}
        </div>
      </div>

      {/* Index */}
      <div className="hidden md:block col-span-1">
        <span className="font-display text-[#444] text-sm">{project.index}</span>
      </div>

      {/* Info */}
      <div className="col-span-7 md:col-span-6">
        <div className="flex items-start gap-2 flex-wrap">
          <p className="font-display text-[#eeece6] text-sm font-bold leading-tight">{project.title}</p>
          {project.featured && (
            <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-[#eeece6]/10 text-[#eeece6]/60 rounded">
              Featured
            </span>
          )}
          {!project.visible && (
            <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-red-900/20 text-red-400/60 rounded">
              Hidden
            </span>
          )}
        </div>
        <p className="font-sans text-[#777] text-[11px] mt-0.5">
          {project.category} · {project.year}
        </p>
      </div>

      {/* Actions */}
      <div className="col-span-3 md:col-span-4 flex items-center justify-end gap-2">
        <button
          onClick={onToggleVisible}
          title={project.visible ? "Hide from site" : "Show on site"}
          className="p-1.5 text-[#555] hover:text-[#eeece6] transition-colors"
        >
          {project.visible ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          )}
        </button>
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-[11px] font-sans text-[#eeece6]/60 border border-white/8 rounded hover:border-white/20 hover:text-[#eeece6] transition-all"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-[11px] font-sans text-red-400/50 border border-red-900/20 rounded hover:border-red-400/40 hover:text-red-400 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// ── Admin Inner (needs ProjectProvider) ───────────────────────────────────────
function AdminInner() {
  const { projects, addProject, updateProject, deleteProject, resetToDefault } = useProjects();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const editingProject = projects.find((p) => p.id === editingId);

  const handleSaveNew = (data: Omit<Project, "id" | "index">) => {
    addProject(data);
    setAdding(false);
  };

  const handleSaveEdit = (data: Omit<Project, "id" | "index">) => {
    if (editingId) {
      updateProject(editingId, data);
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProject(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#eeece6]">
      {/* Header */}
      <header className="border-b border-white/8 px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-30 bg-[#111111]">
        <div className="flex items-center gap-4">
          <a href="/" className="font-display text-[#eeece6] text-sm hover:text-white transition-colors">
            ← Back to Site
          </a>
          <span className="text-[#444] text-xs hidden md:inline">|</span>
          <span className="font-display text-[#777] text-xs tracking-widest uppercase hidden md:inline">
            Project Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#555]">
            {projects.filter(p => p.visible).length}/{projects.length} visible
          </span>
          <button
            onClick={() => {
              if (confirm("Reset all projects to defaults? This cannot be undone.")) {
                resetToDefault();
              }
            }}
            className="text-[10px] font-sans text-[#555] hover:text-red-400 transition-colors px-3 py-1.5 border border-white/6 rounded hover:border-red-400/30"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-12">

        {/* Title */}
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl text-[#eeece6] font-bold tracking-tight mb-2">
            Work Projects
          </h1>
          <p className="font-sans text-[#777] text-sm">
            Add, edit, or reorder projects displayed on the public portfolio. Paste a YouTube URL and the thumbnail will appear automatically.
          </p>
        </div>

        {/* Add project panel */}
        <AnimatePresence>
          {adding ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 p-8 rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden"
            >
              <h2 className="font-display text-lg text-[#eeece6] mb-6 font-bold">
                Add New Project
              </h2>
              <ProjectForm
                initial={blank}
                onSave={handleSaveNew}
                onCancel={() => setAdding(false)}
              />
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setAdding(true)}
              className="w-full mb-10 py-4 rounded-xl border border-dashed border-white/15 text-[#777] hover:border-white/30 hover:text-[#eeece6] transition-all duration-300 flex items-center justify-center gap-2 font-sans text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Project
            </motion.button>
          )}
        </AnimatePresence>

        {/* Projects list */}
        <div>
          {/* Column header */}
          <div className="grid grid-cols-12 gap-4 pb-3 border-b border-white/8 mb-2">
            <div className="col-span-2 md:col-span-1 font-mono text-[9px] text-[#555] uppercase tracking-widest">Thumb</div>
            <div className="hidden md:block col-span-1 font-mono text-[9px] text-[#555] uppercase tracking-widest">#</div>
            <div className="col-span-7 md:col-span-6 font-mono text-[9px] text-[#555] uppercase tracking-widest">Project</div>
            <div className="col-span-3 md:col-span-4 font-mono text-[9px] text-[#555] uppercase tracking-widest text-right">Actions</div>
          </div>

          <div className="space-y-0">
            {projects.map((project) => (
              <div key={project.id}>
                {/* Edit form inline */}
                <AnimatePresence>
                  {editingId === project.id && editingProject && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="my-3 p-8 rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden"
                    >
                      <h2 className="font-display text-base text-[#eeece6] mb-6 font-bold">
                        Editing: {editingProject.title}
                      </h2>
                      <ProjectForm
                        initial={editingProject}
                        onSave={handleSaveEdit}
                        onCancel={() => setEditingId(null)}
                        isEdit
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Row */}
                {editingId !== project.id && (
                  <ProjectRow
                    project={project}
                    onEdit={() => setEditingId(project.id)}
                    onToggleVisible={() => updateProject(project.id, { visible: !project.visible })}
                    onDelete={() => handleDelete(project.id)}
                  />
                )}

                {/* Delete confirmation toast */}
                <AnimatePresence>
                  {deleteConfirm === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="py-2 px-4 mb-2 bg-red-950/40 border border-red-500/20 rounded text-xs font-sans text-red-400 flex items-center justify-between"
                    >
                      <span>Click Delete again to confirm removing <strong>{project.title}</strong></span>
                      <button onClick={() => setDeleteConfirm(null)} className="text-[#555] hover:text-white ml-4">
                        Cancel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-sans text-[#555] text-sm">No projects yet. Add your first one above.</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-16 p-6 rounded-xl border border-white/6 bg-[#1a1a1a]">
          <h3 className="font-display text-sm text-[#eeece6] mb-3 font-bold uppercase tracking-widest">
            Quick Tips
          </h3>
          <ul className="space-y-2 font-sans text-xs text-[#777]">
            <li className="flex gap-2"><span className="text-[#444]">·</span> Paste any YouTube URL (youtube.com/watch, youtu.be, youtube.com/shorts) and the thumbnail is auto-generated.</li>
            <li className="flex gap-2"><span className="text-[#444]">·</span> Toggle "Featured" to show a project in a full-width card at the top of the grid.</li>
            <li className="flex gap-2"><span className="text-[#444]">·</span> Toggle visibility to hide a project without deleting it.</li>
            <li className="flex gap-2"><span className="text-[#444]">·</span> All changes are saved in your browser. Clearing site data will reset to defaults.</li>
            <li className="flex gap-2"><span className="text-[#444]">·</span> Admin is at <code className="text-[#aaa]">/admin</code> — bookmark it for quick access.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

// ── PIN Gate ──────────────────────────────────────────────────────────────────
function PinGate({ children }: { children: React.ReactNode }) {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem("xr_admin") === "1") {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("xr_admin", "1");
      setAuthenticated(true);
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 1500);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="font-display text-2xl text-[#eeece6] font-bold tracking-tight mb-2">
            Admin Access
          </h1>
          <p className="font-sans text-[#777] text-sm">Enter your PIN to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              autoFocus
              className={`admin-input text-center text-lg tracking-[0.5em] transition-all ${
                error ? "border-red-400/60 animate-pulse" : ""
              }`}
            />
            {error && (
              <p className="text-xs text-red-400 font-sans mt-2 text-center">Incorrect PIN</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#eeece6] text-[#111] font-sans font-semibold text-sm uppercase tracking-widest py-3 rounded-full hover:bg-white transition-colors"
          >
            Enter
          </button>
          <div className="text-center">
            <a href="/" className="font-sans text-[#555] text-xs hover:text-[#eeece6] transition-colors underline">
              ← Back to site
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Admin Page export ──────────────────────────────────────────────────────────
export default function AdminPage() {
  return (
    <PinGate>
      <AdminInner />
    </PinGate>
  );
}
