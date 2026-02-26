import { useEffect, useState } from 'react';
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
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-zinc-950 to-zinc-950 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-6 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)] backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                We are hiring
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
                Playson — <br />
                <span className="relative inline-block">
                    <span className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 blur-2xl opacity-20"></span>
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 pb-2 animate-gradient-x bg-[length:200%_auto]">
                        a leading supplier
                    </span>
                </span> <br/>
                of slot games.
              </h1>
              
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-lg">
                Playson passionately serves customers worldwide by creating a commercially successful portfolio of regulated and mobile-focused products.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#openings" className="relative group overflow-hidden bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center gap-2">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span className="relative flex items-center gap-2">View Open Roles <ArrowRight className="w-5 h-5" /></span>
                </a>
                <Link to="/engineering" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 px-8 py-4 rounded-full font-medium transition-all border border-zinc-800 hover:border-zinc-700 flex items-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  Engineering Careers <Cpu className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual - General */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block perspective-1000"
            >
              <div className="relative z-10 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-orange-500/10 transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                 {/* Shine effect on card */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-colors group/item">
                        <div className="text-4xl font-bold text-white mb-2 group-hover/item:text-orange-400 transition-colors">10k+</div>
                        <div className="text-sm text-zinc-400">Websites</div>
                    </div>
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-colors group/item">
                        <div className="text-4xl font-bold text-white mb-2 group-hover/item:text-orange-400 transition-colors">45m</div>
                        <div className="text-sm text-zinc-400">Players</div>
                    </div>
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-colors group/item">
                        <div className="text-4xl font-bold text-white mb-2 group-hover/item:text-orange-400 transition-colors">250+</div>
                        <div className="text-sm text-zinc-400">Partners</div>
                    </div>
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-colors group/item">
                        <div className="text-4xl font-bold text-white mb-2 group-hover/item:text-orange-400 transition-colors">27</div>
                        <div className="text-sm text-zinc-400">Jurisdictions</div>
                    </div>
                 </div>
              </div>

              {/* Decorative Elements - Enhanced */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -z-10 animate-pulse delay-700" />
            </motion.div>
          </div>
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
