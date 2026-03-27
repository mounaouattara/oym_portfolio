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

  const currentData = viewMode === 'skills' ? CORE_COMPETENCIES : TOOLKIT;
  const currentCategory = currentData[activeCategory % currentData.length];

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setSelectedTask(null);
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

  // Lola & Cat Character Component
  const LolaCharacter = ({ task }: { task: string | null }) => {
    const getAction = () => {
      if (!task) return { lola: 'idle', cat: 'idle', accessory: null, label: '', context: '' };
      
      const t = task.toLowerCase();
      
      // Data Science
      if (t.includes('prédictive') || t.includes('predictive')) 
        return { 
          lola: 'predicting', cat: 'hungry', accessory: 'crystal_ball', 
          label: 'PRÉDICTION: FAIM DANS 2 MIN',
          context: "Lola utilise sa boule de cristal pour prédire exactement quand son chat réclamera ses croquettes."
        };
      if (t.includes('statistique') || t.includes('statistical'))
        return { 
          lola: 'measuring', cat: 'measuring', accessory: 'ruler', 
          label: 'MESURE_PRÉCISION_QUEUE',
          context: "Lola mesure la courbure de la queue du chat pour valider ses hypothèses de ronronnement."
        };
      if (t.includes('exploratoire') || t.includes('eda'))
        return { 
          lola: 'searching', cat: 'searching', accessory: 'magnifier', 
          label: 'DÉTECTION_ANOMALIE_SOURIS',
          context: "Lola et le chat traquent les anomalies (souris) cachées dans les recoins des données."
        };
      if (t.includes('feature engineering'))
        return { 
          lola: 'hammering', cat: 'hardhat', accessory: 'hammer', 
          label: 'CONSTRUCTION_FEATURES',
          context: "Lola construit des jouets sur-mesure pour optimiser le bonheur de son compagnon."
        };
      
      // Deep Learning / IA
      if (t.includes('deep learning') || t.includes('vision') || t.includes('cnn')) 
        return { 
          lola: 'scanning', cat: 'pixelated', accessory: 'scanner', 
          label: 'SCAN_NEURONAL_FÉLIN',
          context: "Lola scanne les réseaux neuronaux du chat pour comprendre pourquoi il fixe le mur à 3h du matin."
        };
      if (t.includes('nlp') || t.includes('text') || t.includes('llm') || t.includes('transformers')) 
        return { 
          lola: 'translating', cat: 'talking', accessory: 'book', 
          label: 'TRADUCTION_MIAOU_FR',
          context: "Lola traduit enfin les miaulements complexes du chat en requêtes SQL compréhensibles."
        };
      if (t.includes('générative'))
        return { 
          lola: 'painting', cat: 'colorful', accessory: 'brush', 
          label: 'GÉNÉRATION_ART_CHAT',
          context: "Lola génère des portraits artistiques de son chat dans des styles jamais vus."
        };
      
      // Data Analysis / BI
      if (t.includes('dashboard') || t.includes('visualisation') || t.includes('bi')) 
        return { 
          lola: 'presenting', cat: 'impressed', accessory: 'pointer', 
          label: 'INSIGHTS: +50% RONRON',
          context: "Lola présente un rapport détaillé montrant une corrélation de 99% entre les caresses et le ronronnement."
        };
      if (t.includes('k-means') || t.includes('segmentation'))
        return { 
          lola: 'sorting', cat: 'sorted', accessory: 'balls', 
          label: 'SEGMENTATION_CROQUETTES',
          context: "Lola segmente les croquettes par couleur pour voir lesquelles le chat préfère ignorer."
        };
      
      // Engineering / Big Data
      if (t.includes('pipeline') || t.includes('etl') || t.includes('engineering')) 
        return { 
          lola: 'building', cat: 'watching', accessory: 'wrench', 
          label: 'PIPELINE_DÉBIT_MAX',
          context: "Lola construit un pipeline automatisé pour acheminer les friandises directement dans le bol."
        };
      if (t.includes('spark') || t.includes('distribué'))
        return { 
          lola: 'lightning', cat: 'fast', accessory: 'bolt', 
          label: 'TRAITEMENT_PARALLÈLE',
          context: "Lola utilise le traitement parallèle pour brosser le chat 10x plus vite."
        };
      
      // MLOps / Infra
      if (t.includes('docker') || t.includes('conteneur')) 
        return { 
          lola: 'boxing', cat: 'in_box', accessory: 'container', 
          label: 'DÉPLOIEMENT_CONTENEUR',
          context: "Lola déploie son chat dans un conteneur (une boîte en carton) pour une portabilité maximale."
        };
      if (t.includes('aws') || t.includes('cloud') || t.includes('gcp'))
        return { 
          lola: 'floating', cat: 'floating', accessory: 'cloud', 
          label: 'INFRA_NUAGEUSE',
          context: "Lola et son chat flottent dans le nuage pour surveiller l'infrastructure depuis les hauteurs."
        };
      
      // Full-Stack
      if (t.includes('full-stack') || t.includes('backend') || t.includes('frontend') || t.includes('node')) 
        return { 
          lola: 'coding', cat: 'sleeping_on_kb', accessory: 'laptop', 
          label: 'DEBUG_MODE_ON',
          context: "Lola code toute la nuit pendant que le chat dort paisiblement sur son clavier chaud."
        };
        
      return { 
        lola: 'thinking', cat: 'curious', accessory: 'sparkles', 
        label: 'CHARGEMENT...',
        context: "Lola et son chat explorent de nouvelles dimensions de données."
      };
    };

    const action = getAction();

    return (
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-center opacity-50 md:opacity-70">
        <div className="relative w-48 h-48 md:w-80 md:h-80">
          {/* Background Glow for Lola & Cat */}
          <div className="absolute inset-0 bg-black/5 rounded-full blur-[100px] animate-pulse" />
          
          {/* Lola */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: action.lola === 'predicting' ? [0, 5, -5, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-10 left-0 text-black"
          >
            <div className="relative">
              <User size={80} className="md:w-48 md:h-48" strokeWidth={1} />
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-6 -right-6 bg-black text-white px-4 py-1 rounded-full shadow-lg border border-white/20"
              >
                <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest">Lola</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Cat */}
          <motion.div 
            animate={{ 
              x: action.cat === 'hungry' ? [0, 10, -10, 0] : [0, 4, -4, 0],
              y: action.cat === 'in_box' ? 20 : [0, -8, 0],
              rotate: action.cat === 'talking' ? [0, 15, -15, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-10 right-0 text-black/80"
          >
            <div className="relative">
              <Zap size={48} className={`md:w-24 md:h-24 ${action.cat === 'hungry' ? 'text-orange-500' : 'text-black'}`} strokeWidth={1} />
              <div className="absolute -top-3 -left-3 bg-white border border-black/20 px-3 py-1 rounded-full shadow-md">
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">Chat</span>
              </div>
              {action.cat === 'hungry' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-16 -right-8 bg-orange-100 border border-orange-500 px-3 py-2 rounded-sm text-[10px] font-bold text-orange-600 shadow-xl"
                >
                  MIAOU! (FAIM)
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Accessory / Action Visual - Enhanced */}
          <AnimatePresence>
            {task && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 50 }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 z-40"
              >
                <div className="bg-black text-white px-6 py-4 rounded-sm shadow-2xl flex flex-col items-center gap-3 border border-white/30 min-w-[160px]">
                  {action.accessory === 'crystal_ball' && (
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-pulse border border-cyan-400 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full blur-[3px]" />
                      </div>
                    </div>
                  )}
                  {action.accessory === 'laptop' && <Terminal size={32} className="text-cyan-400" />}
                  {action.accessory === 'book' && <Folder size={32} className="text-orange-400" />}
                  {action.accessory === 'wrench' && <Cpu size={32} className="text-green-400" />}
                  {action.accessory === 'pointer' && <BarChart3 size={32} className="text-yellow-400" />}
                  {action.accessory === 'container' && <Box size={32} className="text-blue-400" />}
                  {action.accessory === 'scanner' && <ImageIcon size={32} className="text-purple-400" />}
                  {action.accessory === 'ruler' && <Layout size={32} className="text-pink-400" />}
                  {action.accessory === 'magnifier' && <Circle size={32} className="text-indigo-400 animate-pulse" />}
                  {action.accessory === 'hammer' && <Square size={32} className="text-red-400" />}
                  {action.accessory === 'brush' && <Layers size={32} className="text-fuchsia-400" />}
                  {action.accessory === 'balls' && <Circle size={32} className="text-orange-400" />}
                  {action.accessory === 'bolt' && <Zap size={32} className="text-yellow-400 animate-bounce" />}
                  {action.accessory === 'cloud' && <Cloud size={32} className="text-blue-300 animate-pulse" />}
                  {action.accessory === 'sparkles' && <Zap size={32} className="text-yellow-400 animate-spin" />}
                  
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{action.label}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contextual Explanation Phrase */}
        <AnimatePresence>
          {task && action.context && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 max-w-[300px] text-center"
            >
              <p className="text-[11px] md:text-[13px] font-mono font-bold text-black leading-relaxed italic">
                {action.context}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 font-mono select-none relative">
      {/* Navigation Anchors */}
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="languages" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="frameworks" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="tools" />

      {/* View Mode Toggle */}
      <div className="flex gap-4 p-1 border border-black/10 bg-black/5 self-start">
        <button 
          onClick={() => { setViewMode('skills'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'skills' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'DOMAINES' : 'DOMAINS'}
        </button>
        <button 
          onClick={() => { setViewMode('stack'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'stack' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'OUTILS' : 'TOOLS'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left: Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex flex-col border border-black/10 bg-white/50 backdrop-blur-sm">
            <div className="px-4 py-2 border-b border-black/10 bg-black/5">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                {lang === 'fr' ? 'CATÉGORIES' : 'CATEGORIES'}
              </span>
            </div>
            <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
              {currentData.map((cat, idx) => (
                <button 
                   key={idx}
                   onClick={() => handleCategoryChange(idx)}
                   className={`w-full px-4 py-4 text-left transition-all border-b border-black/5 last:border-0 flex items-center gap-4 ${
                     activeCategory === idx 
                       ? 'bg-black text-white' 
                       : 'text-black/40 hover:text-black hover:bg-black/5'
                   }`}
                >
                  <div className={`p-2 rounded-full ${activeCategory === idx ? 'bg-white/20' : 'bg-black/5'}`}>
                    {getIconForCategory(idx)}
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight leading-tight">
                    {cat.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-8">
          <div className="h-full bg-white/40 backdrop-blur-md border border-black/5 p-6 md:p-10 relative overflow-hidden flex flex-col">
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
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
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
                            onMouseEnter={() => setSelectedTask(task)}
                            onMouseLeave={() => setSelectedTask(null)}
                            className="flex flex-col gap-2 group relative"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-black/20 group-hover:bg-black transition-colors shrink-0" />
                              <span className="text-[11px] md:text-[13px] font-mono font-bold opacity-70 group-hover:opacity-100 transition-opacity uppercase leading-tight">
                                {task}
                              </span>
                            </div>
                            
                            {/* Hover Explanation */}
                            <AnimatePresence>
                              {selectedTask === task && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 border-l border-black/10 py-2">
                                    <p className="text-[10px] md:text-[11px] opacity-60 leading-relaxed italic">
                                      {getTaskDetails(task).summary}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest opacity-40">
                                      <Zap size={10} />
                                      <span>{getTaskDetails(task).example}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {(currentCategory as any).tools.map((tool: any, i: number) => (
                          <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative"
                          >
                            <div className="bg-white/50 border border-black/5 p-4 md:p-6 transition-all duration-500 group-hover:border-black/20 group-hover:shadow-xl group-hover:bg-white">
                              <div className="flex flex-col items-center text-center gap-3">
                                <div className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-tighter">
                                  {tool.level}%
                                </div>
                                <div className="text-xs md:text-sm font-mono font-bold uppercase tracking-tight group-hover:text-black transition-colors">
                                  {tool.name}
                                </div>
                                <div className="w-full h-[2px] bg-black/5 overflow-hidden">
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

                  {/* Lola & Chat Integration */}
                  <LolaCharacter task={selectedTask} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
