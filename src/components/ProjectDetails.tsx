import { ArrowLeft, ArrowRight, ExternalLink, HelpCircle, Laptop, Settings, Wrench, ShieldAlert, Database, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/portfolio';

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

const renderArchitectureDiagram = (id: string) => {
  if (id === 'project-2') {
    // Full-Stack MERN Diagram
    return (
      <svg 
        viewBox="0 0 240 370" 
        role="img" 
        aria-label="Full-Stack System Architecture Diagram: Frontend Client to REST API to Express.js Engine to MongoDB Cluster"
        className="w-full max-w-[240px] h-auto text-[#0e1111] select-none mx-auto"
      >
        <defs>
          <marker id="arrowLight" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0e1111" opacity="0.4" />
          </marker>
        </defs>
        
        {/* Frontend */}
        <rect x="20" y="10" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="28" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Frontend (Client UI)</text>
        <text x="120" y="42" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">HTML • CSS • JavaScript</text>
        
        <path d="M 120 56 L 120 110" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 56 L 120 110" />
        </circle>
        
        {/* REST API */}
        <rect x="20" y="110" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="128" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">REST API Endpoints</text>
        <text x="120" y="142" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">JWT Authentication Controllers</text>

        <path d="M 120 156 L 120 210" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 156 L 120 210" begin="0.6s" />
        </circle>

        {/* Express.js */}
        <rect x="20" y="210" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="228" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Express.js Engine</text>
        <text x="120" y="242" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">Node.js Server Routing</text>

        <path d="M 120 256 L 120 310" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 256 L 120 310" begin="1.2s" />
        </circle>

        {/* MongoDB */}
        <rect x="20" y="310" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="120" y="328" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">MongoDB Cluster</text>
        <text x="120" y="342" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">Mongoose Document Schemas</text>
      </svg>
    );
  } else if (id === 'project-4') {
    // AI Banking Agent Pipeline Diagram
    return (
      <svg 
        viewBox="0 0 240 430" 
        role="img" 
        aria-label="AI Banking Agent Architecture: User Conversational UI to FastAPI Gateway to LLM Intent Parser to Banking Tool Execution to Financial Database Layer"
        className="w-full max-w-[240px] h-auto text-[#0e1111] select-none mx-auto"
      >
        <defs>
          <marker id="arrowLight3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0e1111" opacity="0.4" />
          </marker>
        </defs>

        {/* User Interaction */}
        <rect x="20" y="10" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="28" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Customer Chat Interface</text>
        <text x="120" y="42" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">Natural Language Financial Query</text>

        <path d="M 120 56 L 120 100" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight3)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 56 L 120 100" />
        </circle>

        {/* API Gateway */}
        <rect x="20" y="100" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="118" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">FastAPI Backend Gateway</text>
        <text x="120" y="132" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">JWT Authentication & Session Context</text>

        <path d="M 120 146 L 120 190" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight3)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 146 L 120 190" begin="0.5s" />
        </circle>

        {/* LLM Agent Core */}
        <rect x="20" y="190" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="120" y="208" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">LLM Intent & Tool Calling</text>
        <text x="120" y="222" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">OpenAI / LangChain Function Routing</text>

        <path d="M 120 236 L 120 280" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight3)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 236 L 120 280" begin="1s" />
        </circle>

        {/* Banking Tools */}
        <rect x="20" y="280" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="298" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Financial Tool Executor</text>
        <text x="120" y="312" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">Balance, Transactions & Loan Calculator</text>

        <path d="M 120 326 L 120 370" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight3)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 326 L 120 370" begin="1.5s" />
        </circle>

        {/* Secure Ledger & Database */}
        <rect x="20" y="370" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="388" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Database & Account Ledger</text>
        <text x="120" y="402" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">Encrypted Account & Audit Store</text>
      </svg>
    );
  } else {
    // AI Pipeline Diagram (ICU or Surveillance)
    const isSecurity = id === 'project-3';
    return (
      <svg 
        viewBox="0 0 240 430" 
        role="img" 
        aria-label="AI Pipeline Architecture Diagram: Input Stream to Data Processing to AI Model Inference to Prediction to Dashboard Console"
        className="w-full max-w-[240px] h-auto text-[#0e1111] select-none mx-auto"
      >
        <defs>
          <marker id="arrowLight2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0e1111" opacity="0.4" />
          </marker>
        </defs>

        {/* Input */}
        <rect x="20" y="10" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="28" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Input Stream</text>
        <text x="120" y="42" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">
          {isSecurity ? 'Live Surveillance Frames' : 'Physiological Vital Sensors'}
        </text>

        <path d="M 120 56 L 120 100" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight2)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 56 L 120 100" />
        </circle>

        {/* Processing */}
        <rect x="20" y="100" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="118" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Data Preprocessing</text>
        <text x="120" y="132" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">
          {isSecurity ? 'OpenCV Frame Conversions' : 'Allergy Matrix Cross-Reference'}
        </text>

        <path d="M 120 146 L 120 190" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight2)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 146 L 120 190" begin="0.5s" />
        </circle>

        {/* AI Model */}
        <rect x="20" y="190" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="120" y="208" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">AI / ML Model Inference</text>
        <text x="120" y="222" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">
          {isSecurity ? 'YOLOv8 Detection Core' : 'Random Forest Classifier'}
        </text>

        <path d="M 120 236 L 120 280" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight2)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 236 L 120 280" begin="1s" />
        </circle>

        {/* Prediction */}
        <rect x="20" y="280" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="298" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Target Prediction</text>
        <text x="120" y="312" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">
          {isSecurity ? 'Suspicious Activity Logs' : 'Patient Deterioration Risk %'}
        </text>

        <path d="M 120 326 L 120 370" fill="none" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.5" markerEnd="url(#arrowLight2)" />
        <circle r="2.5" fill="#0e1111" opacity="0.7">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 120 326 L 120 370" begin="1.5s" />
        </circle>

        {/* Dashboard */}
        <rect x="20" y="370" width="200" height="46" rx="8" fill="#ffffff" stroke="#0e1111" strokeOpacity="0.2" strokeWidth="1.2" />
        <text x="120" y="388" fill="#0e1111" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Albert Sans, sans-serif">Real-Time Interface</text>
        <text x="120" y="402" fill="#0e1111" opacity="0.6" fontSize="7.5" textAnchor="middle" fontFamily="Fragment Mono, monospace">
          {isSecurity ? 'Security Live Console' : 'Streamlit CDSS Dashboard'}
        </text>
      </svg>
    );
  }
};

export const ProjectDetails = ({ projectId, onBack, onSelectProject }: ProjectDetailsProps) => {
  const project = projectsData.find(p => p.id === projectId) || projectsData[0];
  const currentIndex = projectsData.findIndex(p => p.id === projectId);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  return (
    <main className="min-h-screen bg-[#edf5ff] text-[#0e1111] py-12 sm:py-16 px-4 sm:px-6 select-text">
      <div className="max-w-5xl mx-auto">
        
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/10 text-[#0e1111] hover:bg-[#edf5ff] font-technical text-xs uppercase tracking-wider font-semibold shadow-sm transition-all duration-200 mb-8 focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
        >
          <ArrowLeft size={15} />
          <span>Back to Projects</span>
        </button>

        {/* Hero Header */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-black/10 shadow-sm mb-8 text-left">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-technical text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#edf5ff] text-[#0e1111] border border-black/5 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0e1111] mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="font-display text-sm sm:text-base text-[#0e1111]/80 leading-relaxed font-light mb-6 max-w-3xl">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#0e1111]/10">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0e1111] text-white hover:bg-[#0e1111]/90 font-technical text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
              >
                <span>Live Demonstration</span>
                <ExternalLink size={13} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#edf5ff] text-[#0e1111]/50 border border-black/5 font-technical text-xs uppercase tracking-wider select-none min-h-[40px]">
                <span>Demo (Local Setup)</span>
              </span>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#edf5ff] hover:bg-black/5 text-[#0e1111] border border-black/10 font-technical text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer active:scale-95 touch-manipulation min-h-[44px]"
              >
                <GithubIcon />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#edf5ff] text-[#0e1111]/50 border border-black/5 font-technical text-xs uppercase tracking-wider select-none min-h-[40px]">
                <GithubIcon />
                <span>Private Codebase</span>
              </span>
            )}
          </div>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={16} className="text-[#0e1111]" />
                <h2 className="font-display text-base font-bold text-[#0e1111]">Problem Definition</h2>
              </div>
              <p className="font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light">
                {project.problem}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Laptop size={16} className="text-[#0e1111]" />
                <h2 className="font-display text-base font-bold text-[#0e1111]">System Solution</h2>
              </div>
              <p className="font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm mb-8 text-left">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#0e1111]/10">
            <Settings size={16} className="text-[#0e1111]" />
            <h2 className="font-display text-base font-bold text-[#0e1111]">Key Functional Specifications</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 font-display text-xs sm:text-sm text-[#0e1111]/80 font-light">
                <CheckCircle2 size={14} className="mt-0.5 text-[#0e1111] flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contribution & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={16} className="text-[#0e1111]" />
              <h2 className="font-display text-base font-bold text-[#0e1111]">My Contribution</h2>
            </div>
            <p className="font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light">
              {project.contribution}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert size={16} className="text-[#0e1111]" />
              <h2 className="font-display text-base font-bold text-[#0e1111]">Technical Challenges & Solutions</h2>
            </div>
            <p className="font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light">
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Architecture & Flow Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm mb-10 text-left">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#0e1111]/10">
            <Database size={16} className="text-[#0e1111]" />
            <h2 className="font-display text-base font-bold text-[#0e1111]">Architecture & Technical Implementation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 font-display text-xs sm:text-sm text-[#0e1111]/80 leading-relaxed font-light">
              <p className="mb-4">{project.architecture}</p>
              <div className="p-4 rounded-xl bg-[#edf5ff] border border-black/5 font-technical text-xs text-[#0e1111]/80">
                <span className="font-bold block mb-1">Architecture Summary:</span>
                Modular design with isolated data preprocessing, model inference pipelines, and clean API routing.
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-[#edf5ff] rounded-xl border border-black/5">
              {renderArchitectureDiagram(project.id)}
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation Footer */}
        <div className="pt-8 border-t border-[#0e1111]/10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectProject(prevProject.id)}
            className="flex items-center gap-2 sm:gap-3 p-3 sm:px-5 sm:py-3 rounded-full bg-white border border-black/10 hover:bg-[#edf5ff] text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer active:scale-95 touch-manipulation shadow-sm max-w-[48%] min-h-[44px]"
          >
            <ArrowLeft size={16} className="flex-shrink-0" />
            <div className="hidden sm:block truncate">
              <span className="font-technical text-[9px] uppercase tracking-wider text-[#0e1111]/50 block">Previous</span>
              <span className="font-display text-xs font-bold text-[#0e1111] truncate block">{prevProject.shortTitle || prevProject.title}</span>
            </div>
            <span className="sm:hidden font-technical text-xs uppercase font-bold">Prev</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectProject(nextProject.id)}
            className="flex items-center gap-2 sm:gap-3 p-3 sm:px-5 sm:py-3 rounded-full bg-white border border-black/10 hover:bg-[#edf5ff] text-right transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0e1111]/20 cursor-pointer active:scale-95 touch-manipulation shadow-sm max-w-[48%] min-h-[44px]"
          >
            <span className="sm:hidden font-technical text-xs uppercase font-bold">Next</span>
            <div className="hidden sm:block text-right truncate">
              <span className="font-technical text-[9px] uppercase tracking-wider text-[#0e1111]/50 block">Next</span>
              <span className="font-display text-xs font-bold text-[#0e1111] truncate block">{nextProject.shortTitle || nextProject.title}</span>
            </div>
            <ArrowRight size={16} className="flex-shrink-0" />
          </button>
        </div>

      </div>
    </main>
  );
};
