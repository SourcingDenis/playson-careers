import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import BlurText from '../components/BlurText';
import LiquidEther from '../components/LiquidEther';
import ParticleNetwork from '../components/ParticleNetwork';
import GeneralInterestCTA from '../components/GeneralInterestCTA';
import { MapPin, Clock, Building, Globe, ArrowRight, Zap, Server, Globe2, Activity, Users, Cpu, MessageCircle, Gift, GraduationCap, Heart, PartyPopper, Calendar, Search, Sparkles, ExternalLink, ShieldCheck, Handshake, ChevronDown, ChevronUp, Flame } from 'lucide-react';
import { differenceInMonths } from 'date-fns';
import { isEngineeringRole } from '../utils/jobUtils';

export interface Job {
  id: string;
  title: string;
  department: string;
  team: string;
  employmentType: string;
  location: string;
  isRemote: boolean;
  publishedAt: string;
  jobUrl: string;
  applyUrl: string;
  descriptionHtml: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('https://api.ashbyhq.com/posting-api/job-board/playson')
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const engineeringJobsCount = jobs.filter(job => isEngineeringRole(job.title, job.department)).length;

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(query) ||
                          job.location.toLowerCase().includes(query) ||
                          job.department.toLowerCase().includes(query) ||
                          (query === 'remote' && job.isRemote);
    return matchesSearch && !isEngineeringRole(job.title, job.department);
  }).sort((a, b) => {
    const aIsHot = differenceInMonths(new Date(), new Date(a.publishedAt)) > 6;
    const bIsHot = differenceInMonths(new Date(), new Date(b.publishedAt)) > 6;
    if (aIsHot && !bIsHot) return -1;
    if (!aIsHot && bIsHot) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group non-engineering jobs by Business Unit / Department
  const jobsByDepartment = filteredJobs.reduce((acc, job) => {
    const dept = job.department || 'General';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  return (
    <div className="pb-0 bg-zinc-950 text-zinc-50">
      {/* Hero - Modern & Animated */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-zinc-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            
            {/* Infinite Text Marquee (Moved to top & behind content) */}
            <div className="absolute top-32 left-0 right-0 overflow-hidden py-4 bg-playson-red/5 border-y border-playson-red/10 -rotate-2 scale-110 pointer-events-none opacity-30">
                <motion.div 
                    className="flex whitespace-nowrap"
                    animate={{ x: [0, -1035] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 px-4 text-playson-red font-bold text-3xl md:text-4xl tracking-widest uppercase">
                            <span>INNOVATION</span>
                            <span className="w-3 h-3 rounded-full bg-playson-red/50" />
                            <span>HIGH LOAD</span>
                            <span className="w-3 h-3 rounded-full bg-playson-red/50" />
                            <span>IGAMING</span>
                            <span className="w-3 h-3 rounded-full bg-playson-red/50" />
                            <span>SCALABILITY</span>
                            <span className="w-3 h-3 rounded-full bg-playson-red/50" />
                        </div>
                    ))}
                </motion.div>
                {/* Gradient overlay to fade edges */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950" />
            </div>

            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-playson-red/10 via-transparent to-transparent blur-[100px] opacity-30" />
            <ParticleNetwork />
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6 w-full relative z-10">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.2
                        }
                    }
                }}
                className="flex flex-col items-center text-center"
            >
                <motion.a
                    href="#openings"
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm font-medium mb-8 backdrop-blur-sm hover:border-playson-red/50 transition-colors cursor-pointer hover:text-zinc-200"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-playson-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-playson-red animate-blink"></span>
                    </span>
                    We are hiring
                </motion.a>

                <div className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-8 flex flex-col items-center">
                    <BlurText
                        text="Shape the Future"
                        delay={200}
                        animateBy="words"
                        direction="top"
                        className="text-white"
                    />
                    <div className="flex items-center gap-4">
                        <BlurText
                            text="of"
                            delay={400}
                            animateBy="words"
                            direction="top"
                            className="text-white"
                        />
                        <BlurText
                            text="iGaming"
                            delay={500}
                            animateBy="words"
                            direction="top"
                            className="text-white"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <BlurText
                            text="at"
                            delay={600}
                            animateBy="words"
                            direction="top"
                            className="text-white"
                        />
                        <BlurText
                            text="Playson"
                            delay={700}
                            animateBy="words"
                            direction="top"
                            className="text-white"
                        />
                    </div>
                </div>

                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                    }}
                    className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed px-4"
                >
                    Join a world-class team building the next generation of entertainment. 
                    We combine creativity, technology, and data to create unforgettable experiences.
                </motion.p>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                    }}
                    className="flex flex-col items-center gap-8 w-full px-4"
                >
                    <a href="#openings" className="group relative w-full sm:w-auto px-10 py-5 bg-playson-red rounded-full font-bold text-white text-lg shadow-[0_0_40px_-10px_rgba(255,0,42,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,0,42,0.6)] transition-all hover:scale-105 active:scale-95 overflow-hidden flex justify-center items-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex items-center gap-2">
                            View Open Roles <ArrowRight className="w-5 h-5" />
                        </span>
                    </a>

                    {/* Quick Filter Chips */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {/* Engineering Chip - Special */}
                        <button
                            onClick={() => navigate('/engineering')}
                            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/80 border border-playson-red/50 text-white text-base font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-[0_0_15px_-3px_rgba(255,0,42,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,0,42,0.5)]"
                        >
                            <Cpu className="w-5 h-5 text-playson-red" />
                            Engineering
                            <span className="ml-1 flex items-center justify-center bg-playson-red text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px]">
                                {engineeringJobsCount}
                            </span>
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all" />
                        </button>

                        {[
                            { label: 'Product', icon: Zap },
                            { label: 'Remote', icon: Globe },
                            { label: 'Malta', icon: MapPin },
                            { label: 'Slovakia', icon: MapPin },
                        ].map((chip) => (
                            <button
                                key={chip.label}
                                onClick={() => {
                                    setSearchQuery(chip.label);
                                    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-base font-medium hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all active:scale-95"
                            >
                                <chip.icon className="w-4 h-4" />
                                {chip.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>



      {/* Locations */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Choose where to work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { city: 'Bratislava', country: 'Slovakia', flag: 'https://cdn.prod.website-files.com/677bda6af407d3b963833347/68f0217c26a582ed80fd66bf_Frame%2021.svg' },
              { city: 'Sliema', country: 'Malta', flag: 'https://cdn.prod.website-files.com/677bda6af407d3b963833347/68f02198bbeda1c626ba99f7_Frame%2022.svg' },
              { city: 'Kyiv', country: 'Ukraine', flag: 'https://cdn.prod.website-files.com/677bda6af407d3b963833347/68f021a3922b818a6d55fe7d_Frame%2020.svg' },
              { city: 'Fully', country: 'Remote', icon: Globe }
            ].map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-3xl hover:border-orange-500/30 transition-colors group"
              >
                <div className="mb-6 h-12 flex items-center">
                  {loc.flag ? (
                    <img src={loc.flag} alt={loc.country} className="h-8 w-auto" />
                  ) : (
                    <Globe className="w-8 h-8 text-orange-500" />
                  )}
                </div>
                <h3 className="text-2xl font-bold group-hover:text-orange-400 transition-colors">{loc.city}</h3>
                <p className="text-zinc-500 mt-1">{loc.country}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Bright & Animated */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            color0="#5227FF"
            color1="#FF9FFC"
            color2="#B19EEF"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Perks & Culture</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-200">
              Enjoy the benefits
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: 'Remote & hybrid work', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { title: 'Flexibility in your schedule', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { title: 'Development courses', icon: GraduationCap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { title: 'Bonus system', icon: Gift, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { title: 'Full medical insurance', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/10' },
              { title: 'Corporate gatherings', icon: PartyPopper, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { title: 'Strong engineering focus', icon: Cpu, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
              { title: 'Flat structure & idea sharing', icon: MessageCircle, color: 'text-pink-400', bg: 'bg-pink-500/10' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group p-1 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="bg-zinc-950 h-full w-full rounded-xl p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl ${benefit.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  
                  <h3 className="font-bold text-lg text-zinc-100 group-hover:text-white transition-colors">
                    {benefit.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Playson - Dynamic Culture Grid */}
      <section className="py-16 md:py-24 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/20 to-transparent -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 text-sm font-medium mb-4 border border-zinc-700/50"
              >
                <Heart className="w-4 h-4 text-playson-red" />
                <span>Our Culture</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Life at <span className="text-playson-red">Playson</span>
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-lg leading-relaxed mx-auto">
              More than just code and games. We are a community of creators, thinkers, and friends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
            
            {/* 1. Hero: Global Innovation (Spans 2 cols, 2 rows) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              {/* Sharp Orbital Animation */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="relative w-[600px] h-[600px]">
                    {/* Outer Ring */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-zinc-800 rounded-full"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-700 rounded-full" />
                    </motion.div>
                    
                    {/* Middle Ring - Red */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-24 border border-playson-red/20 rounded-full"
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-playson-red rounded-full shadow-[0_0_15px_rgba(255,0,42,0.8)]" />
                    </motion.div>

                    {/* Inner Ring - Blue */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-48 border border-blue-500/20 rounded-full"
                    >
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    </motion.div>

                    {/* Core */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-playson-red/20 to-blue-600/20 rounded-full backdrop-blur-sm border border-white/10" />
                    </div>
                 </div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-8 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent w-full">
                <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-3 tracking-wider">GLOBAL HUBS</span>
                <h3 className="text-3xl font-bold text-white mb-2">Global Impact</h3>
                <p className="text-zinc-300 text-base max-w-md">
                  From our hubs in <span className="text-white font-medium">Malta, Ukraine, Slovakia, and the UK</span>, we're building technology that powers entertainment worldwide.
                </p>
              </div>
            </motion.div>

            {/* 2. Work: Engineering First (1 col, 1 row) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group overflow-hidden rounded-3xl bg-[#0D1117] border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800/50 flex items-center px-4 gap-1.5 border-b border-zinc-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="absolute inset-0 pt-12 px-6 font-mono text-xs leading-relaxed">
                <div className="text-zinc-500 mb-2">// core_engine.ts</div>
                <div className="text-purple-400">class <span className="text-yellow-300">Innovation</span> <span className="text-white">{`{`}</span></div>
                <div className="pl-4 text-blue-400">async <span className="text-yellow-300">deploy</span><span className="text-white">() {`{`}</span></div>
                <div className="pl-8 text-white">
                    <span className="text-red-400">await</span> this.<span className="text-green-400">scale</span>(<span className="text-orange-400">'∞'</span>);
                </div>
                <div className="pl-8 text-white">
                    <span className="text-zinc-500">/* Optimization complete */</span>
                </div>
                <div className="pl-4 text-white">{`}`}</div>
                <div className="text-white">{`}`}</div>
                <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-playson-red ml-1 align-middle"
                />
              </div>
              <div className="absolute bottom-6 left-6">
                 <h3 className="text-lg font-bold text-white group-hover:text-playson-red transition-colors">Engineering First</h3>
              </div>
            </motion.div>

            {/* 3. Stat Card (1 col, 1 row) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl bg-playson-red p-8 flex flex-col justify-between group shadow-lg shadow-playson-red/20"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-125" />
              
              <div className="relative z-10">
                <Users className="w-8 h-8 text-white mb-4" />
                <div className="text-6xl font-bold text-white mb-1 tracking-tighter">350+</div>
                <div className="text-white/90 font-medium text-lg">Playsoners Worldwide</div>
              </div>
              <div className="relative z-10 mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-1 transition-transform">
                  Join the family <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* 4. Energy: Dynamic Rhythm (1 col, 1 row) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
               {/* Equalizer Animation */}
               <div className="absolute inset-0 flex items-center justify-center gap-3">
                  {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: ['20%', '80%', '40%', '100%', '30%'] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                        className="w-3 rounded-full bg-gradient-to-t from-playson-red to-orange-500 shadow-[0_0_10px_rgba(255,0,42,0.5)]"
                      />
                  ))}
               </div>
               <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/80 backdrop-blur-sm p-3 rounded-xl border border-zinc-800/50">
                  <h3 className="text-lg font-bold text-white mb-1">High Energy</h3>
                  <p className="text-zinc-400 text-xs">We work hard and celebrate harder.</p>
               </div>
            </motion.div>

            {/* 5. Team: Connected Network (2 cols, 1 row) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              {/* Network Animation */}
              <div className="absolute inset-0">
                 <svg className="w-full h-full opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                    <pattern id="grid-sharp" width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" className="fill-zinc-700" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-sharp)" />
                 </svg>
                 
                 {/* Connecting Lines */}
                 <div className="absolute inset-0">
                    <motion.div 
                        className="absolute top-1/4 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-playson-red to-transparent"
                        animate={{ opacity: [0, 1, 0], width: ['0%', '40%'], left: ['20%', '30%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                        className="absolute top-2/3 right-1/3 w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                        animate={{ opacity: [0, 1, 0], width: ['0%', '30%'], right: ['20%', '40%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                 </div>

                 {/* Bright Nodes */}
                 {[...Array(4)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        animate={{ 
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                        style={{ top: `${30 + i * 15}%`, left: `${20 + i * 20}%` }}
                    />
                 ))}
              </div>
              
              <div className="absolute bottom-6 left-6 bg-zinc-950/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-zinc-800/50">
                 <h3 className="text-xl font-bold text-white mb-1">Connected Culture</h3>
                 <p className="text-zinc-300 text-sm">A flat structure where every voice matters and ideas flow freely.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      <section id="openings" className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 border-t border-zinc-800/50">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Join Playson</h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            We combine agility, ownership, and deep technical expertise to deliver products that millions of people enjoy daily.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {/* Engineering Link Banner - Enhanced */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-zinc-900/50 p-[1px] group"
            >
                {/* Lighting Border Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 h-full w-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#ff002a_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-playson-red/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl" />
                
                {/* Content Container */}
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 rounded-[1.4rem] bg-zinc-950/90 p-6 md:p-12 backdrop-blur-xl transition-all duration-500 hover:bg-zinc-950/80 h-full w-full">
                    
                    {/* Decorative Circuit/Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_0%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

                    <div className="relative z-10 flex-1 text-center lg:text-left">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-playson-red/30 bg-playson-red/10 px-3 py-1 text-sm font-medium text-playson-red">
                            <Cpu className="h-4 w-4 animate-pulse" />
                            <span>Engineering Hub</span>
                        </div>
                        
                        <h3 className="mb-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-playson-red to-red-500">Next Gen</span> Platform?
                        </h3>
                        
                        <p className="max-w-xl text-base md:text-lg text-zinc-400 mx-auto lg:mx-0">
                            Join our specialized Engineering & Product teams. We have a dedicated portal for technical roles, architecture deep-dives, and our tech stack.
                        </p>
                        
                        {engineeringJobsCount > 0 && (
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-sm font-medium text-zinc-300">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                                            <Users className="h-4 w-4" />
                                        </div>
                                    ))}
                                </div>
                                <span><span className="text-playson-red font-bold">{engineeringJobsCount} open positions</span> waiting for you</span>
                            </div>
                        )}
                    </div>

                    <div className="relative z-10 w-full sm:w-auto">
                        <Link 
                            to="/engineering" 
                            className="group/btn relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-playson-red px-8 py-4 text-lg font-bold text-white shadow-[0_0_40px_-10px_rgba(255,0,42,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(255,0,42,0.6)] active:scale-95 w-full sm:w-auto"
                        >
                            <span className="relative z-10">Visit Engineering Hub</span>
                            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                            
                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Open Roles</h3>
                
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by role, keyword or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Other Roles - Categorized */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-8">
                {Object.entries(jobsByDepartment).map(([dept, deptJobs]: [string, Job[]]) => {
                    const isExpanded = expandedCategories[dept];
                    const displayedJobs = isExpanded ? deptJobs : deptJobs.slice(0, 5);
                    const hasMore = deptJobs.length > 5;

                    return (
                        <div key={dept} className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">{dept}</h3>
                                <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full">{deptJobs.length}</span>
                            </div>

                            <div className="grid gap-4">
                                {displayedJobs.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <Link 
                                        to={`/job/${job.id}`}
                                        className={`group block bg-zinc-900/50 border rounded-2xl p-4 md:p-6 transition-all duration-300 hover:bg-zinc-900 hover:shadow-xl hover:scale-[1.02] ${
                                          differenceInMonths(new Date(), new Date(job.publishedAt)) > 6 
                                            ? 'border-playson-red/50 animate-pulse hover:animate-none hover:border-playson-red hover:shadow-playson-red/20' 
                                            : 'border-zinc-800 hover:border-playson-red/50 hover:shadow-playson-red/5'
                                        }`}
                                        >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                                            <div>
                                            <h3 className="text-lg md:text-xl font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors mb-2 md:mb-3 flex items-center gap-2 flex-wrap">
                                                {job.title}
                                                {differenceInMonths(new Date(), new Date(job.publishedAt)) > 6 && (
                                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500 text-xs font-bold border border-blue-500/30 animate-pulse">
                                                    <Flame className="w-3 h-3 fill-blue-500" /> Hot
                                                  </span>
                                                )}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-zinc-400">
                                                <div className="flex items-center gap-1.5">
                                                <Building className="w-4 h-4" />
                                                {job.department}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                                </div>
                                                {job.isRemote && (
                                                <div className="flex items-center gap-1.5 text-emerald-400">
                                                    <Globe className="w-4 h-4" />
                                                    Remote
                                                </div>
                                                )}
                                            </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 self-end md:self-auto">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            </div>
                                        </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {hasMore && (
                                <button 
                                    onClick={() => toggleCategory(dept)}
                                    className="mt-4 flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors text-sm font-medium"
                                >
                                    {isExpanded ? (
                                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                                    ) : (
                                        <>Show {deptJobs.length - 5} More <ChevronDown className="w-4 h-4" /></>
                                    )}
                                </button>
                            )}
                        </div>
                    );
                })}
              </div>
            ) : (
              <div className="text-center py-16 md:py-24 text-zinc-500 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                <p className="text-lg">No other open positions found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchQuery('');}}
                  className="mt-4 text-orange-500 hover:text-orange-400 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}

          </div>
        )}

        <GeneralInterestCTA />
      </section>

      {/* Partners Section (Simplified) */}
      <section className="py-16 md:py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 md:p-12 border border-zinc-800 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://playson.com/frontend/img/bg/main-about-slot-bg3.jpg')] bg-cover opacity-10 mix-blend-overlay pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-playson-red/10 mb-6">
                        <Handshake className="w-6 h-6 md:w-8 md:h-8 text-playson-red" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Partnering with like-minded people</h2>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8 md:mb-12">
                        With more than 10 years of industry experience, we collaborate with iGaming Leaders for joint development, sharing entertainment and fun with everyone.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-90">
                        <a href="https://www.icegaming.world/" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-bold text-white tracking-tighter hover:text-playson-red transition-colors cursor-pointer">ICE <span className="font-light">LONDON</span></a>
                        <a href="https://sbcevents.com/" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-bold text-white tracking-tight hover:text-playson-red transition-colors cursor-pointer">SBC <span className="text-playson-red">SUMMIT</span></a>
                        <a href="https://www.igblive.com/" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-extrabold text-white italic hover:text-playson-red transition-colors cursor-pointer">iGB <span className="font-normal">Live!</span></a>
                        <a href="https://sigma.world/europe/" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-bold text-white hover:text-playson-red transition-colors cursor-pointer">SiGMA <span className="text-sm align-top">EUROPE</span></a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Licensed & Certified */}
      <section className="py-16 md:py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Licensed & Certified</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We operate in regulated markets worldwide, holding licenses and certifications from the industry's most respected authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Licenses */}
             <img src="https://playson.com/fmc/120-68/af9e/232c/8212/l-logo-1.png" alt="UKGC" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fmc/64-68/f099/cd97/cc48/l-logo-2.png" alt="ONJN" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fmc/177-125/b500/9b7c/dcbd/spelinspektionen_logotyp_transparent.png" alt="Spelinspektionen" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fmc/122-68/8fa6/b7ba/891c/l-logo-5.png" alt="HGC" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fmc/78-68/d689/d2c3/01b6/l-logo-6.png" alt="AGCO" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fmc/488-250/1a86/8c66/6138/GRA-logo-transparent.png" alt="Gibraltar" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fm/logotypes/Mincetur.png" alt="Mincetur" className="h-16 md:h-20 object-contain" />
             <img src="https://playson.com/fm/logotypes/Brazil-secretaria-logo.png" alt="Brazil" className="h-16 md:h-20 object-contain" />
          </div>

          <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-zinc-800/50">
             <div className="text-center mb-10">
                <span className="text-base font-bold text-zinc-500 uppercase tracking-widest">Certified By</span>
             </div>
             <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src="https://playson.com/fmc/99-32/8ecc/b0cf/cd21/quinel_logo.png" alt="Quinel" className="h-10 md:h-14 object-contain" />
                <img src="https://playson.com/fmc/35-32/13d3/7f7a/108c/ga_logo.png" alt="Gaming Associates" className="h-10 md:h-14 object-contain" />
                <img src="https://playson.com/fmc/100-32/89ac/60d3/344b/bmm_logo.png" alt="BMM Testlabs" className="h-10 md:h-14 object-contain" />
                <img src="https://playson.com/fmc/50-32/e6d9/c6c5/5e1b/gli_logo.png" alt="GLI" className="h-10 md:h-14 object-contain" />
             </div>
          </div>
        </div>
      </section>

      {/* Referral Program - Redesigned & At Bottom */}
      <section className="py-20 md:py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-20 text-center"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 border border-orange-500/20">
                <Gift className="w-4 h-4" />
                <span>Referral Program</span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">
                Know someone <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">perfect for Playson?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Major rewards are in store for all network members. Join our referral program and help us build the future of iGaming.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://playson-referrals.netlify.app/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20"
                >
                  Refer a Friend
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
