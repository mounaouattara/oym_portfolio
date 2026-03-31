import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CORE_COMPETENCIES, TOOLKIT } from '../constants';
import { 
  Box, Circle, Triangle, Square, 
  Layers, Database, Terminal, Cpu, BarChart3, Cloud,
  Folder, ArrowRight, Tag, Image as ImageIcon, Zap,
  ChevronRight, Layout, User
} from 'lucide-react';

const SkillsSection: React.FC<{ lang: 'fr' | 'en' }> = ({ lang }) => {
  const [viewMode, setViewMode] = useState<'skills' | 'stack'>('skills');
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData = viewMode === 'skills' ? CORE_COMPETENCIES : TOOLKIT;
  const currentCategory = currentData[activeCategory % currentData.length];
  const displayedCategory = hoveredCategory !== null ? currentData[hoveredCategory % currentData.length] : currentCategory;

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setSelectedTask(null);
    setIsDropdownOpen(false);
  };

  const getIconForCategory = (idx: number) => {
    const icons = [Box, Circle, Triangle, Square, Layers, Database, Terminal, Cpu, BarChart3, Cloud];
    const Icon = icons[idx % icons.length];
    return <Icon size={18} strokeWidth={1.5} />;
  };

  // Mock task details for the info box
  const getTaskDetails = (task: string) => {
    return {
      summary: lang === 'fr' 
        ? `Expertise approfondie en ${task.toLowerCase()}, permettant de résoudre des problématiques complexes via des approches basées sur les données.`
        : `Deep expertise in ${task.toLowerCase()}, enabling the resolution of complex problems through data-driven approaches.`,
      example: lang === 'fr'
        ? `Implémentation de pipelines robustes pour l'automatisation de ${task.toLowerCase()}.`
        : `Implementation of robust pipelines for the automation of ${task.toLowerCase()}.`,
      projectLink: '#projects'
    };
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 font-mono select-none relative">
      {/* Navigation Anchors */}
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="languages" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="frameworks" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="tools" />

      {/* View Mode Toggle */}
      <div className="flex gap-4 p-1 border border-black/10 bg-black/5 self-center md:self-start">
        <button 
          onClick={() => { setViewMode('skills'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'skills' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'DOMAINES' : 'DOMAINS'}
        </button>
        <button 
          onClick={() => { setViewMode('stack'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'stack' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'OUTILS' : 'TOOLS'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left: Selection - Dropdown on Mobile, Vertical on Desktop */}
        <div className="lg:col-span-4 flex flex-col gap-4 relative z-20">
          <div className="flex flex-col border border-black/10 bg-white/50 backdrop-blur-sm">
            {/* Mobile Dropdown Trigger */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="md:hidden w-full px-6 py-4 flex items-center justify-between bg-black text-white"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-[0.3px] bg-white/20">
                  {getIconForCategory(activeCategory)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {currentCategory.category}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="rotate-90" size={16} />
              </motion.div>
            </button>

            {/* Desktop Header */}
            <div className="px-4 py-2 border-b border-black/10 bg-black/5 hidden md:block">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                {lang === 'fr' ? 'CATÉGORIES' : 'CATEGORIES'}
              </span>
            </div>

            {/* Selection List - Dropdown on Mobile */}
            <div className={`flex flex-col md:overflow-y-auto custom-scrollbar md:max-h-[60vh] ${isDropdownOpen ? 'absolute top-full left-0 w-full bg-white border border-black/10 shadow-2xl z-50' : 'hidden md:flex'}`}>
              {currentData.map((cat, idx) => (
                <button 
                   key={idx}
                   onClick={() => handleCategoryChange(idx)}
                   onMouseEnter={() => setHoveredCategory(idx)}
                   onMouseLeave={() => setHoveredCategory(null)}
                   className={`w-full px-6 md:px-4 py-4 text-left transition-all border-b border-black/5 last:border-0 flex items-center gap-4 ${
                     activeCategory === idx 
                       ? 'bg-black text-white md:bg-black md:text-white' 
                       : 'text-black/40 hover:text-black hover:bg-black/5'
                   }`}
                >
                  <div className={`p-2 rounded-[0.3px] ${activeCategory === idx ? 'bg-white/20' : 'bg-black/5'}`}>
                    {getIconForCategory(idx)}
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight leading-tight">
                    {cat.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Indicator */}
          <div className="md:hidden flex flex-col items-center justify-center gap-2 mt-4">
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-8 bg-black/20" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black/60">
                {lang === 'fr' ? 'Déroulez pour changer' : 'Unfold to change'}
              </span>
              <div className="h-[1px] w-8 bg-black/20" />
            </motion.div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-8 min-h-[500px] lg:min-h-0">
          <div className="h-full bg-white/40 backdrop-blur-md border border-black/5 p-6 md:p-10 relative overflow-y-auto flex flex-col max-h-[600px] lg:max-h-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${activeCategory}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-black rounded-[0.3px] animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.3em] opacity-30 uppercase">
                      {viewMode === 'skills' ? 'Core_Competency' : 'Technical_Stack'} // 0{activeCategory + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-tighter leading-none mb-4">
                    {currentCategory.category}
                  </h3>
                </div>

                  <div className="flex-1">
                    {viewMode === 'skills' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {(currentCategory as any).tasks.map((task: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex flex-col gap-2 group relative"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-black/20 group-hover:bg-black transition-colors shrink-0" />
                              <span className="text-[11px] md:text-[13px] font-mono font-bold opacity-70 group-hover:opacity-100 transition-opacity uppercase leading-tight">
                                {task}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                        {(currentCategory as any).tools.map((tool: any, i: number) => (
                          <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative"
                          >
                            <div className="bg-white/50 border border-black/5 p-3 md:p-6 transition-all duration-500 group-hover:border-black/20 group-hover:shadow-xl group-hover:bg-white">
                              <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                                <div className="text-[8px] md:text-[10px] font-mono font-bold opacity-30 uppercase tracking-tighter">
                                  {tool.level}%
                                </div>
                                <div className="text-[10px] md:text-sm font-mono font-bold uppercase tracking-tight group-hover:text-black transition-colors leading-tight">
                                  {tool.name}
                                </div>
                                <div className="w-full h-[1.5px] md:h-[2px] bg-black/5 overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${tool.level}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className="h-full bg-black"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
