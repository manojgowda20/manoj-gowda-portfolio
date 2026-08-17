import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ExternalLink, Send, CheckCircle, AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { cn } from '../utils/cn';
import { personalInfo } from '../data/portfolio';
import { ScrollReveal } from '../components/ScrollReveal';

// Inline brand SVGs for consistency
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const emailAddress = "manudev314@gmail.com";
  const phoneNumber = "+91 9148272292";

  // Validate form fields on the frontend
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setState('loading');

    // Simulate server request delay
    setTimeout(() => {
      // Since no backend is active, form is handled locally as a mock sandbox
      setState('success');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative py-20 lg:py-28 overflow-hidden border-t border-border/20"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Something Together"
          subtitle="Have a question or want to collaborate on a software engineering project? Reach out below."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mt-12 max-w-5xl mx-auto text-left">
          
          {/* Left Column: Contact info */}
          <ScrollReveal 
            variant="slide-up" 
            delay={0.15} 
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Connection Channels
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                Feel free to ping me via phone or drop a line at my personal mailbox. You can also explore my open-source code repositories or professional networks.
              </p>

              {/* Contact list details */}
              <div className="space-y-4 pt-2">
                
                {/* Email (with copy widget) */}
                <div className="glass-panel p-4 rounded-xl border border-border/40 bg-surface/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-accent-cyan flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono text-text-muted uppercase block">Email Address</span>
                      <a href={`mailto:${emailAddress}`} className="text-xs sm:text-sm font-bold text-white hover:text-accent-cyan transition-colors truncate block max-w-[200px] sm:max-w-none">
                        {emailAddress}
                      </a>
                    </div>
                  </div>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-2 rounded bg-white/5 border border-border/60 text-text-muted hover:text-white hover:border-accent-cyan/35 transition-colors focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                    title="Copy email to clipboard"
                    data-magnetic="true"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="glass-panel p-4 rounded-xl border border-border/40 bg-surface/5 flex items-center gap-3">
                  <Phone size={16} className="text-accent-cyan flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-text-muted uppercase block">Phone Number</span>
                    <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-bold text-white hover:text-accent-cyan transition-colors">
                      {phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Resume Download */}
                <div className="glass-panel p-4 rounded-xl border border-border/40 bg-surface/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <svg 
                      className="w-4.5 h-4.5 text-accent-cyan flex-shrink-0"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                    <div>
                      <span className="text-[9px] font-mono text-text-muted uppercase block">Curriculum Vitae</span>
                      <span className="text-xs sm:text-sm font-bold text-white">Manoj Gowda CD - Resume</span>
                    </div>
                  </div>
                  <a 
                    href={personalInfo.resumeUrl}
                    download="Manoj_Gowda_CD_Resume.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-blue/15 to-accent-cyan/15 border border-accent-cyan/35 text-xs font-semibold text-white hover:brightness-110 shadow-glass-glow transition-all"
                  >
                    <span>Download</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

              </div>
            </div>

            {/* Social channels bottom */}
            <div>
              <span className="text-[9px] font-bold font-mono tracking-widest text-text-muted uppercase block mb-3.5">
                Social Networks
              </span>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com/in/manoj-gowda-cd" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-surface text-text-secondary hover:text-white hover:border-accent-cyan/40 hover:shadow-accent-glow transition-all"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                  <ExternalLink size={10} className="opacity-60" />
                </a>

                <a 
                  href="https://github.com/manojgowda20" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-surface text-text-secondary hover:text-white hover:border-accent-cyan/40 hover:shadow-accent-glow transition-all"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                  <ExternalLink size={10} className="opacity-60" />
                </a>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Premium Contact form */}
          <ScrollReveal 
            variant="slide-up" 
            delay={0.3} 
            className="lg:col-span-7"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border/40 bg-surface/10 shadow-glass h-full relative overflow-hidden flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {state === 'success' ? (
                  /* Success state screen */
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center space-y-4 py-10"
                  >
                    <CheckCircle size={44} className="text-emerald-500 animate-bounce" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Mock Submission Logged!</h3>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-sm font-light">
                      Your message was successfully validated and compiled in the local client state.
                    </p>
                    <div className="p-3.5 rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-200/80 font-mono text-[9.5px] max-w-xs leading-normal">
                      ℹ️ Note: No backend server or EmailJS service is currently connected. Form actions are fully simulated.
                    </div>
                    <button 
                      onClick={() => setState('idle')}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 border border-border/80 text-white hover:border-accent-cyan/35 hover:bg-white/10 transition-colors mt-2"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Form view */
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="form-name" className="text-[10px] font-bold font-mono text-text-muted uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="form-name"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white/5 text-xs sm:text-sm text-white placeholder-text-muted transition-all focus:outline-none focus:ring-1 focus:ring-accent-cyan/30",
                          errors.name ? "border-rose-500/40 focus:border-rose-500" : "border-border/60 focus:border-accent-cyan"
                        )}
                        placeholder="John Doe"
                        disabled={state === 'loading'}
                      />
                      {errors.name && (
                        <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle size={10} />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="form-email" className="text-[10px] font-bold font-mono text-text-muted uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="form-email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white/5 text-xs sm:text-sm text-white placeholder-text-muted transition-all focus:outline-none focus:ring-1 focus:ring-accent-cyan/30",
                          errors.email ? "border-rose-500/40 focus:border-rose-500" : "border-border/60 focus:border-accent-cyan"
                        )}
                        placeholder="johndoe@example.com"
                        disabled={state === 'loading'}
                      />
                      {errors.email && (
                        <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle size={10} />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Message field */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="form-message" className="text-[10px] font-bold font-mono text-text-muted uppercase tracking-wider block">
                        Message Body
                      </label>
                      <textarea 
                        id="form-message"
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        rows={4}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white/5 text-xs sm:text-sm text-white placeholder-text-muted transition-all focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 resize-none",
                          errors.message ? "border-rose-500/40 focus:border-rose-500" : "border-border/60 focus:border-accent-cyan"
                        )}
                        placeholder="Type your message here..."
                        disabled={state === 'loading'}
                      />
                      {errors.message && (
                        <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle size={10} />
                          <span>{errors.message}</span>
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-transparent bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-xs font-semibold hover:brightness-110 shadow-glass-glow transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed select-none"
                      data-magnetic="true"
                    >
                      {state === 'loading' ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Validating credentials...</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
