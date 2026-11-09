import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Download, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../icons/SocialIcons';
import { soundFx } from '../../utils/audio';
import { downloadVCard } from '../../utils/vcard';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'meserettariku921@gmail.com';

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadVCard = () => {
    soundFx.playClick();
    downloadVCard();
    onShowToast('Downloaded Tariku Meseret contact card (.vcf)!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      onShowToast('Please complete all form fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast('Message prepared! Opening email client...');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
      });

      // Prepare mailto link with filled fields
      const subject = encodeURIComponent(`[Project Inquiry] ${formState.projectType} from ${formState.name}`);
      const body = encodeURIComponent(
        `Hi Tariku,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})\nProject Type: ${formState.projectType}`
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#09080e] border-t border-zinc-850 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute right-6 -bottom-16 text-[280px] sm:text-[400px] font-black text-white/[0.02] select-none pointer-events-none leading-none">
        T.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-4 text-xs font-mono text-rose-500 mb-8">
          <span className="font-bold tracking-widest">05 / CONTACT</span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-mono text-rose-500 tracking-widest uppercase">
              HAVE AN IDEA? LET'S BUILD IT.
            </p>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let's make <br />
              something <br />
              <span className="text-rose-500">meaningful.</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
              I’m open to full-time engineering roles, high-impact contract opportunities, and ambitious collaborative ventures. Send a message and let’s discuss how we can build something remarkable.
            </p>

            {/* Direct Email Display Card */}
            <div className="p-4 rounded-2xl bg-[#12111b] border border-zinc-800/80 max-w-lg space-y-3">
              <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>PRIMARY INBOX</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Replies within 24h
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${email}`}
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-rose-400 transition-colors break-all"
                >
                  {email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleDownloadVCard}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors"
              >
                <Download size={14} className="text-rose-400" />
                <span>Save Contact (vCard)</span>
              </button>

              <a
                href="https://github.com/tare-hub"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors"
              >
                <GithubIcon size={14} />
                <span>GitHub Profile ↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/tariku-meseret-b9165741b"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors"
              >
                <LinkedinIcon size={14} className="text-blue-400" />
                <span>LinkedIn ↗</span>
              </a>
            </div>

            {/* Social Links Footer Strip */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center gap-6 text-xs font-mono text-zinc-500">
              <a
                href="https://github.com/tare-hub"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition-colors"
              >
                GITHUB ↗
              </a>
              <a
                href="https://www.linkedin.com/in/tariku-meseret-b9165741b"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition-colors"
              >
                LINKEDIN ↗
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-400 transition-colors"
              >
                FACEBOOK ↗
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0e15] border border-zinc-800/90 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <MessageSquare size={16} className="text-rose-500" />
                  <span>Send Direct Message</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">ENCRYPTED DISPATCH</span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Prepared!</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Your email client should have opened with your inquiry. If not, click below to send directly to meserettariku921@gmail.com.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Hunter"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-200 outline-none focus:border-rose-500 transition-colors cursor-pointer"
                    >
                      <option value="Full-Stack Web App">Full-Stack Web Application</option>
                      <option value="Laravel Backend & API">Laravel Backend & REST API</option>
                      <option value="Vue 3 Frontend Development">Vue 3 / React Frontend Interface</option>
                      <option value="Database Architecture Optimization">Database Architecture & Optimization</option>
                      <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-mono text-zinc-400">
                        MESSAGE DETAILS
                      </label>
                      <span className="text-[10px] font-mono text-zinc-600">
                        {formState.message.length} chars
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, timeline, and goals..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
