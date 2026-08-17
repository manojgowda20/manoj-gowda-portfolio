import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { educationData, certificationsData } from '../data/portfolio';

export const Education = () => {
  return (
    <section id="education" className="py-20 lg:py-28 border-t border-[#0e1111]/10 bg-[#edf5ff] text-[#0e1111]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="font-technical text-xs uppercase tracking-widest text-[#0e1111]/60 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0e1111]" />
            <span>04 / EDUCATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0e1111]">
            Education & Certifications
          </h2>
          <p className="font-display text-sm sm:text-base text-[#0e1111]/70 mt-3 max-w-2xl font-light">
            Academic degree track, foundational coursework, and verified professional certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Academic Education History */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/60 font-semibold mb-2 flex items-center gap-2">
              <GraduationCap size={15} />
              <span>Academic Milestones</span>
            </div>

            {educationData.map((edu) => (
              <div 
                key={edu.id}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-black/10 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#0e1111]/10">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0e1111]">
                      {edu.institution}
                    </h3>
                    <p className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/70 mt-0.5 font-semibold">
                      {edu.degree} — {edu.fieldOfStudy}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf5ff] border border-black/5 font-technical text-xs text-[#0e1111]/70 self-start sm:self-center font-medium">
                    <Calendar size={11} />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-display text-[#0e1111]/70 font-light">
                  {edu.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#0e1111]/60" />
                      <span>{edu.location}</span>
                    </span>
                  )}
                  {edu.details && (
                    <span className="font-technical text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#edf5ff] border border-black/5 text-[#0e1111]/80 font-semibold">
                      {edu.details}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Verified Certifications */}
          <div className="lg:col-span-6 text-left">
            <div className="font-technical text-xs uppercase tracking-wider text-[#0e1111]/60 font-semibold mb-6 flex items-center gap-2">
              <Award size={15} />
              <span>Verified Certifications ({certificationsData.length})</span>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/10 shadow-sm max-h-[580px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl bg-[#edf5ff] border border-black/5 hover:border-black/15 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-technical text-[9px] uppercase tracking-widest text-[#0e1111]/50 block font-bold">
                        {cert.issuer}
                      </span>
                      <h4 className="font-display text-xs font-bold text-[#0e1111] mt-1 leading-snug">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#0e1111]/10 flex items-center justify-between text-[10px] font-technical text-[#0e1111]/60">
                      <span className="flex items-center gap-1">
                        <Award size={10} />
                        <span>Verified</span>
                      </span>
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
