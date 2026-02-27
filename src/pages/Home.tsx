import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Clock, Building, Globe, ArrowRight, Zap, Server, Globe2, Activity, Users, Cpu, MessageCircle, Gift, GraduationCap, Heart, PartyPopper, Calendar, Search, Sparkles, ExternalLink, ShieldCheck, Handshake, ChevronDown, ChevronUp, Flame } from 'lucide-react';
import { differenceInMonths } from 'date-fns';

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

// ─── Hero Section Helpers ───────────────────────────────────────────────────

const HERO_PARTICLES = [
  { left: '3%',  size: '3px', delay: '0s',    duration: '7s'  },
  { left: '9%',  size: '2px', delay: '1.8s',  duration: '9s'  },
  { left: '16%', size: '4px', delay: '0.4s',  duration: '6s'  },
  { left: '23%', size: '2px', delay: '3.1s',  duration: '8s'  },
  { left: '30%', size: '3px', delay: '0.9s',  duration: '10s' },
  { left: '38%', size: '2px', delay: '2.5s',  duration: '7.5s'},
  { left: '46%', size: '4px', delay: '4.2s',  duration: '8.5s'},
  { left: '53%', size: '2px', delay: '1.3s',  duration: '6.5s'},
  { left: '61%', size: '3px', delay: '0.2s',  duration: '9s'  },
  { left: '68%', size: '2px', delay: '3.7s',  duration: '7s'  },
  { left: '75%', size: '4px', delay: '1.0s',  duration: '8s'  },
  { left: '82%', size: '2px', delay: '2.2s',  duration: '10s' },
  { left: '88%', size: '3px', delay: '0.7s',  duration: '6.5s'},
  { left: '94%', size: '2px', delay: '4.5s',  duration: '7.5s'},
  { left: '98%', size: '3px', delay: '0.5s',  duration: '9s'  },
];

const PARTICLE_COLORS = [
  'bg-playson-red/60', 'bg-orange-400/50', 'bg-white/25',
  'bg-violet-400/40', 'bg-blue-400/40',   'bg-white/30',
  'bg-playson-red/40','bg-orange-300/50', 'bg-white/20',
  'bg-blue-300/40',   'bg-playson-red/50','bg-orange-400/40',
  'bg-white/25',      'bg-violet-300/40', 'bg-playson-red/35',
];

function useCountUp(target: number, durationMs = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / durationMs, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);
  return { count, ref };
}

interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
  color: string;
  glowColor: string;
  icon: ReactNode;
  delay: number;
}

function StatCard({ target, suffix, label, color, glowColor, icon, delay }: StatCardProps) {
  const { count, ref } = useCountUp(target);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform duration-300 group relative overflow-hidden cursor-default"
      style={{ boxShadow: `0 0 20px ${glowColor}` }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 70%)` }} />
      <div className={`${color} mb-0.5`}>{icon}</div>
      <div className={`text-3xl font-bold tabular-nums ${color}`}>{count.toLocaleString()}{suffix}</div>
      <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}

export default function Home() {
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

  const engineeringKeywords = [
    'engineer', 'developer', 'qa', 'tech', 'data', 'platform', 'game', 
    'c++', 'c#', 'go', 'server', 'client', 'frontend', 'backend', 
    'full stack', 'devops', 'sre', 'software', 'architect', 'product', 
    'unity', 'java', 'net', 'node', 'react', 'typescript', 'javascript'
  ];

  const isEngineeringRole = (title: string, dept: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerDept = dept.toLowerCase();
    
    // Exclude non-engineering roles that might match keywords
    if (lowerTitle.includes('artist') || lowerTitle.includes('animator') || lowerTitle.includes('illustrator') || lowerTitle.includes('sound designer')) {
      return false;
    }

    return engineeringKeywords.some(keyword => lowerTitle.includes(keyword)) || 
           ['engineering', 'product', 'game', 'platform', 'tech'].some(k => lowerDept.includes(k));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
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

  const heroStats: StatCardProps[] = [
    { target: 45,   suffix: 'm+', label: 'Players',       color: 'text-playson-red', glowColor: 'rgba(255,0,42,0.35)',   icon: <Users className="w-5 h-5" />,      delay: 0.5  },
    { target: 10,   suffix: 'k+', label: 'Websites',      color: 'text-orange-400',  glowColor: 'rgba(251,146,60,0.35)', icon: <Globe2 className="w-5 h-5" />,     delay: 0.65 },
    { target: 250,  suffix: '+',  label: 'Partners',      color: 'text-blue-400',    glowColor: 'rgba(96,165,250,0.35)', icon: <Handshake className="w-5 h-5" />, delay: 0.8  },
    { target: 27,   suffix: '',   label: 'Jurisdictions', color: 'text-emerald-400', glowColor: 'rgba(52,211,153,0.35)', icon: <ShieldCheck className="w-5 h-5" />,delay: 0.95 },
  ];

  return (
    <div className="pb-0 bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">

        {/* ── BACKGROUND: Rich multi-color aurora base ── */}
        <div className="absolute inset-0 -z-20"
          style={{ background: 'radial-gradient(ellipse at 15% 50%, #1c0010 0%, #07050f 55%, #000000 100%)' }} />

        {/* ── Large glow orbs (4 colors) ── */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-24 w-[700px] h-[700px] rounded-full bg-playson-red/25 blur-[140px] animate-glow-breathe" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 -left-40 w-[650px] h-[650px] rounded-full bg-violet-600/20 blur-[130px] animate-glow-breathe" style={{ animationDelay: '1.2s' }} />
          <div className="absolute -bottom-48 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/18 blur-[120px] animate-glow-breathe" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-orange-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '1.8s' }} />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-rose-600/12 blur-[90px] animate-glow-breathe" style={{ animationDelay: '0.9s' }} />
        </div>

        {/* ── Animated grid overlay ── */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_100%)]" />

        {/* ── Floating particles (deterministic) ── */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {HERO_PARTICLES.map((p, i) => (
            <div
              key={i}
              className={`absolute bottom-0 rounded-full ${PARTICLE_COLORS[i % PARTICLE_COLORS.length]} animate-particle`}
              style={{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }}
            />
          ))}
        </div>

        {/* ── Main content grid ── */}
        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* "We are hiring" badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-playson-red/12 text-playson-red text-sm font-semibold mb-8 border border-playson-red/35 shadow-[0_0_28px_rgba(255,0,42,0.55)] backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-playson-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-playson-red" />
                </span>
                We are hiring
              </motion.div>

              {/* Headline — word-by-word staggered reveal */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
                }}
                initial="hidden"
                animate="visible"
              >
                {(['Playson'] as const).map((word, i) => (
                  <motion.span key={i} className="inline-block"
                    variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } } }}>
                    {word}
                  </motion.span>
                ))}
                {' '}
                <motion.span className="inline-block text-zinc-500"
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } } }}>
                  —
                </motion.span>
                <br />
                <motion.span className="inline-block"
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } } }}>
                  a leading{' '}
                </motion.span>
                <motion.span className="relative inline-block"
                  variants={{ hidden: { opacity: 0, y: 28, filter: 'blur(8px)', scale: 0.95 }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.65 } } }}>
                  <span className="absolute -inset-2 bg-gradient-to-r from-playson-red to-orange-500 blur-2xl opacity-35 animate-glow-breathe" />
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-playson-red via-orange-400 to-red-500 pb-2 animate-gradient-x bg-[length:200%_auto]">
                    supplier
                  </span>
                </motion.span>
                <br />
                <motion.span className="inline-block"
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } } }}>
                  of slot games.
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                Playson passionately serves customers worldwide by creating a commercially successful portfolio of regulated and mobile-focused products.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <a href="#openings" className="relative group overflow-hidden bg-playson-red text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(255,0,42,0.55)] hover:shadow-[0_0_55px_rgba(255,0,42,0.75)] flex items-center gap-2">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="relative flex items-center gap-2">View Open Roles <ArrowRight className="w-5 h-5" /></span>
                </a>
                <Link to="/engineering" className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 px-8 py-4 rounded-full font-medium transition-all border border-zinc-700/60 hover:border-zinc-500 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-sm">
                  Engineering Careers <Cpu className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Orbital visual + stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:flex flex-col items-center gap-10"
            >
              {/* Central orbiting element */}
              <div className="relative flex items-center justify-center w-[280px] h-[280px] animate-float">
                {/* Outer spinning ring with orbiting dot */}
                <div className="absolute w-[270px] h-[270px] rounded-full border border-white/6 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-playson-red shadow-[0_0_14px_rgba(255,0,42,0.9),0_0_28px_rgba(255,0,42,0.5)]" />
                </div>
                {/* Middle ring (reverse) with orbiting dot */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-orange-500/20 animate-spin-slow-reverse">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]" />
                </div>
                {/* Inner subtle ring */}
                <div className="absolute w-[145px] h-[145px] rounded-full border border-playson-red/15" />
                {/* Central glowing orb */}
                <div className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-playson-red/35 blur-xl animate-glow-breathe" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-playson-red/85 to-red-900/65 border border-playson-red/50 shadow-[0_0_45px_rgba(255,0,42,0.55),0_0_90px_rgba(255,0,42,0.25)]" />
                  <Zap className="relative w-12 h-12 text-white drop-shadow-lg" />
                </div>
                {/* Sparkle accents */}
                {[
                  { top: '8%',   left: '18%',  delay: '0s',   size: 'w-1.5 h-1.5', color: 'bg-playson-red' },
                  { top: '12%',  right: '16%', delay: '0.8s', size: 'w-1 h-1',     color: 'bg-orange-400' },
                  { bottom: '8%',left: '22%',  delay: '1.4s', size: 'w-1.5 h-1.5', color: 'bg-violet-400' },
                  { bottom:'10%',right: '20%', delay: '0.5s', size: 'w-1 h-1',     color: 'bg-blue-400'   },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`absolute ${s.size} rounded-full ${s.color} animate-sparkle`}
                    style={{ top: s.top, left: s.left, right: (s as { right?: string }).right, bottom: s.bottom, animationDelay: s.delay } as CSSProperties}
                  />
                ))}
              </div>

              {/* 2×2 stat cards with animated counters */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-[360px]">
                {heroStats.map(({ target, suffix, label, color, glowColor, icon, delay }, i) => (
                  <StatCard key={i} target={target} suffix={suffix} label={label} color={color} glowColor={glowColor} icon={icon} delay={delay} />
                ))}
              </div>

              {/* Ambient corner glows */}
              <div className="absolute -top-16 -right-12 w-44 h-44 bg-violet-600/20 rounded-full blur-[60px] -z-10 animate-glow-breathe" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-4 -left-12 w-44 h-44 bg-blue-500/18 rounded-full blur-[60px] -z-10 animate-glow-breathe" style={{ animationDelay: '2s' }} />
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs text-zinc-600 uppercase tracking-widest font-medium">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
              <ChevronDown className="w-5 h-5 text-zinc-600" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section (Simplified) */}
      <section className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-6">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-12 border border-zinc-800 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://playson.com/frontend/img/bg/main-about-slot-bg3.jpg')] bg-cover opacity-10 mix-blend-overlay pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-6">
                        <Handshake className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6">Partnering with like-minded people</h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
                        With more than 10 years of industry experience, we collaborate with iGaming Leaders for joint development, sharing entertainment and fun with everyone.
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 items-center opacity-90">
                        <h3 className="text-3xl font-bold text-white tracking-tighter hover:text-orange-400 transition-colors cursor-default">ICE <span className="font-light">LONDON</span></h3>
                        <h3 className="text-3xl font-bold text-white tracking-tight hover:text-orange-400 transition-colors cursor-default">SBC <span className="text-orange-500">SUMMIT</span></h3>
                        <h3 className="text-3xl font-extrabold text-white italic hover:text-orange-400 transition-colors cursor-default">iGB <span className="font-normal">Live!</span></h3>
                        <h3 className="text-3xl font-bold text-white hover:text-orange-400 transition-colors cursor-default">SiGMA <span className="text-sm align-top">EUROPE</span></h3>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold mb-12">Choose where to work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl hover:border-orange-500/30 transition-colors group"
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-orange-950/20 to-zinc-950 -z-10" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Perks & Culture</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-200">
              Enjoy the benefits
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Job List */}
      <section id="openings" className="mx-auto max-w-7xl px-6 py-24 border-t border-zinc-800/50">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-6">Join Playson</h2>
          <p className="text-xl text-zinc-400 max-w-2xl">
            We combine agility, ownership, and deep technical expertise to deliver products that millions of people enjoy daily.
          </p>
        </div>

        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-2xl font-bold tracking-tight">Open Roles</h3>
            
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

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Engineering Link Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Cpu className="w-6 h-6 text-orange-500" />
                        <h3 className="text-2xl font-bold text-white">Looking for Engineering roles?</h3>
                    </div>
                    <p className="text-zinc-400 max-w-xl">
                        We have a dedicated portal for our technical positions. Check out our Engineering & Product opportunities.
                    </p>
                </div>
                <Link to="/engineering" className="relative z-10 bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
                    Go to Engineering <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Other Roles - Categorized */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-8">
                {Object.entries(jobsByDepartment).map(([dept, deptJobs]) => {
                    const isExpanded = expandedCategories[dept];
                    const displayedJobs = isExpanded ? deptJobs : deptJobs.slice(0, 5);
                    const hasMore = deptJobs.length > 5;

                    return (
                        <div key={dept} className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{dept}</h3>
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
                                        className={`group block bg-zinc-900/50 border rounded-2xl p-6 transition-all hover:bg-zinc-900 hover:shadow-lg ${
                                          differenceInMonths(new Date(), new Date(job.publishedAt)) > 6 
                                            ? 'border-blue-500/50 animate-pulse hover:animate-none hover:border-blue-500 hover:shadow-blue-500/20' 
                                            : 'border-zinc-800 hover:border-blue-500/50 hover:shadow-blue-500/5'
                                        }`}
                                        >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div>
                                            <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors mb-3 flex items-center gap-2">
                                                {job.title}
                                                {differenceInMonths(new Date(), new Date(job.publishedAt)) > 6 && (
                                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500 text-xs font-bold border border-blue-500/30 animate-pulse">
                                                    <Flame className="w-3 h-3 fill-blue-500" /> Hot
                                                  </span>
                                                )}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
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
                                            
                                            <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <ArrowRight className="w-5 h-5" />
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
              <div className="text-center py-24 text-zinc-500 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
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

        <div className="mt-12 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Don’t see your role listed?</h3>
            <p className="text-zinc-400">Submit your information and we’ll reach out soon.</p>
          </div>
          <a href="https://jobs.ashbyhq.com/playson/form/general-interest" target="_blank" rel="noreferrer" className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-full font-medium transition-colors">
            Submit
          </a>
        </div>
      </section>

      {/* Licensed & Certified */}
      <section className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Licensed & Certified</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We operate in regulated markets worldwide, holding licenses and certifications from the industry's most respected authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Licenses */}
             <img src="https://playson.com/fmc/120-68/af9e/232c/8212/l-logo-1.png" alt="UKGC" className="h-12 object-contain" />
             <img src="https://playson.com/fmc/64-68/f099/cd97/cc48/l-logo-2.png" alt="ONJN" className="h-12 object-contain" />
             <img src="https://playson.com/fmc/177-125/b500/9b7c/dcbd/spelinspektionen_logotyp_transparent.png" alt="Spelinspektionen" className="h-12 object-contain" />
             <img src="https://playson.com/fmc/122-68/8fa6/b7ba/891c/l-logo-5.png" alt="HGC" className="h-12 object-contain" />
             <img src="https://playson.com/fmc/78-68/d689/d2c3/01b6/l-logo-6.png" alt="AGCO" className="h-12 object-contain" />
             <img src="https://playson.com/fmc/488-250/1a86/8c66/6138/GRA-logo-transparent.png" alt="Gibraltar" className="h-12 object-contain" />
             <img src="https://playson.com/fm/logotypes/Mincetur.png" alt="Mincetur" className="h-12 object-contain" />
             <img src="https://playson.com/fm/logotypes/Brazil-secretaria-logo.png" alt="Brazil" className="h-12 object-contain" />
          </div>

          <div className="mt-16 pt-16 border-t border-zinc-800/50">
             <div className="text-center mb-8">
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Certified By</span>
             </div>
             <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src="https://playson.com/fmc/99-32/8ecc/b0cf/cd21/quinel_logo.png" alt="Quinel" className="h-8 object-contain" />
                <img src="https://playson.com/fmc/35-32/13d3/7f7a/108c/ga_logo.png" alt="Gaming Associates" className="h-8 object-contain" />
                <img src="https://playson.com/fmc/100-32/89ac/60d3/344b/bmm_logo.png" alt="BMM Testlabs" className="h-8 object-contain" />
                <img src="https://playson.com/fmc/50-32/e6d9/c6c5/5e1b/gli_logo.png" alt="GLI" className="h-8 object-contain" />
             </div>
          </div>
        </div>
      </section>

      {/* Referral Program - Redesigned & At Bottom */}
      <section className="py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-12 md:p-20 text-center"
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
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Know someone <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">perfect for Playson?</span>
              </h2>
              
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Major rewards are in store for all network members. Join our referral program and help us build the future of iGaming.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://playson-referrals.netlify.app/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-orange-500/20"
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
