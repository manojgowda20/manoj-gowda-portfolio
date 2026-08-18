import React from 'react';
import { 
  Activity, 
  Heart, 
  Shield, 
  FileText, 
  CheckCircle2, 
  Database, 
  Eye, 
  Cpu, 
  ArrowRight, 
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Lock
} from 'lucide-react';
import { projectsData } from '../data/portfolio';

// Local inline SVG GitHub icon to prevent Lucide icon import issues
const GithubIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="13" 
    height="13" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectsProps {
  onSelectProject: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const renderVisualPreview = (project: typeof projectsData[0]) => {
    switch (project.id) {
      case 'project-1': // ICU Monitor
        return (
          <div className="w-full h-full min-h-[250px] rounded-2xl bg-[#090d16] p-4 sm:p-5 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-xl select-none border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
            {/* Ambient Cyan Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Monitor Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
              <span className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span>ICU_TELEMETRY_STREAM</span>
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                BED #04 • REAL-TIME
              </span>
            </div>

            {/* Vitals Cards */}
            <div className="grid grid-cols-2 gap-2.5 my-3 relative z-10">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-bold">
                  <Heart size={13} className="animate-pulse" />
                  <span>HR</span>
                </div>
                <span className="text-base font-bold text-white tracking-tight">74 <span className="text-[9px] text-white/50 font-normal">BPM</span></span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Activity size={12} />
                  <span>SPO2</span>
                </span>
                <span className="text-base font-bold text-emerald-300 tracking-tight">98.5%</span>
              </div>
            </div>

            {/* Glowing 3D ECG Waveform SVG with Flow Animation */}
            <div className="w-full h-10 my-1 relative flex items-center z-10 bg-black/40 rounded-lg px-2 border border-white/5 overflow-hidden">
              <svg viewBox="0 0 200 40" className="w-full h-full text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                <path
                  d="M 0 20 L 25 20 L 30 10 L 35 30 L 40 20 L 80 20 L 85 4 L 90 36 L 95 20 L 140 20 L 145 10 L 150 30 L 155 20 L 200 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            {/* AI Risk Indicator */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[10px] relative z-10">
              <div className="flex items-center gap-1.5 text-white/70">
                <AlertTriangle size={12} className="text-amber-400 animate-bounce" />
                <span>Random Forest Sepsis Risk:</span>
              </div>
              <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">65.4% (MONITORING)</span>
            </div>
          </div>
        );

      case 'project-2': // Land Registry
        return (
          <div className="w-full h-full min-h-[250px] rounded-2xl bg-[#090d16] p-4 sm:p-5 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-xl select-none border border-sky-500/20 hover:border-sky-500/40 transition-all duration-300">
            {/* Ambient Blue Glow */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
              <span className="text-[10px] text-sky-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <Shield size={12} />
                <span>REGISTRY_IMMUTABLE_CHAIN</span>
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                JWT: AUTHENTICATED
              </span>
            </div>

            {/* Document Holographic Card */}
            <div className="p-3 my-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-3 relative z-10">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 flex-shrink-0">
                <FileText size={20} />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="text-[11px] font-bold text-white truncate">DEED_CERTIFICATE_902.pdf</div>
                <div className="text-[8.5px] text-white/60 font-mono">
                  PARCEL ID: #4902-A • SEC: 12-T <br />
                  OWNER_A (0x87F...) → OWNER_B (0x32A...)
                </div>
                <div className="flex items-center gap-1 mt-1 text-[8px] text-emerald-400 font-bold">
                  <CheckCircle2 size={10} />
                  <span>CRYPTOGRAPHICALLY SEALED</span>
                </div>
              </div>
            </div>

            {/* MongoDB node */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[9px] text-white/70 relative z-10">
              <span className="flex items-center gap-1.5">
                <Database size={11} className="text-purple-400" />
                <span>Mongoose Distributed Nodes:</span>
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYNCED</span>
              </span>
            </div>

            {/* Footer Hash */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[9px] relative z-10">
              <span className="text-white/50 font-mono truncate max-w-[140px]">HASH: 0x9f8e7d82b4...</span>
              <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase border border-sky-500/30">
                Verifiable Public Record
              </span>
            </div>
          </div>
        );

      case 'project-3': // AI Security
        return (
          <div className="w-full h-full min-h-[250px] rounded-2xl bg-[#090d16] p-4 sm:p-5 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-xl select-none border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300">
            {/* Ambient Rose Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Camera Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
              <span className="flex items-center gap-2 text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                <span>SURVEILLANCE_HUD_01</span>
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                YOLOv8 60FPS
              </span>
            </div>

            {/* Simulated 3D Bounding Box Target */}
            <div className="relative my-2.5 py-4 flex items-center justify-center border border-dashed border-rose-500/40 rounded-xl bg-white/[0.02] relative z-10 overflow-hidden">
              <div className="text-center space-y-1 relative z-10">
                <Eye size={24} className="mx-auto text-rose-400 opacity-90 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                <span className="inline-block text-[9.5px] text-rose-300 font-bold bg-rose-500/20 px-2.5 py-0.5 rounded border border-rose-500/30">
                  Target: Person (96.4% confidence)
                </span>
                <span className="block text-[8px] text-white/50 font-mono">TRACKING ID: #TRK_42 • REID: ACTIVE</span>
              </div>
            </div>

            {/* Pipeline footer */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[9px] text-white/70 relative z-10">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-rose-400" />
                <span>OpenCV DeepStream Engine</span>
              </span>
              <span className="text-emerald-400 font-semibold uppercase">Low Latency (&lt;18ms)</span>
            </div>
          </div>
        );

      case 'project-4': // AI Banking Agent
        return (
          <div className="w-full h-full min-h-[250px] rounded-2xl bg-[#090d16] p-4 sm:p-5 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-xl select-none border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            {/* Ambient Emerald Glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
              <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>AI_BANKING_ORCHESTRATOR</span>
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold border border-emerald-500/30">
                AGENTIC_WORKFLOW
              </span>
            </div>

            {/* Chat conversation preview */}
            <div className="space-y-2 my-2 text-[9.5px] relative z-10">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/90">
                <span className="text-white/40 block text-[8px] uppercase tracking-wider mb-0.5">User Prompt</span>
                "Transfer $500 to Savings and show my balance."
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                <span className="text-emerald-400 block text-[8px] uppercase font-bold flex items-center justify-between mb-0.5">
                  <span className="flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>Agent Tool Execution</span>
                  </span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/30 rounded text-[7px] text-emerald-300 font-bold">SUCCESS</span>
                </span>
                Transfer completed. New Balance: $14,850.00 • Receipt #TX_9841
              </div>
            </div>

            {/* Tool execution indicator */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[9px] text-white/70 relative z-10">
              <span className="flex items-center gap-1.5">
                <Lock size={11} className="text-emerald-400" />
                <span>JWT Secure Session Auth</span>
              </span>
              <span className="text-emerald-300 font-semibold uppercase">Tool: BankingService</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 text-left">
        <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0e1111]" />
          <span>PROJECTS</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0e1111]">
          Featured Engineering Projects
        </h3>
        <p className="font-display text-sm text-[#0e1111]/70 mt-1.5 font-light">
          Real-world systems built with Python frameworks, database drivers, and deep learning algorithms.
        </p>
      </div>

      {/* Projects Grid with Clean 8-10px Card Hover Lift */}
      <div className="space-y-10">
        {projectsData.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            data-cursor="view"
            onClick={() => onSelectProject(project.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(project.id);
              }
            }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:hover:-translate-y-2 sm:hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.1),0_10px_15px_-5px_rgba(0,0,0,0.04)] sm:hover:border-black/25 focus-visible:-translate-y-2 focus-visible:ring-2 focus-visible:ring-[#0e1111]/20 focus-visible:outline-none transition-all duration-300 ease-out text-left active:scale-[0.99] touch-manipulation group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
              
              {/* Visual Preview Column */}
              <div className="lg:col-span-5">
                {renderVisualPreview(project)}
              </div>

              {/* Text Info Column */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-technical text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf5ff] text-[#0e1111] border border-black/5 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0e1111] mb-2.5 leading-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light mb-4">
                    {project.description}
                  </p>

                  {/* Key Features preview */}
                  <div className="mb-6">
                    <span className="font-technical text-[10px] uppercase tracking-widest text-[#0e1111]/50 block mb-2 font-semibold">
                      Key Highlights
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-display text-xs text-[#0e1111]/80 font-light">
                      {project.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0e1111] mt-1.5 flex-shrink-0" />
                          <span className="line-clamp-2">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 border-t border-[#0e1111]/10 flex flex-wrap items-center gap-3 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project.id);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0e1111] text-white hover:bg-[#0e1111]/90 font-technical text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm cursor-pointer active:scale-95 touch-manipulation min-h-[42px]"
                  >
                    <span>View Project</span>
                    <ArrowRight size={13} />
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#edf5ff] hover:bg-black/5 text-[#0e1111] border border-black/10 font-technical text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[42px]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#edf5ff] hover:bg-black/5 text-[#0e1111] border border-black/10 font-technical text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[42px]"
                    >
                      <GithubIcon />
                      <span>Code</span>
                    </a>
                  ) : null}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
