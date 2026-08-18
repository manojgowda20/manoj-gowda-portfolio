import { GraduationCap, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { educationData, certificationsData } from '../data/portfolio';

export const Education = () => {
  return (
    <section id="education" className="scroll-mt-20 py-20 lg:py-28 border-t border-black/10 dark:border-white/10 bg-[#edf5ff] dark:bg-[#070b12] text-[#0e1111] dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 dark:text-white/45 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111] dark:bg-white/40" />
            <span>04 / EDUCATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111] dark:text-white">
            Education & Certifications
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 dark:text-white/60 mt-3 max-w-2xl font-light">
            Academic degree track, foundational coursework, and verified professional certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Academic Education History */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/60 dark:text-white/45 font-semibold mb-2 flex items-center gap-2">
              <GraduationCap size={15} className="text-[#2563eb] dark:text-[#4f9cf9]" />
              <span>Academic Milestones</span>
            </div>

            {educationData.map((edu) => (
              <div 
                key={edu.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm transition-all duration-200 hover:shadow-md hover:border-black/20 dark:hover:border-white/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-black/10 dark:border-white/10">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0e1111] dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/70 dark:text-white/55 mt-0.5 font-semibold">
                      {edu.degree} — {edu.fieldOfStudy}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf5ff] dark:bg-white/[0.07] border border-black/5 dark:border-white/[0.08] font-technical text-xs text-[#0e1111]/70 dark:text-white/65 self-start sm:self-center font-medium">
                    <Calendar size={11} />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-display text-[#0e1111]/70 dark:text-white/60 font-light">
                  {edu.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#0e1111]/60 dark:text-white/45" />
                      <span>{edu.location}</span>
                    </span>
                  )}
                  {edu.details && (
                    <span className="font-technical text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#edf5ff] dark:bg-[#4f9cf9]/15 border border-black/5 dark:border-[#4f9cf9]/25 text-[#0e1111]/80 dark:text-[#4f9cf9] font-semibold">
                      {edu.details}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Verified Certifications */}
          <div className="lg:col-span-6 text-left">
            <div className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/60 dark:text-white/45 font-semibold mb-6 flex items-center gap-2">
              <Award size={15} className="text-[#2563eb] dark:text-[#4f9cf9]" />
              <span>Verified Certifications ({certificationsData.length})</span>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0d1421] border border-black/10 dark:border-white/10 shadow-sm max-h-[580px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-3.5">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl bg-[#edf5ff] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.07] hover:border-black/15 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-technical text-[9px] uppercase tracking-widest text-[#2563eb] dark:text-[#4f9cf9] block font-bold">
                        {cert.issuer}
                      </span>
                      <h4 className="font-display text-sm font-bold text-[#0e1111] dark:text-white mt-1 leading-snug">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-technical">
                      <span className="flex items-center gap-1 text-[#0e1111]/70 dark:text-white/55 font-semibold">
                        <Award size={12} className="text-[#2563eb] dark:text-[#4f9cf9]" />
                        <span>Verified</span>
                      </span>

                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-[#0e1111] dark:text-white hover:text-[#2563eb] dark:hover:text-[#4f9cf9] bg-white dark:bg-white/10 px-2.5 py-1 rounded-md border border-black/10 dark:border-white/15 hover:border-black/20 dark:hover:border-[#4f9cf9]/40 transition-colors text-[11px] shadow-2xs dark:shadow-none"
                        >
                          <span>View Certificate</span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-[#0e1111]/50 dark:text-white/35 text-[11px]">Credential on file</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
