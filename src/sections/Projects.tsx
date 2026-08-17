import { ArrowRight, ExternalLink, Shield, Eye, Heart, AlertTriangle, FileText, CheckCircle2, Database, Cpu } from 'lucide-react';
import { projectsData, type Project } from '../data/portfolio';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectsProps {
  onSelectProject: (id: string) => void;
}

export const Projects = ({ onSelectProject }: ProjectsProps) => {
  
  const renderVisualPreview = (project: Project) => {
    switch (project.id) {
      case 'project-1': // ICU Dashboard
        return (
          <div className="w-full h-full min-h-[240px] rounded-xl bg-[#090d16] p-4 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-inner select-none border border-black/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">PATIENT: P-409 (CRITICAL)</span>
              </div>
              <span className="text-[9px] text-white/50">STREAMLIT CDSS</span>
            </div>

            {/* Vitals */}
            <div className="grid grid-cols-2 gap-2 my-2.5">
              <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-rose-400">
                  <Heart size={11} className="animate-pulse" />
                  <span>HR</span>
                </div>
                <span className="text-sm font-bold">74 <span className="text-[8px] text-white/50 font-normal">BPM</span></span>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-semibold">SPO2</span>
                <span className="text-sm font-bold text-emerald-300">98%</span>
              </div>
            </div>

            {/* ECG Waveform SVG */}
            <div className="w-full h-8 opacity-90 my-1">
              <svg viewBox="0 0 200 40" className="w-full h-full text-emerald-400">
                <path
                  d="M 0 20 L 25 20 L 30 10 L 35 30 L 40 20 L 80 20 L 85 5 L 90 35 L 95 20 L 140 20 L 145 10 L 150 30 L 155 20 L 200 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* AI Risk Indicator */}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 text-white/70">
                <AlertTriangle size={11} className="text-amber-400" />
                <span>Random Forest Risk:</span>
              </div>
              <span className="font-bold text-amber-400">65.4%</span>
            </div>
          </div>
        );

      case 'project-2': // Land Registry
        return (
          <div className="w-full h-full min-h-[240px] rounded-xl bg-[#090d16] p-4 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-inner select-none border border-black/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] text-sky-400 font-bold flex items-center gap-1.5 uppercase">
                <Shield size={11} />
                <span>REGISTRY_AUTH_PORTAL</span>
              </span>
              <span className="text-[9px] text-emerald-400 font-semibold">JWT: VALID</span>
            </div>

            {/* Document card */}
            <div className="p-3 my-2 rounded bg-white/5 border border-white/10 flex items-start gap-2.5">
              <FileText size={22} className="text-sky-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold">DEED_CERTIFICATE_902.pdf</div>
                <div className="text-[8px] text-white/60">
                  PARCEL ID: 4902-A | SEC: 12-T <br />
                  OWNERSHIP: OWNER_A → OWNER_B
                </div>
                <div className="flex items-center gap-1 mt-1 text-[8px] text-emerald-400 font-bold">
                  <CheckCircle2 size={9} />
                  <span>DIGITALLY VERIFIED</span>
                </div>
              </div>
            </div>

            {/* MongoDB node */}
            <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 text-[9px] text-white/70">
              <span className="flex items-center gap-1">
                <Database size={10} className="text-purple-400" />
                <span>Mongoose Node Status:</span>
              </span>
              <span className="text-emerald-400 font-semibold">CONNECTED</span>
            </div>

            {/* Footer Hash */}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[9px]">
              <span className="text-white/50 font-mono truncate max-w-[130px]">HASH: 0x9f8e7d...</span>
              <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                Public Verified
              </span>
            </div>
          </div>
        );

      case 'project-3': // AI Security
        return (
          <div className="w-full h-full min-h-[240px] rounded-xl bg-[#090d16] p-4 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-inner select-none border border-black/10">
            {/* Camera Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-[10px] text-rose-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>LIVE CAM_01</span>
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-white/80">YOLOv8 STREAM</span>
            </div>

            {/* Simulated Bounding Box */}
            <div className="relative my-2 py-4 flex items-center justify-center border border-dashed border-rose-500/50 rounded bg-white/[0.02]">
              <div className="text-center space-y-1">
                <Eye size={22} className="mx-auto text-rose-400 opacity-80" />
                <span className="block text-[9px] text-rose-400 font-bold bg-rose-500/20 px-2 py-0.5 rounded">
                  Target: Person (94% confidence)
                </span>
                <span className="block text-[8px] text-white/50">Tracking ID: TRK_42</span>
              </div>
            </div>

            {/* Pipeline footer */}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[9px] text-white/70">
              <span className="flex items-center gap-1">
                <Cpu size={10} className="text-sky-400" />
                <span>OpenCV Pipeline</span>
              </span>
              <span className="text-rose-400 font-semibold uppercase">Real-Time Active</span>
            </div>
          </div>
        );

      case 'project-4': // AI Banking Agent
        return (
          <div className="w-full h-full min-h-[240px] rounded-xl bg-[#090d16] p-4 font-technical text-left text-white relative flex flex-col justify-between overflow-hidden shadow-inner select-none border border-black/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI_BANKING_AGENT</span>
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">FINANCIAL_LLM</span>
            </div>

            {/* Chat conversation preview */}
            <div className="space-y-2 my-2 text-[9px]">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-white/90">
                <span className="text-white/40 block text-[7.5px] uppercase">User Query</span>
                "Check my current balance and recent transfers"
              </div>
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                <span className="text-emerald-400 block text-[7.5px] uppercase font-bold flex items-center gap-1">
                  <span>AI Agent Response</span>
                  <span className="px-1 bg-emerald-500/30 rounded text-[7px]">Verified</span>
                </span>
                Balance: $14,850.00 • 3 transactions verified
              </div>
            </div>

            {/* Tool execution indicator */}
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[9px] text-white/70">
              <span className="flex items-center gap-1">
                <Shield size={10} className="text-emerald-400" />
                <span>JWT Session Auth</span>
              </span>
              <span className="text-emerald-300 font-semibold uppercase">Tool: AccountService</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start mb-10">
        <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0e1111]" />
          <span>PROJECTS</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0e1111]">
          Featured Engineering Projects
        </h3>
        <p className="font-display text-sm text-[#0e1111]/70 mt-1.5 font-light">
          Real-world systems built with Python frameworks, database drivers, and deep learning algorithms.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-10">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
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
                        className="font-technical text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#edf5ff] text-[#0e1111] border border-black/5 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0e1111] mb-2.5 leading-tight">
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
                <div className="pt-4 border-t border-[#0e1111]/10 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e1111] text-white hover:bg-[#0e1111]/90 font-technical text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm"
                  >
                    <span>View Project</span>
                    <ArrowRight size={13} />
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#edf5ff] hover:bg-black/5 text-[#0e1111] border border-black/10 font-technical text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#edf5ff] hover:bg-black/5 text-[#0e1111] border border-black/10 font-technical text-xs uppercase tracking-wider font-medium transition-colors"
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
