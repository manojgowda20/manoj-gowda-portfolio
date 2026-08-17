import { motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { certificationsData } from '../data/portfolio';

export const Certifications = () => {
  const shouldReduceMotion = useReducedMotion();

  // Map issuers to custom brand colors and monograms for clean, SVG-like badge representation
  const getBrandBadge = (issuer: string) => {
    let bg = 'from-blue-600/20 to-blue-400/10';
    let border = 'border-blue-500/20';
    let text = 'text-blue-400';
    let monogram = 'G';

    switch (issuer.toLowerCase()) {
      case 'google':
        bg = 'from-blue-600/20 to-red-500/10';
        border = 'border-blue-500/20';
        text = 'text-blue-400';
        monogram = 'G';
        break;
      case 'google cloud':
        bg = 'from-sky-500/20 to-blue-600/10';
        border = 'border-sky-500/20';
        text = 'text-sky-400';
        monogram = 'GC';
        break;
      case 'ibm':
        bg = 'from-blue-700/20 to-sky-600/10';
        border = 'border-blue-600/20';
        text = 'text-sky-300';
        monogram = 'IBM';
        break;
      case 'microsoft':
        bg = 'from-red-500/10 via-green-500/10 to-blue-500/10';
        border = 'border-white/10';
        text = 'text-white/80';
        monogram = 'MS';
        break;
      case 'aws':
        bg = 'from-amber-600/20 to-orange-500/10';
        border = 'border-amber-500/20';
        text = 'text-amber-400';
        monogram = 'AWS';
        break;
      case 'cisco':
        bg = 'from-cyan-600/20 to-teal-500/10';
        border = 'border-cyan-500/20';
        text = 'text-cyan-400';
        monogram = 'CS';
        break;
      case 'databricks':
        bg = 'from-orange-600/20 to-red-500/10';
        border = 'border-orange-500/20';
        text = 'text-orange-400';
        monogram = 'DB';
        break;
      case 'intel':
        bg = 'from-blue-600/20 to-indigo-500/10';
        border = 'border-blue-500/20';
        text = 'text-blue-400';
        monogram = 'INTC';
        break;
      case 'sap':
        bg = 'from-blue-800/20 to-cyan-700/10';
        border = 'border-blue-700/20';
        text = 'text-cyan-300';
        monogram = 'SAP';
        break;
      case 'nvidia':
        bg = 'from-emerald-600/20 to-green-500/10';
        border = 'border-emerald-500/20';
        text = 'text-emerald-400';
        monogram = 'NV';
        break;
      case 'skillected':
        bg = 'from-violet-600/20 to-purple-500/10';
        border = 'border-violet-500/20';
        text = 'text-violet-400';
        monogram = 'SE';
        break;
      case 'linkedin':
        bg = 'from-blue-700/25 to-blue-600/10';
        border = 'border-blue-600/20';
        text = 'text-blue-400';
        monogram = 'IN';
        break;
      case 'simplilearn':
        bg = 'from-red-600/20 to-orange-500/10';
        border = 'border-red-500/20';
        text = 'text-red-400';
        monogram = 'SL';
        break;
    }

    return (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} border ${border} flex items-center justify-center font-mono font-bold text-xs ${text} flex-shrink-0 shadow-inner`}>
        {monogram}
      </div>
    );
  };

  return (
    <section 
      id="certifications" 
      className="relative py-20 lg:py-28 overflow-hidden border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Credentials"
          title="Certifications & Badges"
          subtitle="Verified technical credentials and course completions from industry organizations."
          align="center"
        />

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
          {certificationsData.map((cert, idx) => {
            const hasCredentialUrl = !!cert.credentialUrl;

            return (
              <motion.div
                key={cert.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: (idx % 4) * 0.1 }}
                className="group relative"
              >
                {/* Certificate Card */}
                <div className="glass-panel p-4.5 rounded-2xl border border-border/40 bg-surface/10 hover:bg-surface-hover/10 hover:border-white/20 -translate-y-0 hover:-translate-y-1 transition-all duration-300 shadow-glass flex flex-col justify-between h-full text-left">
                  
                  <div className="flex gap-3.5 items-start">
                    {/* Brand monogram icon */}
                    {getBrandBadge(cert.issuer)}
                    
                    <div className="flex-grow min-w-0">
                      {/* Organization Name */}
                      <span className="text-[9px] font-bold font-mono tracking-widest text-text-muted uppercase block">
                        {cert.issuer}
                      </span>
                      
                      {/* Certificate Title */}
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight mt-1 leading-tight group-hover:text-accent-cyan transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h4>
                    </div>
                  </div>

                  {/* bottom footer row */}
                  <div className="mt-5 pt-3 border-t border-border/20 flex items-center justify-between">
                    <span className="text-[9px] text-text-muted flex items-center gap-1">
                      <Award size={10} className="text-accent-cyan" />
                      <span>Verified Course</span>
                    </span>

                    {/* Conditional Credential verification link */}
                    {hasCredentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent-cyan hover:text-white transition-colors"
                        aria-label={`Verify credential for ${cert.title}`}
                      >
                        <span>Verify</span>
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-text-muted/40 italic select-none">
                        Internal Ledger
                      </span>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
