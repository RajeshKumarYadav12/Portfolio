import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { portfolioData } from '../data';
import trafficImg from '../public/trafic_control_system.png';
import skilloImg from '../public/skillo_yuva.png';
import digitalSafeImg from '../public/digital_safeIndia.png';
import movieImg from '../public/movie_rs.png';

const thumbnailMap: Record<string, string> = {
  'ai-based-smart-traffic-control-system': trafficImg,
  'skillo-yuva': skilloImg,
  'digitalsafeindia': digitalSafeImg,
  'movie-recommendation-system': movieImg,
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [theme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const project = portfolioData.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className={cn(
        'min-h-screen flex items-center justify-center',
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-slate-900'
      )}>
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-emerald-500 hover:underline cursor-pointer"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const thumbnail = thumbnailMap[project.slug] ?? project.thumbnail;

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300 overflow-x-hidden',
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-slate-900'
    )}>
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border text-sm font-bold transition-all cursor-pointer hover:text-emerald-500',
            theme === 'dark'
              ? 'bg-white/5 border-white/10 text-white/70'
              : 'bg-black/5 border-black/10 text-slate-600'
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Banner image — aligned with content width, rounded */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <img
          src={thumbnail}
          alt={project.title}
          className="w-full h-auto rounded-2xl"
          style={{ display: 'block' }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Project content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-8"
        >
          {project.title}
        </motion.h1>

        {/* Technologies */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold mt-1 shrink-0 text-emerald-400">
            Technologies:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, j) => (
              <span
                key={j}
                className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bullet points */}
        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {project.bullets.map((bullet, j) => (
            <li
              key={j}
              className={cn(
                'text-base leading-relaxed flex gap-4',
                theme === 'dark' ? 'text-white/70' : 'text-slate-600'
              )}
            >
              <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              {bullet}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
